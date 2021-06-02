from django.urls.base import reverse
from chat_rooms.models import ChatRoom
from factories import ChatMassageFactory, ChatRoomFactory
import pytest
from factories import UserFactory


pytestmark = pytest.mark.django_db

chat_room_create_url = ChatRoom.get_create_url()
chat_rooms_list = reverse('chat_rooms:list')

class TestChatRoomList:
    class TestAuthenticatedUsers:
        def test_chat_room_list_page_should_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(chat_rooms_list)

            assert response.status_code == 200

        def test_chat_room_list_should_not_render_to_user_that_doesnt_participate(self, api_client):
            first_participating_user = UserFactory()
            second_participating_user = UserFactory()
            new_chat_room = ChatRoomFactory.create(participants=(first_participating_user, second_participating_user))

            not_participating_user = UserFactory()
            api_client.force_authenticate(not_participating_user)

            response = api_client.get(chat_rooms_list)

            assert f'{new_chat_room}' not in f'{response.content}'

        def test_chat_room_list_should_render_participating_user(self, api_client):
            first_participating_user = UserFactory()
            second_participating_user = UserFactory()
            new_chat_room = ChatRoomFactory.create(participants=(first_participating_user, second_participating_user))

            api_client.force_authenticate(first_participating_user)

            response = api_client.get(chat_rooms_list)

            assert f'{new_chat_room}' in f'{response.content}'

    class TestGuestUsers:
        def test_chat_room_list_page_should_not_render(self, api_client):
            response = api_client.get(chat_rooms_list)

            assert response.status_code == 401


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
                'participants': [new_user.id, new_user2.id]
            }

            response = api_client.post(chat_room_create_url, new_chat_room)

            assert response.status_code == 201


        def test_logged_in_user_is_the_author(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            new_chat_room = ChatRoomFactory.build()
            new_chat_room = {
                'author': new_user2,
                'title': new_chat_room.title,
                'participants': [new_user2.id]
            }

            api_client.post(chat_room_create_url, new_chat_room)
            
            new_chat_room = ChatRoom.objects.get(title=new_chat_room['title'])
            
            assert new_chat_room.author == new_user
            assert new_chat_room.participants.all().count() == 2
        
        def test_author_is_automaticaly_added_to_chat_room_participants(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)

            new_chat_room = ChatRoomFactory.build()
            new_chat_room = {
                'title': new_chat_room.title,
                'participants': [new_user2.id]
            }

            api_client.post(chat_room_create_url, new_chat_room)
            
            new_chat_room = ChatRoom.objects.get(title=new_chat_room['title'])
            
            assert new_user and new_user2 in new_chat_room.participants.all()
        
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
                    'participants': [new_user.id, new_user2.id]
                }

                response = api_client.post(chat_room_create_url, new_chat_room)

                assert response.status_code == 401

# class TestChatRoomUpdateparticipants:
#     class TestAuthenticatedUsers:
#         def test_update_participants_page_should_render(self, api_client):
#             new_user = UserFactory()
#             api_client.force_authenticate(new_user)
#             new_chat_room = ChatRoomFactory()

#             chat_room_update_participants_url = reverse('chat_rooms:update_participants', kwargs={"pk": new_chat_room.id})
#             response = api_client.get(chat_room_update_participants_url)

#             assert response.status_code == 405
    
# chat_room_update_title_url = ChatRoom.get_update_title_url() 