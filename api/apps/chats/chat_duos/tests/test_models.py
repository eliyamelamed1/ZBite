import pytest
from django.urls import reverse

from apps.chats.chat_duos.models import ChatDuo

pytestmark = pytest.mark.django_db

def test_get_create_url():
    create_chat_duo_url = reverse('chat_duos:create')
    assert ChatDuo.get_create_url() == create_chat_duo_url

def test_get_list_url():
    create_chat_duo_url = reverse('chat_duos:create')
    assert ChatDuo.get_create_url() == create_chat_duo_url
