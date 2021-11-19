import pytest
from django.urls import reverse

from accounts.models import UserAccount
from factories import RecipeFactory, UserFactory
from saves.models import Save

# add test to get info from recipe detail page
# ------------------------------------------------ Tests
pytestmark = pytest.mark.django_db
save_url = Save.get_create_url()
class TestSaveRecipeCreateView:
    class TestAuthenticatedUsers:
        def test_save_page_get_request_return_status_code_405(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)

            save_page_render = api_client.get(save_url)

            assert save_page_render.status_code == 405
        
        def test_save_post_request_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            response = api_client.post(save_url, data)

            assert response.status_code == 200

        def test_post_request_should_append_save_to_recipe(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)

            assert new_recipe.saves.all().count() == 1

        def test_user_second_save_to_recipe_should_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)
            response = api_client.post(save_url, data)

            assert response.status_code == 200

        def test_user_second_save_to_recipe_will_unsave(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)
            api_client.post(save_url, data)

            assert new_recipe.saves.all().count() == 0

        def test_saves_from_different_users_returns_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            response = api_client.post(save_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id
            }
            response2 = api_client.post(save_url, data)

            assert response.status_code and response2.status_code == 200

        def test_liking_2_recipes_should_save_them_as_saved_recipes_and_increment_their_save_count(self,api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            new_recipe2 = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            data2 = {
                'recipe': new_recipe2.id
            }
            api_client.post(save_url, data)
            api_client.post(save_url, data2)

            assert new_recipe.saves.all().count() == 1
            assert new_recipe2.saves.all().count() == 1
            assert new_user.saved_recipes.all().count() == 2
            assert new_recipe and new_recipe2 in new_user.saved_recipes.all()

        def test_saves_from_different_users_should_stack(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)

            assert new_recipe.saves.all().count() == 2
        
        def test_saves_from_different_users_should_save_recipes_in_each_user_saved_recipes(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)

            assert new_user.saved_recipes.all().count() == 1
            assert new_recipe in new_user.saved_recipes.all()
            assert new_user2.saved_recipes.all().count() == 1
            assert new_recipe in new_user2.saved_recipes.all()

        def test_saved_recipe_should_be_added_to_user_saved_recipes_recipes(self,api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)

            assert new_user.saved_recipes.all().count() == 1 
            assert new_recipe in new_user.saved_recipes.all()

        def test_un_liking_recipe_should_remove_it_from_user_saved_recipes_recipes(self,api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)
            api_client.post(save_url, data)


            assert new_user.saved_recipes.all().count() == 0

    class TestGuestUsers:
        def test_save_page_get_request_return_status_code_401(self, api_client):
            save_page_render = api_client.get(save_url)

            assert save_page_render.status_code == 401

        def test_save_post_request_return_status_code_401(self, api_client):
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            response = api_client.post(save_url, data)

            assert response.status_code == 401

        def test_save_post_request_should_not_save(self, api_client):
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id
            }
            api_client.post(save_url, data)

            assert new_recipe.saves.all().count() == 0


