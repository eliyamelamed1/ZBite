import pytest
from django.urls import resolve, reverse

from factories import RecipeFactory, UserFactory
from recipes.models import Recipe

pytestmark = pytest.mark.django_db

class TestListUrl:
    def test_list_reverse(self):
        assert reverse('recipes:list') == '/api/recipes/list/'

    def test_list_resolve(self):
        assert resolve('/api/recipes/list/').view_name == 'recipes:list'


class TestCreateUrl:
    def test_create_reverse(self):
        assert reverse('recipes:create') == '/api/recipes/create/'

    def test_create_resolve(self):
        assert resolve('/api/recipes/create/').view_name == 'recipes:create'


class TestDetailUrl:
    def test_detail_reverse(self):
        new_recipe = RecipeFactory()
        url = reverse('recipes:detail', kwargs={'pk': new_recipe.id})
        assert url == f'/api/recipes/{new_recipe.id}/'

    def test_detail_resolve(self):
        new_recipe = RecipeFactory()
        url = f'/api/recipes/{new_recipe.id}/'
        assert resolve(url).view_name == 'recipes:detail'


class TestSearchUrl:
    def test_search_url_reverse(self):
        url = reverse('recipes:search')
        assert url == f'/api/recipes/search/'

    def test_search_url_resolve(self):
        url = f'/api/recipes/search/'
        assert resolve(url).view_name == 'recipes:search'
class TestFollowedUsersRecipesUrl:
    def test_followed_account_recipes_reverse(self):
        url = reverse('recipes:followed')
        assert url == f'/api/recipes/followed/'

    def test_followed_account_recipes_resolve(self):
        url = f'/api/recipes/followed/'
        assert resolve(url).view_name == 'recipes:followed'
class TestTopRatedRecipesUrl:
    def test_top_rated_recipes_url_reverse(self):
        url = reverse('recipes:top')
        assert url == f'/api/recipes/top/'

    def test_top_rated_recipes_url_resolve(self):
        url = f'/api/recipes/top/'
        assert resolve(url).view_name == 'recipes:top'