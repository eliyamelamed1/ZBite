import pytest

from chat_massages.models import ChatMassage
from factories import (ChatDuoFactory, ChatGroupFactory, ChatMassageFactory,
                       UserFactory)

pytestmark = pytest.mark.django_db

chat_massage_create_url = ChatMassage.get_create_url()
massages_in_room_url = ChatMassage.get_massages_in_room_url()

class TestChatMassageCreate:
    class TestRoomGroupInput:
        class TestMembers:
            def test_create_chat_massage_successfully(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                api_client.force_authenticate(new_user)
                room = ChatGroupFactory.create(members=(new_user, new_user2))
                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'text': new_massage.text,
                    'room': room.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)

                assert response.status_code == 200
                assert ChatMassage.objects.all()[0].text == new_massage['text']
                assert ChatMassage.objects.all().count() == 1

            
            def test_chat_massage_author_should_automatically_set_to_be_the_connected_user(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                api_client.force_authenticate(new_user)

                room = ChatGroupFactory.create(members=(new_user, new_user2))
                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'text': new_massage.text,
                    'room': room.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)
                new_massage = ChatMassage.objects.get(text=new_massage['text'])

                assert response.status_code == 200
                assert new_massage.author == new_user

        class TestAuthenticatedNonMembers:
            def test_chat_massage_create_page_render(self, api_client):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)

                response = api_client.get(chat_massage_create_url)

                assert response.status_code == 405
        
            def test_cant_send_massage_to_a_room_i_am_not_participating_in(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_user3 = UserFactory()
                room = ChatGroupFactory.create(members=(new_user, new_user2))

                api_client.force_authenticate(new_user3)
                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'text': new_massage.text,
                    'room': room.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)

                assert response.status_code == 403
                assert ChatMassage.objects.all().count() == 0
        

        class TestGuestUsers:
            def test_chat_massage_create_page_should_not_render(self, api_client):
                response = api_client.get(chat_massage_create_url)

                assert response.status_code == 401

            def test_create_chat_massage_fail(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                room = ChatGroupFactory.create(members=(new_user, new_user2))

                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'author': new_user.id,
                    'text': new_massage.text,
                    'room': room.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)

                assert response.status_code == 401   
                assert ChatMassage.objects.all().count() == 0

    class TestRoomDuoInput:
        class TestMembers:
            def test_create_chat_massage_successfully(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                api_client.force_authenticate(new_user)
                duo = ChatDuoFactory.create(members=(new_user, new_user2))
                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'text': new_massage.text,
                    'room': duo.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)

                assert response.status_code == 200
                assert ChatMassage.objects.all().count() == 1
                assert ChatMassage.objects.all()[0].text == new_massage['text']


            
            def test_chat_massage_author_should_automatically_set_to_be_the_connected_user(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                api_client.force_authenticate(new_user)

                duo = ChatDuoFactory.create(members=(new_user, new_user2))
                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'text': new_massage.text,
                    'room': duo.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)
                new_massage = ChatMassage.objects.get(text=new_massage['text'])

                assert response.status_code == 200
                assert new_massage.author == new_user

        class TestAuthenticatedNonMembers:
            def test_cant_send_massage_to_a_duo_i_am_not_participating_in(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_user3 = UserFactory()
                duo = ChatDuoFactory.create(members=(new_user, new_user2))

                api_client.force_authenticate(new_user3)
                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'text': new_massage.text,
                    'room': duo.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)

                assert response.status_code == 403
                assert ChatMassage.objects.all().count() == 0
        
        class TestGuestUsers:
            def test_create_chat_massage_fail(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                duo = ChatDuoFactory.create(members=(new_user, new_user2))

                new_massage = ChatMassageFactory.build()
                new_massage = {
                    'author': new_user.id,
                    'text': new_massage.text,
                    'room': duo.id,
                }

                response = api_client.post(chat_massage_create_url, new_massage)

                assert response.status_code == 401 
                assert ChatMassage.objects.all().count() == 0
  


class TestChatMassageDetails:
    class TestRetrieve:
        class TestAuthor:
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                api_client.force_authenticate(chat_massage.author)
                response = api_client.get(chat_massage.get_absolute_url())
                assert response.status_code == 200

        class TestAuthenticated:
            def test_chat_massage_details_page_should_render(self, api_client):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)
                chat_massage = ChatMassageFactory()
                response = api_client.get(chat_massage.get_absolute_url())

                assert response.status_code == 403

        class TestGuest:
            def test_chat_massage_details_page_should_not_render(self, api_client):
                chat_massage = ChatMassageFactory()
                response = api_client.get(chat_massage.get_absolute_url())

                assert response.status_code == 401


    class TestDestroy:
        class TestAuthor:
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                api_client.force_authenticate(chat_massage.author)
                response = api_client.delete(chat_massage.get_absolute_url())

                assert response.status_code == 204
                assert ChatMassage.objects.all().count() == 0

        class TestAuthenticated:
            def test_chat_massage_details_page_should_render(self, api_client):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)
                chat_massage = ChatMassageFactory()
                response = api_client.delete(chat_massage.get_absolute_url())

                assert response.status_code == 403
                assert ChatMassage.objects.all().count() == 1

        class TestGuest:
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                response = api_client.delete(chat_massage.get_absolute_url())

                assert response.status_code == 401
                assert ChatMassage.objects.all().count() == 1



