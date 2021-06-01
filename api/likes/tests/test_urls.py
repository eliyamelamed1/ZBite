import pytest
from django.urls import resolve, reverse

pytestmark = pytest.mark.django_db

class TestLikeRecipeUrl:
    def test_like_recipe_reverse(self):
        assert reverse('likes:like') == '/api/likes/like/'

    def test_like_recipe_resolve(self):
        assert resolve('/api/likes/like/').view_name == 'likes:like'