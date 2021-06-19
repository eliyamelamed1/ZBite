from accounts.models import UserAccount
import pytest

from factories import UserFactory
from followers.models import Follower

pytestmark = pytest.mark.django_db
follow_url = Follower.get_follow_url()
class TestFollowSomeoneView:
    class TestAuthenticatedUsers:
        class TestFollow:
            def test_follow_page_should_return_status_code_200(self, api_client):
                author = UserFactory()
                api_client.force_authenticate(author)
                follow_url_render = api_client.get(follow_url)

                assert follow_url_render.status_code == 405

            def test_follow_post_request_return_status_code_200(self, api_client):
                author = UserFactory()
                user_followed = UserFactory()
                api_client.force_authenticate(author)

                data = {
                    'user_followed': user_followed.id
                }
                response = api_client.post(follow_url, data)

                assert response.status_code == 200

            def test_user_followed_should_be_added_to_author_following_list(self, api_client):
                author = UserFactory()
                user_followed = UserFactory()
                api_client.force_authenticate(author)

                data = {
                    'user_followed': user_followed.id
                }
                api_client.post(follow_url, data)

                assert author.following.all().get(id__exact=user_followed.id) == user_followed

            def test_author_should_be_added_to_user_followed_followers_list(self, api_client):
                author = UserFactory()
                user_followed = UserFactory()
                api_client.force_authenticate(author)

                data = {
                    'user_followed': user_followed.id
                }
                api_client.post(follow_url, data)

                assert user_followed.followers.all().get(id__exact=author.id) == author
            
            def test_user_cant_follow_himself(self, api_client):
                author = UserFactory()
                api_client.force_authenticate(author)

                data = {
                    'user_followed': author.id
                }
                api_client.post(follow_url, data)

                try: 
                    author_following = author.following.all().get(id__exact=author.id)
                except:
                    author_following = None

                try: 
                    author_followers = author.followers.all().get(id__exact=author.id)
                except:
                    author_followers = None

                assert author_following == None
                assert author_followers == None

        class TestUnFollow:
            def test_unfollowing_should_return_status_code_200(self, api_client):
                author = UserFactory()
                user_followed = UserFactory()
                api_client.force_authenticate(author)
                data = {
                    'user_followed': user_followed.id
                }
                api_client.post(follow_url, data)
                response = api_client.post(follow_url, data)

                assert response.status_code == 200

            def test_when_author_unfollow_a_user_author_should_be_removed_from_the_user_followers_list(self, api_client):
                author = UserFactory()
                user_followed = UserFactory()
                api_client.force_authenticate(author)

                data = {
                    'user_followed': user_followed.id
                }
                api_client.post(follow_url, data)
                api_client.post(follow_url, data)
                
                try:
                    removed_from_followers_list = user_followed.followers.all().get(id__exact=author.id) == author
                except:
                    removed_from_followers_list = True
                
                assert removed_from_followers_list == True

    class TestGuestUsers:
        def test_get_request_should_return_status_code_401(self, api_client):

            follow_url_render = api_client.get(follow_url)

            assert follow_url_render.status_code == 401
        
        def test_follow_post_request_should_return_status_code_401(self, api_client):
            user_followed = UserFactory()

            data = {
                'user_followed': user_followed.id
            }
            response = api_client.post(follow_url, data)

            assert response.status_code == 401

        def test_follow_user_fail(self, api_client):
            user_followed = UserFactory()
            data = {
                'user_followed': user_followed.id
            }
            response = api_client.post(follow_url, data)
            user_followed = UserAccount.objects.get(id=user_followed.id)

            assert user_followed.followers.all().count() == 0