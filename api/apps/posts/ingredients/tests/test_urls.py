import pytest
from django.urls import resolve, reverse

from factories import RecipeFactory

pytestmark = pytest.mark.django_db

class TestCreateView:
    def test_reverse(self):
        assert reverse('ingredients:create') == '/api/ingredients/create/'

    def test_resolve(self):
        assert resolve('/api/ingredients/create/').view_name == 'ingredients:create'

class TestDetailsView:
    def test_reverse(self, create_ingredient):
        new_ingredient = create_ingredient
        url = reverse('ingredients:details', kwargs={"pk": new_ingredient.id})

        assert url == f'/api/ingredients/{new_ingredient.id}/'

    def test_resolve(self, create_ingredient):
        new_ingredient = create_ingredient
        url = f'/api/ingredients/{new_ingredient.id}/'
        assert resolve(url).view_name == 'ingredients:details'

