import pytest
from django.urls import reverse

from factories import SaveFactory
from apps.posts.saves.models import Save

pytestmark = pytest.mark.django_db

def test__str__():
    new_save = SaveFactory()

    assert new_save.__str__() == str(new_save.author)

def test_get_create_url():
    assert Save.get_create_url() == reverse('saves:save')