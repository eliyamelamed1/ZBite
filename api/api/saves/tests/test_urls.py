import pytest
from django.urls import resolve, reverse

pytestmark = pytest.mark.django_db

class TestSaveRecipeUrl:
    def test_save_recipe_reverse(self):
        assert reverse('saves:save') == '/api/saves/save/'

    def test_save_recipe_resolve(self):
        assert resolve('/api/saves/save/').view_name == 'saves:save'