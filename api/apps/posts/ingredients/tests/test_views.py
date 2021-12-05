from apps.posts.ingredients.models import Ingredient
from apps.posts.recipes.models import Recipe
import pytest
from django.urls import reverse

from apps.users.accounts.models import UserAccount
from factories import RecipeFactory, UserFactory

create_ingredient_url = reverse('ingredients:create')
pytestmark = pytest.mark.django_db


class TestIngredientCreateView:
    class TestAuthenticatedUsers:
        def test_ingredient_create_page_render(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            create_ingredient_page_render = api_client.get(create_ingredient_url)

            assert create_ingredient_page_render.status_code == 405

        def test_creating_ingredient_list_allowed_to_recipe_author(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text_list = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text_list': text_list,
            }
            response = api_client.post(create_ingredient_url, data)


            assert response.status_code == 201
            assert len(Ingredient.objects.all()) == 1
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text_list == text_list
            assert Recipe.objects.all()[0].ingredients.text_list == text_list 

        def test_creating_ingredient_list_not_allowed_if_not_recipe_author(self, api_client):
            new_user = UserFactory()
            recipe_data = RecipeFactory()
            api_client.force_authenticate(new_user)
            text_list = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            response = api_client.post(create_ingredient_url, data)

            assert response.status_code == 403
            assert len(Ingredient.objects.all()) == 0
  
        def test_creating_multiple_ingredients_models_for_different_recipes_is_allowed(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text_list = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            response = api_client.post(create_ingredient_url, data)

            recipe_data2 = RecipeFactory()
            api_client.force_authenticate(recipe_data2.author)
            text2 = ['1','2','4']

            data = {
                'recipe': recipe_data2.id,
                'text_list': text2
            }
            response2 = api_client.post(create_ingredient_url, data)


            assert len(Ingredient.objects.all()) == 2

            assert response.status_code == 201
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text_list == text_list
            assert Recipe.objects.all()[0].ingredients.text_list == text2 

            assert response2.status_code == 201
            assert Ingredient.objects.all()[1].author == recipe_data2.author
            assert Ingredient.objects.all()[1].recipe == recipe_data2
            assert Ingredient.objects.all()[1].text_list == text2
            assert Recipe.objects.all()[1].ingredients.text_list == text2 



        def test_creating_multiple_ingredients_models_for_same_recipe_is_forbidden(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text_list = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            response1 = api_client.post(create_ingredient_url, data)
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            response2 = api_client.post(create_ingredient_url, data)

            assert response2.status_code == 400
    class TestGuestUsers:
        def test_ingredient_create_page_should_not_render(self, api_client):
            create_ingredient_page_render = api_client.get(create_ingredient_url)

            assert create_ingredient_page_render.status_code == 401

class TestIngredientDetailView:
    class TestAuthenticatedUsers:
        def test_ingredient_detail_page_render(self, api_client, create_ingredient):
            ingredients_data = create_ingredient
            update_ingredient_page_render = api_client.get(ingredients_data.get_absolute_url())

            assert update_ingredient_page_render.status_code == 200

        def test_updating_ingredients_allowed_to_recipe_author(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text_list = ['1','2','5']
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            api_client.post(create_ingredient_url, data)

            api_client.force_authenticate(recipe_data.author)
            updated_text = ['1','2','6']
            ingredients_data = Ingredient.objects.all()[0]
            data = {
                'recipe': recipe_data.id,
                'text_list': updated_text
            }
            response = api_client.patch(ingredients_data.get_absolute_url(), data)

            assert response.status_code == 200
            assert len(Ingredient.objects.all()) == 1
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text_list == updated_text
            assert Recipe.objects.all()[0].ingredients.text_list == updated_text 

        def test_updating_ingredients_forbiddent_if_not_recipe_author(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text_list = ['1','2','5']
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            api_client.post(create_ingredient_url, data)

            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            ingredients_data = Ingredient.objects.all()[0]
            updated_text = ['1','2','6']
            data = {
                'recipe': recipe_data.id,
                'text_list': updated_text
            }
            response = api_client.patch(ingredients_data.get_absolute_url(), data)

            assert response.status_code == 403
            assert len(Ingredient.objects.all()) == 1
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text_list == text_list
            assert Recipe.objects.all()[0].ingredients.text_list == text_list 

        def test_updating_multiple_times_allowed(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text_list = ['1','2','5']
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            api_client.post(create_ingredient_url, data)

            api_client.force_authenticate(recipe_data.author)
            updated_text = ['1','2','6']
            ingredients_data = Ingredient.objects.all()[0]
            data = {
                'recipe': recipe_data.id,
                'text_list': updated_text
            }
            response = api_client.patch(ingredients_data.get_absolute_url(), data)

            updated_text = ['1','2','7']
            data = {
                'recipe': recipe_data.id,
                'text_list': updated_text
            }
            response = api_client.patch(ingredients_data.get_absolute_url(), data)

            assert response.status_code == 200
            assert len(Ingredient.objects.all()) == 1
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text_list == updated_text
            assert Recipe.objects.all()[0].ingredients.text_list == updated_text 

        def test_updating_ingredients_forbidden_if_not_recipe_author(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text_list = ['1','2','5']
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list
            }
            api_client.post(create_ingredient_url, data)

            ingredients_data = Ingredient.objects.all()[0]
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            updated_text = ['1','2','7']
            data = {
                'recipe': recipe_data.id,
                'text_list': updated_text
            }
            response = api_client.patch(ingredients_data.get_absolute_url(), data)

            assert response.status_code == 403
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text_list == text_list
            assert Recipe.objects.all()[0].ingredients.text_list == text_list 

        def test_deleting_ingredients_allowed_to_recipe_author(self, api_client, create_ingredient):
            ingredients_data = create_ingredient
            api_client.force_authenticate(ingredients_data.recipe.author)
            response = api_client.delete(ingredients_data.get_absolute_url())

            assert response.status_code == 204
            assert len(Ingredient.objects.all()) == 0
            assert ingredients_data.recipe.ingredients == None

        def test_deleting_ingredients_forbidden_if_not_recipe_author(self, api_client, create_ingredient):
            ingredients_data = create_ingredient
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.delete(ingredients_data.get_absolute_url())

            assert response.status_code == 403
            assert len(Ingredient.objects.all()) == 1
            assert ingredients_data.recipe.ingredients == ingredients_data


    class TestGuestUsers:
        def test_ingredient_detail_page_should_not_render(self, api_client, create_ingredient, logout):
            ingredient_data = create_ingredient
            response = api_client.get(ingredient_data.get_absolute_url())

            assert response.status_code == 401

        def test_updating_ingredients_forbidden(self, api_client, create_ingredient, logout):
            ingredient_data = create_ingredient
            updated_text = ['1','2','6']
            data = {
                'recipe': ingredient_data.recipe.id,
                'text_list': updated_text
            }
            response = api_client.put(ingredient_data.get_absolute_url(), data)

            assert response.status_code == 401