import pytest
from django.urls import reverse

from chat_groups.models import ChatGroup
from factories import ChatGroupFactory, RecipeFactory, UserFactory
from recipes.models import Recipe

pytestmark = pytest.mark.django_db

def test__str__():
    chat_group = ChatGroupFactory()

    assert chat_group.__str__() == chat_group.title

def test_get_update_members_url():
    chat_group = ChatGroupFactory()
    update_members_url = reverse('chat_groups:update_members', kwargs={"pk": chat_group.id})
    assert chat_group.get_update_members_url() == update_members_url

def test_get_update_title_url():
    chat_group = ChatGroupFactory()
    update_title_url = reverse('chat_groups:update_title', kwargs={"pk": chat_group.id})
    assert chat_group.get_update_title_url() == update_title_url

def test_get_create_url():
    create_chat_group_url = reverse('chat_groups:create')
    assert ChatGroup.get_create_url() == create_chat_group_url
