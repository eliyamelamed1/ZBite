from factories import ChatMassageFactory, ChatGroupFactory
from django.http import response
import pytest
from factories import UserFactory
from chat_massages.models import ChatMassage 
from accounts.models import UserAccount
from chat_groups.models import ChatGroup

pytestmark = pytest.mark.django_db

chat_massage_create_url = ChatMassage.get_create_url()
massages_in_room_url = ChatMassage.get_massages_in_room_url()

#  TODO test cant massage group that i am not participating
class TestChatMassageCreate:
    class TestAuthenticatedUsers:
        def test_chat_massage_create_page_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(chat_massage_create_url)

            assert response.status_code == 405
        
        def test_create_chat_massage_successfully(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            group = ChatGroupFactory.create(members=(new_user, new_user2))
            new_massage = ChatMassageFactory.build()
            new_massage = {
                'text': new_massage.text,
                'group': group.id,
            }

            response = api_client.post(chat_massage_create_url, new_massage)

            assert response.status_code == 200
    
        
        def test_chat_massage_author_should_automatically_set_to_be_the_connected_user(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)

            group = ChatGroupFactory.create(members=(new_user, new_user2))
            new_massage = ChatMassageFactory.build()
            new_massage = {
                'text': new_massage.text,
                'group': group.id,
            }

            response = api_client.post(chat_massage_create_url, new_massage)
            new_massage = ChatMassage.objects.get(text=new_massage['text'])

            assert response.status_code == 200
            assert new_massage.author == new_user
    
        def test_cant_send_massage_to_a_group_i_am_not_participating_in(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_user3 = UserFactory()
            group = ChatGroupFactory.create(members=(new_user, new_user2))

            api_client.force_authenticate(new_user3)
            new_massage = ChatMassageFactory.build()
            new_massage = {
                'text': new_massage.text,
                'group': group.id,
            }

            response = api_client.post(chat_massage_create_url, new_massage)

            assert response.status_code == 403
    

    class TestGuestUsers:
        def test_chat_massage_create_page_should_not_render(self, api_client):
            response = api_client.get(chat_massage_create_url)

            assert response.status_code == 401

        def test_create_chat_massage_fail(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            group = ChatGroupFactory.create(members=(new_user, new_user2))

            new_massage = ChatMassageFactory.build()
            new_massage = {
                'author': new_user.id,
                'text': new_massage.text,
                'group': group.id,
            }

            response = api_client.post(chat_massage_create_url, new_massage)

            assert response.status_code == 401   


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
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                response = api_client.get(chat_massage.get_absolute_url())

                assert response.status_code == 401

    class TestUpdate:
        class TestAuthor:
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                api_client.force_authenticate(chat_massage.author)
                updated_chat_massage = {
                    'text': 'updated_chat_massage'
                }
                response = api_client.patch(chat_massage.get_absolute_url(), updated_chat_massage)

                assert response.status_code == 200

        class TestAuthenticated:
            def test_chat_massage_details_page_should_render(self, api_client):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)
                chat_massage = ChatMassageFactory()
                updated_chat_massage = {
                    'text': 'updated_chat_massage'
                }
                response = api_client.patch(chat_massage.get_absolute_url(), updated_chat_massage)

                assert response.status_code == 403

        class TestGuest:
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                updated_chat_massage = {
                    'text': 'updated_chat_massage'
                }
                response = api_client.patch(chat_massage.get_absolute_url(), updated_chat_massage)

                assert response.status_code == 401


    class TestDestroy:
        class TestAuthor:
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                api_client.force_authenticate(chat_massage.author)
                response = api_client.delete(chat_massage.get_absolute_url())

                assert response.status_code == 204

        class TestAuthenticated:
            def test_chat_massage_details_page_should_render(self, api_client):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)
                chat_massage = ChatMassageFactory()
                response = api_client.delete(chat_massage.get_absolute_url())

                assert response.status_code == 403

        class TestGuest:
            def test_chat_massage_details_page_should_render(self, api_client):
                chat_massage = ChatMassageFactory()
                response = api_client.delete(chat_massage.get_absolute_url())

                assert response.status_code == 401



class TestChatMassagesInRoom:
    class TestMembers:
        def test_chat_group_massage_page_should_render(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)

            ChatGroupFactory.create(members=(new_user, new_user2))
            response = api_client.get(massages_in_room_url)

            assert response.status_code == 405

        def test_chat_post_request_allowed(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()

            api_client.force_authenticate(new_user)
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))
            data = {
                'group': new_chat_group.id
            }

            response = api_client.post(massages_in_room_url, data)

            assert response.status_code == 200

        def test_should_render_chat_massages(self, api_client, chat_massage_create):
            new_chat_massage = chat_massage_create
            api_client.force_authenticate(new_chat_massage.author)
            data = {
                'group': new_chat_massage.group.id
            }

            response = api_client.post(massages_in_room_url, data)

            assert response.status_code == 200
            assert f'{new_chat_massage}' in f'{response.content}'
            
    class TestAuthenticatedNonMembers:
        def test_chat_group_massage_page_should_render(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_user3 = UserFactory()
            api_client.force_authenticate(new_user3)

            ChatGroupFactory.create(members=(new_user, new_user2))
            response = api_client.get(massages_in_room_url)

            assert response.status_code == 405
        
        def test_chat_post_request_denied_to_non_participant_group(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_user3 = UserFactory()
            api_client.force_authenticate(new_user3)
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))
            data = {
                'group': new_chat_group.id
            }
            response = api_client.post(massages_in_room_url, data)

            assert response.status_code == 403

 
        def test_should_not_render_chat_massages(self, api_client, chat_massage_create):
            new_chat_massage = chat_massage_create
            api_client.force_authenticate(UserFactory())
            data = {
                'group': new_chat_massage.group
            }

            response = api_client.post(massages_in_room_url, data)

            assert response.status_code == 403
