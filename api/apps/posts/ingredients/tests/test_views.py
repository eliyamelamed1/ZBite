from apps.posts.ingredients.models import Ingredient
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

            assert create_ingredient_page_render.status_code == 405 # 405 = method not allowed - get isnt allowed only post

        def test_ingredient_create_post_request_required_fields(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            recipe_data = RecipeFactory()
            text = ['1','2','5']
            data = {
                'recipe': recipe_data.id,
                'text': text
            }
            response = api_client.post(create_ingredient_url, data)

            assert response.status_code == 201
            assert Ingredient.objects.all()[0].recipe == recipe_data
            assert Ingredient.objects.all()[0].text == text