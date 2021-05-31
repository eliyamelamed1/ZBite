import pytest
from django.urls import reverse

from factories import LikeFactory
from likes.models import Like

pytestmark = pytest.mark.django_db

def test__str__():
    new_like = LikeFactory()

    assert new_like.__str__() == str(new_like.author)

def test_get_create_url():
    assert Like.get_create_url() == reverse('likes:like')