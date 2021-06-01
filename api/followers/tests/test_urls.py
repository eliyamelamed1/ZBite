import pytest
from django.urls import resolve, reverse

from factories import RecipeFactory, UserFactory
from followers.serializers import FollowSerializer
from recipes.models import Recipe

pytestmark = pytest.mark.django_db

class TestFollowSomeone:
    def test_follow_reverse(self):
        assert reverse('followers:create') == '/api/followers/create/'

    def test_follow_resolve(self):
        assert resolve('/api/followers/create/').view_name == 'followers:create'