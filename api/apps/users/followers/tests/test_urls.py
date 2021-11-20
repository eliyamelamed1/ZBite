import pytest
from django.urls import resolve, reverse

from factories import RecipeFactory, UserFactory
from apps.users.followers.serializers import FollowSerializer
from apps.posts.recipes.models import Recipe

pytestmark = pytest.mark.django_db

class TestFollowSomeone:
    def test_follow_reverse(self):
        assert reverse('followers:follow') == '/api/followers/follow/'

    def test_follow_resolve(self):
        assert resolve('/api/followers/follow/').view_name == 'followers:follow'