import pytest
from django.urls import resolve, reverse

from factories import ChatGroupFactory

pytestmark = pytest.mark.django_db

class TestChatGroupList:
    def test_reverse(self):
        assert reverse('chat_groups:list') == '/api/chat_groups/list/'

    def test_resolve(self):
        assert resolve('/api/chat_groups/list/').view_name == 'chat_groups:list'


class TestChatGroupCreate:
    def test_reverse(self):
        assert reverse('chat_groups:create') == '/api/chat_groups/create/'

    def test_resolve(self):
        assert resolve('/api/chat_groups/create/').view_name == 'chat_groups:create'


class TestChatGroupUpdateMembers:
    def test_reverse(self):
        chat_group = ChatGroupFactory()
        url = reverse('chat_groups:update_members', kwargs={'pk': chat_group.id})
        assert url == f'/api/chat_groups/{chat_group.id}/update_members/'

    def test_resolve(self):
        chat_group = ChatGroupFactory()
        url = f'/api/chat_groups/{chat_group.id}/update_members/'

        assert resolve(url).view_name == 'chat_groups:update_members'

class TestChatGroupUpdateTitle:
    def test_reverse(self):
        chat_group = ChatGroupFactory()
        url = reverse('chat_groups:update_title', kwargs={'pk': chat_group.id})
        assert url == f'/api/chat_groups/{chat_group.id}/update_title/'

    def test_resolve(self):
        chat_group = ChatGroupFactory()
        url = f'/api/chat_groups/{chat_group.id}/update_title/'
        assert resolve(url).view_name == 'chat_groups:update_title'
