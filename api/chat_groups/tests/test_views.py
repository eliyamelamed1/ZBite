from django.urls.base import reverse
from chat_groups.models import ChatGroup
from factories import ChatMassageFactory, ChatGroupFactory
import pytest
from factories import UserFactory


pytestmark = pytest.mark.django_db

chat_group_create_url = ChatGroup.get_create_url()
chat_groups_list = reverse('chat_groups:list')

class TestChatGroupList:
    class TestAuthenticatedMembersUsers:
        def test_chat_group_list_page_should_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(chat_groups_list)

            assert response.status_code == 200
            
        def test_chat_groups_should_be_loaded(self, api_client):
            first_participating_user = UserFactory()
            second_participating_user = UserFactory()
            new_chat_group = ChatGroupFactory.create(members=(first_participating_user, second_participating_user))

            api_client.force_authenticate(first_participating_user)

            response = api_client.get(chat_groups_list)

            assert f'{new_chat_group}' in f'{response.content}'

    class TestAuthenticatedNonMembersUsers:
        def test_chat_group_list_page_should_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(chat_groups_list)

            assert response.status_code == 200

        def test_chat_group_list_should_not_loaded(self, api_client):
            first_participating_user = UserFactory()
            second_participating_user = UserFactory()
            new_chat_group = ChatGroupFactory.create(members=(first_participating_user, second_participating_user))

            not_participating_user = UserFactory()
            api_client.force_authenticate(not_participating_user)

            response = api_client.get(chat_groups_list)

            assert f'{new_chat_group}' not in f'{response.content}'


    class TestGuestUsers:
        def test_chat_group_list_page_should_not_render(self, api_client):
            response = api_client.get(chat_groups_list)

            assert response.status_code == 401


class TestChatGroupCreate:
    class TestAuthenticatedUser:
        def test_chat_group_create_page_should_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(chat_group_create_url)

            assert response.status_code == 405

        def test_create_chat_group_post_request(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            new_chat_group = ChatGroupFactory.build()

            new_chat_group = {
                'title': new_chat_group.title,
                'members': [new_user.id, new_user2.id]
            }

            response = api_client.post(chat_group_create_url, new_chat_group)

            assert response.status_code == 201


        def test_logged_in_user_should_be_automatically_set_as_the_author_of_the_created_chat_group(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            new_chat_group = ChatGroupFactory.build()
            new_chat_group = {
                'author': new_user2,
                'title': new_chat_group.title,
                'members': [new_user2.id]
            }

            api_client.post(chat_group_create_url, new_chat_group)
            
            new_chat_group = ChatGroup.objects.get(title=new_chat_group['title'])
            
            assert new_chat_group.author == new_user
            assert new_chat_group.members.all().count() == 2
        
        def test_author_is_automaticaly_added_to_the_created_chat_group_members(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)

            new_chat_group = ChatGroupFactory.build()
            new_chat_group = {
                'title': new_chat_group.title,
                'members': [new_user2.id]
            }

            api_client.post(chat_group_create_url, new_chat_group)
            
            new_chat_group = ChatGroup.objects.get(title=new_chat_group['title'])
            
            assert new_user and new_user2 in new_chat_group.members.all()
        
        class TestGuestUsers:
            def test_chat_group_create_page_should_not_render(self, api_client):
                response = api_client.get(chat_group_create_url)

                assert response.status_code == 401
            
            def test_chat_group_create_post_request_not_allowed(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_chat_group = ChatGroupFactory.build()

                new_chat_group = {
                    'title': new_chat_group.title,
                    'members': [new_user.id, new_user2.id]
                }

                response = api_client.post(chat_group_create_url, new_chat_group)

                assert response.status_code == 401

class TestChatGroupUpdatemembers:
    class TestAuthenticatedUsers:
        def test_update_members_page_should_render(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)

            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

            chat_group_update_members_url = new_chat_group.get_update_members_url()
            response = api_client.get(chat_group_update_members_url)

            assert response.status_code == 405
    

        def test_author_should_be_able_to_update_group_members(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))
                api_client.force_authenticate(new_chat_group.author)

                updated_data = {
                    'members': [new_user.id, ]
                }
                chat_group_update_members_url = new_chat_group.get_update_members_url()
                response = api_client.patch(chat_group_update_members_url, updated_data)

                assert response.status_code == 200
                assert new_chat_group.members.all().count() == 1
                assert new_chat_group.members.all()[0] == new_user

        def test_not_author_should_not_be_able_to_update_group_members(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                api_client.force_authenticate(new_user)

                new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

                api_client.force_authenticate(new_user)
                updated_data = {
                    'members': [new_user.id,]
                }

                chat_group_update_members_url = new_chat_group.get_update_members_url()
                response = api_client.patch(chat_group_update_members_url, updated_data)

                assert response.status_code == 403
        
    class TestGuestUsers:
        def test_update_members_page_should_not_render(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

            chat_group_update_members_url = reverse('chat_groups:update_members', kwargs={"pk": new_chat_group.id})
            response = api_client.get(chat_group_update_members_url)

            assert response.status_code == 401
        
        def test_guest_should_not_be_able_to_update_group_members(self, api_client):
                new_user = UserFactory()
                new_user2 = UserFactory()
                new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

                updated_data = {
                    'members': [new_user.id,]
                }

                chat_group_update_members_url = new_chat_group.get_update_members_url()
                response = api_client.patch(chat_group_update_members_url, updated_data)

                assert response.status_code == 401

class TestChatGroupUpdateTitle:

    class TestAuthenticatedMembersUsers:
        def test_update_title_page_should_render(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

            chat_group_update_title_url = new_chat_group.get_update_title_url()
            response = api_client.get(chat_group_update_title_url)

            assert response.status_code == 405
            
        def test_update_title_page_patch_request_allowed(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

            updated_data = {
                'title': 'asdasd'
            }
            chat_group_update_title_url = new_chat_group.get_update_title_url()
            response = api_client.patch(chat_group_update_title_url, updated_data)

            assert response.status_code == 200
    class TestAuthenticatedUsers:

        def test_update_title_page_should_not_render(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_user3 = UserFactory()
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))
            api_client.force_authenticate(new_user3)

            chat_group_update_title_url = new_chat_group.get_update_title_url()
            response = api_client.get(chat_group_update_title_url)

            assert response.status_code == 405

        def test_update_title_page_patch_request_not_allowed(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_user3 = UserFactory()
            api_client.force_authenticate(new_user3)
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

            updated_data = {
                'title': 'asdasd'
            }
            chat_group_update_title_url = new_chat_group.get_update_title_url()
            response = api_client.patch(chat_group_update_title_url, updated_data)

            assert response.status_code == 403

    class TestGuestUsers:
        def test_update_title_page_should_not_render(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))

            chat_group_update_title_url = new_chat_group.get_update_title_url()
            response = api_client.get(chat_group_update_title_url)

            assert response.status_code == 401
        
        def test_update_title_page_patch_request_not_allowed(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            new_chat_group = ChatGroupFactory.create(members=(new_user, new_user2))
            
            updated_data = {
                'title': 'asdasd'
            }
            chat_group_update_title_url = new_chat_group.get_update_title_url()
            response = api_client.patch(chat_group_update_title_url, updated_data)

            assert response.status_code == 401