class TestChatMassagesInRoom:
    class TestGroup:
        class TestMembers:
            def test_chat_post_request_response(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                api_client.force_authenticate(new_user)
                new_chat_room = ChatGroupFactory.create(members=(new_user, new_user2))
                data = {
                    'room': new_chat_room.id
                }
                response = api_client.post(massages_in_room_url, data)
                
                assert response.status_code == 200

            def test_should_render_room_chat_massages(self, api_client, chat_massage_create):
                new_chat_massage = chat_massage_create
                api_client.force_authenticate(new_chat_massage.author)
                data = {
                    'room': new_chat_massage.room.id
                }
                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 200
                assert f'{new_chat_massage}' in f'{response.content}'
        class TestAuthenticatedNonMembers:
            def test_chat_room_massage_page_should_render(self, api_client):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)

                response = api_client.get(massages_in_room_url)

                assert response.status_code == 405
            
            def test_chat_post_request_denied_to_non_member_room(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_user3 = UserFactory()
                api_client.force_authenticate(new_user3)
                new_chat_room = ChatGroupFactory.create(members=(new_user, new_user2))
                data = {
                    'room': new_chat_room.id
                }
                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 403
    
            def test_should_not_render_room_chat_massages(self, api_client, chat_massage_create):
                new_chat_massage = chat_massage_create
                api_client.force_authenticate(UserFactory())
                data = {
                    'room': new_chat_massage.room
                }

                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 403
            
        class TestGuest:
            def test_chat_post_request_not_allowed_for_guests(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_chat_room = ChatGroupFactory.create(members=(new_user, new_user2))
                data = {
                    'room': new_chat_room.id
                }
                response = api_client.post(massages_in_room_url, data)
                
                assert response.status_code == 401

            def test_should_not_render_room_chat_massages(self, api_client, chat_massage_create):
                new_chat_massage = chat_massage_create
                data = {
                    'room': new_chat_massage.room.id
                }
                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 401
                assert f'{new_chat_massage}' not in f'{response.content}'

    class TestDuo:
        class TestMembers:           
            def test_chat_post_request_allowed_input_duo(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                api_client.force_authenticate(new_user)
                new_chat_duo = ChatDuoFactory.create(members=(new_user, new_user2))
                data = {
                    'room': new_chat_duo.id
                }
                response = api_client.post(massages_in_room_url, data)
                assert response.status_code == 200

            def test_should_render_duo_chat_massages(self, api_client, chat_massage_create):
                new_chat_massage = chat_massage_create
                new_chat_duo = ChatDuoFactory(members=(new_chat_massage.author, UserFactory()))
                new_chat_massage.room = new_chat_duo
                new_chat_massage.save()
                api_client.force_authenticate(new_chat_massage.author)
                data = {
                    'room': new_chat_massage.room.id
                }
                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 200 
                assert f'{new_chat_massage}' in f'{response.content}'
    
        class TestAuthenticatedNonMembers:
            def test_chat_post_request_denied_to_non_member_duo(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_user3 = UserFactory()
                api_client.force_authenticate(new_user3)
                new_chat_duo = ChatDuoFactory.create(members=(new_user, new_user2))
                data = {
                    'room': new_chat_duo.id
                }
                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 403
            def test_should_not_render_duo_chat_massages(self, api_client, chat_massage_create):
                new_chat_massage = chat_massage_create
                new_chat_duo = ChatDuoFactory()
                new_chat_massage.room = new_chat_duo
                new_chat_massage.save()

                api_client.force_authenticate(UserFactory())
                data = {
                    'room': new_chat_massage.room
                }

                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 403
        class TestGuest:
            def test_chat_post_request_not_allowed_for_guests(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_chat_duo = ChatDuoFactory.create(members=(new_user, new_user2))
                data = {
                    'room': new_chat_duo.id
                }
                response = api_client.post(massages_in_room_url, data)
                
                assert response.status_code == 401

            def test_should_not_render_duo_chat_massages(self, api_client, chat_massage_create):
                new_chat_massage = chat_massage_create
                new_chat_duo = ChatDuoFactory()
                new_chat_massage.room = new_chat_duo
                new_chat_massage.save()
                
                data = {
                    'room': new_chat_massage.room.id
                }
                response = api_client.post(massages_in_room_url, data)

                assert response.status_code == 401

# TODO add test to update other field than text (they should fail)
class TestChatMassageUpdate:
    class TestAuthor:
        def test_chat_massage_update_page_should_render(self, api_client):
            chat_massage = ChatMassageFactory()
            api_client.force_authenticate(chat_massage.author)
            response = api_client.get(chat_massage.get_update_url())
            assert response.status_code == 405
            
        def test_chat_massage_text_update_should_work(self, api_client):
            chat_massage = ChatMassageFactory()
            api_client.force_authenticate(chat_massage.author)
            updated_chat_massage = {
                'text': 'updated_chat_massage'
            }
            response = api_client.patch(chat_massage.get_update_url(), updated_chat_massage)
            chat_massage = ChatMassage.objects.get(text=updated_chat_massage['text'])

            assert response.status_code == 200
            assert f'{chat_massage}' in f'{response.content}'

    class TestAuthenticated:
        def test_chat_massage_update_page_should_not_render(self, api_client):
            chat_massage = ChatMassageFactory()
            response = api_client.get(chat_massage.get_update_url())
            assert response.status_code == 401

        def test_chat_massage_update_page_should_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            chat_massage = ChatMassageFactory()
            updated_chat_massage = {
                'text': 'updated_chat_massage'
            }
            response = api_client.patch(chat_massage.get_update_url(), updated_chat_massage)
            assert response.status_code == 403
            assert f'{updated_chat_massage}' not in f'{response.content}'
    class TestGuest:
        def test_chat_massage_update_page_should_not_render(self, api_client):
            chat_massage = ChatMassageFactory()
            response = api_client.get(chat_massage.get_update_url())
            assert response.status_code == 401

        def test_chat_massage_details_page_should_not_render(self, api_client):
            chat_massage = ChatMassageFactory()
            updated_chat_massage = {
                'text': 'updated_chat_massage'
            }

            response = api_client.patch(chat_massage.get_update_url(), updated_chat_massage)
            assert response.status_code == 401
            assert f'{chat_massage}' not in f'{response.content}'