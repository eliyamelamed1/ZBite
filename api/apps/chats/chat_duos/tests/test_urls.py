import pytest
from django.urls import resolve, reverse

pytestmark = pytest.mark.django_db

class TestChatDuoList:
    def test_reverse(self):
        assert reverse('chat_duos:list') == '/api/chat_duos/list/'

    def test_resolve(self):
        assert resolve('/api/chat_duos/list/').view_name == 'chat_duos:list'


class TestChatDuoCreate:
    def test_reverse(self):
        assert reverse('chat_duos:create') == '/api/chat_duos/create/'

    def test_resolve(self):
        assert resolve('/api/chat_duos/create/').view_name == 'chat_duos:create'
