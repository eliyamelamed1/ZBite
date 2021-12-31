import pytest
from django.urls import resolve, reverse

from factories import ChatMassageFactory

pytestmark = pytest.mark.django_db

class TestChatMassageCreate:
    def test_reverse(self):
        assert reverse('chat_massages:create') == '/api/chat_massages/create/'

    def test_resolve(self):
        assert resolve('/api/chat_massages/create/').view_name == 'chat_massages:create'


class TestChatMassageDetails:
    def test_reverse(self):
        chat_massage = ChatMassageFactory()
        chat_massage_details_url = reverse('chat_massages:details', kwargs={'pk': chat_massage.id})
        assert chat_massage_details_url == f'/api/chat_massages/{chat_massage.id}/'

    def test_resolve(self):
        chat_massage = ChatMassageFactory()
        chat_massage_details_url = f'/api/chat_massages/{chat_massage.id}/'

        assert resolve(chat_massage_details_url).view_name == 'chat_massages:details'

class TestChatMassageUpdate:
    def test_reverse(self):
        chat_massage = ChatMassageFactory()
        chat_massage_update_url = reverse('chat_massages:update', kwargs={'pk': chat_massage.id})
        assert chat_massage_update_url == f'/api/chat_massages/{chat_massage.id}/update/'

    def test_resolve(self):
        chat_massage = ChatMassageFactory()
        chat_massage_update_url = f'/api/chat_massages/{chat_massage.id}/update/'

        assert resolve(chat_massage_update_url).view_name == 'chat_massages:update'

class TestChatMassagesInRoom:
    def test_reverse(self):
        massages_in_room_url = reverse('chat_massages:massages_in_room')

        assert massages_in_room_url == f'/api/chat_massages/massages_in_room/'

    def test_resolve(self):
        massages_in_room_url = f'/api/chat_massages/massages_in_room/'

        assert resolve(massages_in_room_url).view_name == 'chat_massages:massages_in_room'
