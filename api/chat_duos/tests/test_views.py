import pytest
from django.urls.base import reverse

from chat_duos.models import ChatDuo
from factories import ChatDuoFactory, UserFactory

pytestmark = pytest.mark.django_db

chat_duo_create_url = ChatDuo.get_create_url()
chat_duo_list_url = ChatDuo.get_list_url()

class TestChatDuoList:
    class TestAuthenticated:
        def test_chat_duo_list_page_should_render(self, api_client):
            user = UserFactory()
            api_client.force_authenticate(user)
            response = api_client.get(chat_duo_list_url)

            assert response.status_code == 200
        
        def test_should_load_my_chat_duos(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            chat_duo = ChatDuoFactory.create(members=(user,user2))
            api_client.force_authenticate(user)

            response = api_client.get(chat_duo_list_url)

            assert f'{chat_duo.id}' in f'{response.content}'

        def test_should_not_load_others_chat_duos(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            user3 = UserFactory()

            chat_duo = ChatDuoFactory.create(members=(user2,user3))
            api_client.force_authenticate(user)

            response = api_client.get(chat_duo_list_url)

            assert f'{chat_duo.id}' not in f'{response.content}'

    class TestGuest:
        def test_chat_duo_list_page_should_render(self, api_client):
            response = api_client.get(chat_duo_list_url)

            assert response.status_code == 401
        
        def test_should_not_load_others_chat_duos(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            chat_duo = ChatDuoFactory.create(members=(user,user2))

            response = api_client.get(chat_duo_list_url)

            assert f'{chat_duo.id}' not in f'{response.content}'

class TestChatDuoCreate:
    class TestAuthenticated:
        def test_page_should_render(self, api_client):
            user = UserFactory()
            api_client.force_authenticate(user)
            response = api_client.get(chat_duo_create_url)

            assert response.status_code == 405
        
        def test_create_chat_duo_with_2_members_allowed(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            api_client.force_authenticate(user)

            chat_duo = {
                'members': [user.id, user2.id]
            }
            response = api_client.post(chat_duo_create_url, chat_duo)

            assert response.status_code == 201

        def test_create_chat_duo_with_above_2_members_not_allowed(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            user3 = UserFactory()
            api_client.force_authenticate(user)

            chat_duo = {
                'members': [user.id, user2.id, user3.id]
            }
            response = api_client.post(chat_duo_create_url, chat_duo)

            assert response.status_code == 403

        def test_create_chat_duo_with_below_2_members_not_allowed(self, api_client):
            user = UserFactory()
            api_client.force_authenticate(user)

            chat_duo = {
                'members': [user.id]
            }
            response = api_client.post(chat_duo_create_url, chat_duo)

            assert response.status_code == 403

            assert ChatDuo.objects.all().count()==0

        def test_logged_user_is_automatically_added_to_the_chat_duo_members(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            api_client.force_authenticate(user)

            chat_duo = {
                'members': [user2.id]
            }
            response = api_client.post(chat_duo_create_url, chat_duo)

            chat_duo = ChatDuo.objects.all()[0]

            assert response.status_code == 201
            assert user and user2 in chat_duo.members.all()

        def test_creating_chat_duos_with_the_same_members_are_not_allowed(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            api_client.force_authenticate(user)
            chat_duo = {
                'members': [user2.id]
            }
            api_client.post(chat_duo_create_url, chat_duo)
            response = api_client.post(chat_duo_create_url, chat_duo)

            assert response.status_code == 403


        def test_creating_chat_duos_with_different_members_are_allowed(self, api_client):
            user = UserFactory()
            user2 = UserFactory()
            user3 = UserFactory()
            api_client.force_authenticate(user)

            chat_duo = {
                'members': [user.id, user2.id]
            }
            api_client.post(chat_duo_create_url, chat_duo)

            chat_duo = {
                'members': [user.id, user3.id]
            }
            response = api_client.post(chat_duo_create_url, chat_duo)

            assert response.status_code == 201

    class TestGuest:
        def test_page_should_not_render(self, api_client):
            response = api_client.get(chat_duo_create_url)

            assert response.status_code == 401
        
                    
        def test_post_request_not_allowed(self, api_client):
            user = UserFactory()
            user2 = UserFactory()

            chat_duo = {
                'members': [user.id, user2.id]
            }

            response = api_client.post(chat_duo_create_url, chat_duo)

            assert response.status_code == 401

