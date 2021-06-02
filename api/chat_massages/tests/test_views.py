from factories import ChatMassageFactory, ChatRoomFactory
from django.http import response
import pytest
from factories import UserFactory
from chat_massages.models import ChatMassage 
from accounts.models import UserAccount

pytestmark = pytest.mark.django_db

chat_massage_create_url = ChatMassage.get_create_url()

class TestChatMassageCreate:
    class TestAuthenticatedUsers:
        def test_chat_massage_create_page_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(chat_massage_create_url)

            assert response.status_code == 405
        
        # def test_should_be_able_to_create_chat_massage(self, api_client):
        #     new_user = UserFactory()
        #     new_user2 = UserFactory()
        #     api_client.force_authenticate(new_user)
        #     room = ChatRoomFactory.create(participents=(new_user, new_user2))
        #     new_massage = ChatMassageFactory.create(room=(room, new_user))

            # new_massage = {
            #     'text': new_massage.text,
            #     'room': room,
            # }

            # response = api_client.post(chat_massage_create_url, new_massage)

            # assert response.status_code == 200

            # assert room.participents.all() == 5