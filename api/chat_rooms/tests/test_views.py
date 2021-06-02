from chat_rooms.models import ChatRoom
from factories import ChatMassageFactory, ChatRoomFactory
import pytest
from factories import UserFactory


pytestmark = pytest.mark.django_db

chat_room_create_url = ChatRoom.get_create_url()

class TestChatRoomCreate:
    class TestAuthenticatedUsers:
        def test_chat_room_create_page_should_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(chat_room_create_url)

            assert response.status_code == 405

        def test_chat_room_create_post_request(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            new_chat_room = ChatRoomFactory.build()

            new_chat_room = {
                'title': new_chat_room.title,
                'participents': [new_user.id, new_user2.id]
            }

            response = api_client.post(chat_room_create_url, new_chat_room)

            assert response.status_code == 201


        def test_preform_create_author_is_the_logged_user(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            new_chat_room = ChatRoomFactory.build()
            new_chat_room = {
                'author': new_user2,
                'title': new_chat_room.title,
                'participents': [new_user.id, new_user2.id]
            }

            api_client.post(chat_room_create_url, new_chat_room)
            
            new_chat_room = ChatRoom.objects.get(title=new_chat_room['title'])
            
            assert new_chat_room.author == new_user
        
        class TestGuestUsers:
            def test_chat_room_create_page_should_not_render(self, api_client):
                response = api_client.get(chat_room_create_url)

                assert response.status_code == 401
            
            def test_chat_room_create_post_request_not_allowed(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_chat_room = ChatRoomFactory.build()

                new_chat_room = {
                    'title': new_chat_room.title,
                    'participents': [new_user.id, new_user2.id]
                }

                response = api_client.post(chat_room_create_url, new_chat_room)

                assert response.status_code == 401
