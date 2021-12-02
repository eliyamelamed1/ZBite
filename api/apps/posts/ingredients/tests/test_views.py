from apps.posts.ingredients.models import Ingredient
from apps.posts.recipes.models import Recipe
import pytest
from django.urls import reverse

from apps.users.accounts.models import UserAccount
from factories import RecipeFactory, UserFactory

create_ingredient_url = reverse('ingredients:create')
update_ingredient_url = reverse('ingredients:update')
pytestmark = pytest.mark.django_db


class TestIngredientCreateView:
    class TestAuthenticatedUsers:
        def test_ingredient_create_page_render(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            create_ingredient_page_render = api_client.get(create_ingredient_url)

            assert create_ingredient_page_render.status_code == 405 # 405 = method not allowed - get isnt allowed only post

        def test_adding_ingredients_allowed_to_recipe_author(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text': text
            }
            response = api_client.post(create_ingredient_url, data)


            assert response.status_code == 201
            assert len(Ingredient.objects.all()) == 1
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text == text
            assert Recipe.objects.all()[0].ingredients.text == text 

        def test_adding_ingredients_not_allowed_if_not_recipe_author(self, api_client):
            new_user = UserFactory()
            recipe_data = RecipeFactory()
            api_client.force_authenticate(new_user)
            text = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text': text
            }
            response = api_client.post(create_ingredient_url, data)

            assert response.status_code == 403
            assert len(Ingredient.objects.all()) == 0
  
        def test_creating_multiple_ingredients_models_for_different_recipes_is_allowed(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text': text
            }
            response = api_client.post(create_ingredient_url, data)

            recipe_data2 = RecipeFactory()
            api_client.force_authenticate(recipe_data2.author)
            text2 = ['1','2','4']

            data = {
                'recipe': recipe_data2.id,
                'text': text2
            }
            response2 = api_client.post(create_ingredient_url, data)


            assert len(Ingredient.objects.all()) == 2
            
            assert response.status_code == 201
            assert Ingredient.objects.all()[0].author == recipe_data.author
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text == text
            assert Recipe.objects.all()[0].ingredients.text == text2 

            assert response2.status_code == 201
            assert Ingredient.objects.all()[1].author == recipe_data2.author
            assert Ingredient.objects.all()[1].recipe == recipe_data2
            assert Ingredient.objects.all()[1].text == text2
            assert Recipe.objects.all()[1].ingredients.text == text2 



        def test_creating_multiple_ingredients_models_for_same_recipe_is_forbidden(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            text = ['1','2','5']

            data = {
                'recipe': recipe_data.id,
                'text': text
            }
            response1 = api_client.post(create_ingredient_url, data)
            data = {
                'recipe': recipe_data.id,
                'text': text
            }
            response2 = api_client.post(create_ingredient_url, data)

            assert response2.status_code == 403


    class TestGuestUsers:
        def test_ingredient_create_page_should_not_render(self, api_client):
            create_ingredient_page_render = api_client.get(create_ingredient_url)

            assert create_ingredient_page_render.status_code == 401

# class TestIngredientUpdateView:
#     class TestAuthenticatedUsers:
#         def test_ingredient_update_page_render(self, api_client):
#             new_user = UserAccount()
#             api_client.force_authenticate(new_user)
#             update_ingredient_page_render = api_client.get(update_ingredient_url)

#             assert update_ingredient_page_render.status_code == 405 # 405 = method not allowed - get isnt allowed only post

#         def test_adding_ingredients_allowed_to_recipe_author(self, api_client):
#             recipe_data = RecipeFactory()
#             api_client.force_authenticate(recipe_data.author)
#             text = ['1','2','5']

#             data = {
#                 'recipe': recipe_data.id,
#                 'text': text
#             }
#             response = api_client.post(create_ingredient_url, data)


#             assert response.status_code == 201
#             assert len(Ingredient.objects.all()) == 1
#             assert Ingredient.objects.all()[0].author == recipe_data.author
#             assert Ingredient.objects.all()[0].recipe == recipe_data
#             assert Ingredient.objects.all()[0].text == text
#             assert Recipe.objects.all()[0].ingredients.text == text 

#         def test_creating_multiple_ingredients_models_for_recipe_is_forbidden(self, api_client):
#             recipe_data = RecipeFactory()
#             api_client.force_authenticate(recipe_data.author)
#             text = ['1','2','5']

#             data = {
#                 'recipe': recipe_data.id,
#                 'text': text
#             }
#             response = api_client.post(create_ingredient_url, data)
#             data = {
#                 'recipe': recipe_data.id,
#                 'text': ['1','2']
#             }
#             response = api_client.post(create_ingredient_url, data)

#             assert response.status_code == 403

#         def test_adding_ingredients_not_allowed_if_not_recipe_author(self, api_client):
#             new_user = UserFactory()
#             recipe_data = RecipeFactory()
#             api_client.force_authenticate(new_user)
#             text = ['1','2','5']

#             data = {
#                 'recipe': recipe_data.id,
#                 'text': text
#             }
#             response = api_client.post(create_ingredient_url, data)

#             assert response.status_code == 403
#             assert len(Ingredient.objects.all()) == 0


#     class TestGuestUsers:
#         def test_ingredient_update_page_should_not_render(self, api_client):
#             update_ingredient_page_render = api_client.get(update_ingredient_url)

#             assert update_ingredient_page_render.status_code == 401
