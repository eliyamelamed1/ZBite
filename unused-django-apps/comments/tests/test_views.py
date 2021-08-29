import pytest
from django.core.files.uploadedfile import SimpleUploadedFile

import conftest
from accounts.models import UserAccount
from comments.models import Comment
from factories import CommentFactory, RecipeFactory, UserFactory

# add test to get info from comment detail page
# ------------------------------------------------ Tests
pytestmark = pytest.mark.django_db
create_comment_url = Comment.get_comment_create_url()
class TestCommentCreateView:
    class TestAuthenticatedUsers:
        def test_comment_create_page_render(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            create_comment_page_render = api_client.get(create_comment_url)

            assert create_comment_page_render.status_code == 405 # 405 = method not allowed - get isnt allowed only post

        def test_comment_create_post_request(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            comment_data = CommentFactory.build()
            
            data = {
                'title': {comment_data.title},
                'recipe': {new_recipe.id},
                'author': {new_user.id}
            }
            response = api_client.post(create_comment_url, data)

            assert response.status_code == 201
        
        def test_comment_author_is_current_logged_in_user(self, api_client):
                ''' testing the method perform_create '''
                new_user = UserFactory()
                api_client.force_authenticate(new_user)
                new_recipe = RecipeFactory()
                comment_data = CommentFactory.build()

                data = {
                    'title': {comment_data.title},
                    'recipe': {new_recipe.id},
                    'author': {new_user.id}
                }
                api_client.post(create_comment_url, data)
                new_comment = Comment.objects.get(title=comment_data.title)

                assert new_comment.author == new_user


    class TestGuestUsers:
        def test_comment_create_page_should_not_render(self, api_client):
            response = api_client.get(create_comment_url)

            assert response.status_code == 401 

        def test_comment_create_post_request_not_allowed(self, api_client):
            new_user = UserFactory()
            comment_data = CommentFactory.build()
            new_recipe = RecipeFactory()

            data = {
                'title': {comment_data.title},
                'recipe': {new_recipe.id},
                'author': {new_user.id}
            }
            response = api_client.post(create_comment_url, data)            

            assert response.status_code == 401


class TestCommentsInRecipe:
    class TestAuthenticatedUsers:
        def test_comment_search_should_return_405(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            comments_in_recipe_url = '/api/comments/comments_in_recipe/'
            response = api_client.get(comments_in_recipe_url)

            assert response.status_code == 405 # 405 = method not allowed - get isnt allowed only post

        def test_comment_search_post_request_return_status_code_200(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            new_comment = CommentFactory()
            comments_in_recipe_url = '/api/comments/comments_in_recipe/'
            data = {
                'recipe': {new_comment.recipe.id},
                'title': {new_comment.title}
            }
            response = api_client.post(comments_in_recipe_url, data)
            
            assert response.status_code == 200 
        
        def test_comment_search_post_request_return_comments_searched(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            new_comment = CommentFactory()
            comments_in_recipe_url = '/api/comments/comments_in_recipe/'
            data = {
                'recipe': {new_comment.recipe.id},
                'title': {new_comment.title}
            }
            response = api_client.post(comments_in_recipe_url, data)

            assert f'{new_comment}' in f'{response.content}'

    class TestGuestUsers:
        def test_comment_search_page_render(self, api_client):
            comments_in_recipe_url = '/api/comments/comments_in_recipe/'
            response = api_client.get(comments_in_recipe_url)

            assert response.status_code == 405 # 405 = method not allowed - get isnt allowed only post

        def test_comment_search_post_request_allowed(self,api_client, search_comment_response):
            response = search_comment_response

            assert response.status_code == 200

class TestCommentDetailsView:
        class TestAuthenticatedUsers:
            def test_comment_detail_page_render(self ,api_client):
                new_comment = CommentFactory()
                api_client.force_authenticate(new_comment.author)

                response = api_client.get(new_comment.get_absolute_url())

                assert response.status_code == 200
                
        class TestGuestUsers:
            def test_comment_detail_page_render(self, api_client):
                new_comment = CommentFactory()
                response = api_client.get(new_comment.get_absolute_url())

                assert response.status_code == 200



class TestDeleteCommentView:
    class TestIsRecipeAuthorOrReadOnly:
        def test_recipe_author_can_delete_other_users_recipe_comments_on_his_recipe(self, api_client):
            new_recipe = RecipeFactory()
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            comment_data = CommentFactory.build()

            data = {
                'title': {comment_data.title},
                'recipe': {new_recipe.id},
                'author': {new_user.id}
            }
            response = api_client.post(create_comment_url, data)

            api_client.logout()
            api_client.force_authenticate(new_recipe.author)
            new_comment = Comment.objects.get(title=comment_data.title)
            response = api_client.delete(new_comment.get_delete_url())

            assert response.status_code == 204



    class TestIsAuthorOrReadOnly:
        def test_author_can_delete_own_comment(self, api_client):
            new_comment = CommentFactory()
            api_client.force_authenticate(new_comment.author)
            response = api_client.delete(new_comment.get_absolute_url())

            assert response.status_code == 204 

        def test_not_author_cant_delete_comment(self, api_client):
            new_comment = CommentFactory()
            random_user = UserFactory()
            api_client.force_authenticate(random_user)
            response = api_client.delete(new_comment.get_absolute_url())

            assert response.status_code == 403

    class TestGuestUsers:
        def test_comment_delete(self, api_client):
            new_comment = CommentFactory()
            response = api_client.delete(new_comment.get_absolute_url())

            assert response.status_code == 401


# TODO - add test for updating image)
class TestUpdateComment:
    class TestIsAuthorOrReadOnly:
        def test_author_can_update_own_comment(self, api_client):
            new_comment = CommentFactory()
            api_client.force_authenticate(new_comment.author)
            data = {
                'title': 'updated title',
                # 'image': '#',
            }
            response = api_client.patch(new_comment.get_update_url(), data)

            assert response.status_code == 200
        
        def test_not_author_cant_update_comment(self, api_client): 
            new_comment = CommentFactory()
            random_user = UserFactory()
            api_client.force_authenticate(random_user)
            data = {
                'title': 'updated title',
            }
            response = api_client.patch(new_comment.get_update_url(), data)

            assert response.status_code == 403

    class TestGuestUsers:
        def test_guest_user_cant_update_comment(self, api_client):
            first_comment = CommentFactory()
            data = {
                'title': 'updated title',
            }
            response = api_client.patch(first_comment.get_update_url(), data)

            assert response.status_code == 401