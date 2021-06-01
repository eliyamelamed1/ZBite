import pytest
from django.urls import reverse

from accounts.models import UserAccount
from factories import RecipeFactory, UserFactory
from likes.models import Like

# add test to get info from recipe detail page
# ------------------------------------------------ Tests
pytestmark = pytest.mark.django_db
like_url = Like.get_create_url()
class TestLikeRecipeCreateView:
    class TestAuthenticatedUsers:
        def test_like_page_render(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)

            like_page_render = api_client.get(like_url)

            assert like_page_render.status_code == 405
        
        def test_like_post_request(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            response = api_client.post(like_url, data)

            assert response.status_code == 200

        def test_user_second_like_to_recipe_will_unlike(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(like_url, data)
            api_client.post(like_url, data)

            assert new_recipe.likes.all().count() == 0

        def test_likes_from_different_users(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(like_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(like_url, data)

            assert new_recipe.likes.all().count() == 2



    class TestGuestUsers:
        def test_like_page_should_not_render(self, api_client):
            like_page_render = api_client.get(like_url)

            assert like_page_render.status_code == 401

        def test_like_post_request_not_allowed(self, api_client):
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            response = api_client.post(like_url, data)

            assert response.status_code == 401

