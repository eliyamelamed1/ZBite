import pytest
from django.urls import reverse

from followers.models import Follower

pytestmark = pytest.mark.django_db

def test_get_create_url():
    assert Follower.get_create_url() == reverse('followers:create')