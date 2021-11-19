import pytest
from django.urls import reverse

from followers.models import Follower

pytestmark = pytest.mark.django_db

def test_get_follow_url():
    assert Follower.get_follow_url() == reverse('followers:follow')