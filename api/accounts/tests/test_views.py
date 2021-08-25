import pytest
from django.urls import reverse

import conftest
from accounts.models import UserAccount
from factories import UserFactory

top_rated_accounts_url = UserAccount.get_top_rated_accounts_url()

# ------------------------------------------------ Tests
pytestmark = pytest.mark.django_db

def test_signup_success(signup):
    assert signup.response.status_code == 201

def test_login_fail_without_signup(api_client):
    user_data = UserFactory.build()
    login_url = '/api/djoser/token/login/'
    user_data = {
        'email': user_data.email,
        'password': user_data.password,
    }
    response = api_client.post(login_url, user_data)

    assert response.status_code == 400

def test_login_success(signup_and_login):
    assert signup_and_login.response.status_code == 200


class TestUserDetailsView:
    class TestAuthenticatedUsers:
        def test_user_detail_page_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(new_user.get_absolute_url())

            assert response.status_code == 200
    
    class TestGuestUsers:
        def test_user_detail_page_render(self, api_client):
            new_user = UserFactory()
            response = api_client.get(new_user.get_absolute_url())

            assert response.status_code == 200

class TestUserDeleteView:
    class TestAuthenticatedUsers:
        def test_account_author_can_delete_his_account(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.delete(new_user.get_absolute_url())

            assert response.status_code == 204

        def test_user1_cant_delete_user2_account(self, api_client):
            new_user = UserFactory()
            new_user2 = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.delete(new_user2.get_absolute_url())
            
            assert response.status_code == 403

    class TestGuestUsers:
        def test_guest_cant_delete_others_accounts(self, api_client):
            new_user = UserFactory()
            response = api_client.delete(new_user.get_absolute_url())

            assert response.status_code == 401

            
class TestUserUpdateView:
    class TestAuthenticatedUsers:
        def test_account_author_can_update_his_account(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            data = {
                'email': 'test@gmail.com',
                'name': 'test'
            } 
            response = api_client.patch(new_user.get_absolute_url(), data)

            assert response.status_code == 200

        def test_user_cant_update_others_accounts(self, api_client):
            new_user = UserFactory() 
            new_user2 = UserFactory() 
            api_client.force_authenticate(new_user2)
            data = {
                'email': 'test@gmail.com',
                'name': 'test'
            } 
            response = api_client.patch(new_user.get_absolute_url(), data)

            assert response.status_code == 403

    class TestGuestUsers:
        def test_guest_cant_update_othes_accounts(self, api_client):
            new_user = UserFactory()
            data = {
                'email': 'test@gmail.com',
                'name': 'test'
            } 
            response = api_client.patch(new_user.get_absolute_url(), data)

            assert response.status_code == 401


class TestUserListView:
    class TestAuthenticatedUsers:
        def test_user_list_page_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            
            response = api_client.get(reverse('accounts:list'))

            assert response.status_code == 200

    class TestGuestUsers:
        def test_user_list_page_render(self, api_client):
            response = api_client.get(reverse('accounts:list'))

            assert response.status_code == 200

class TestLoggedUserDetailView:
    class TestAuthenticatedUsers:
        def test_user_list_page_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            
            response = api_client.get(reverse('accounts:logged_user'))

            assert response.status_code == 200

    class TestGuestUsers:
        def test_user_list_page_render(self, api_client):
            response = api_client.get(reverse('accounts:logged_user'))

            assert response.status_code == 401



class TestTopRatedAccounts:
    class TestAuthenticatedUsers:
        def test_top_chefs_feed_page_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(top_rated_accounts_url) 

            assert response.status_code == 200
        
        def test_page_should_return_top_rated_accounts(self, api_client):
            for i in range(10):
                new_user = UserFactory() 
                new_user.stars = 5
                new_user.save()

            for i in range(10):
                new_user = UserFactory() 
                new_user.stars = 4
                new_user.save()
            
            top_rated_chefs = UserAccount.objects.all().filter(stars=5)
            bottom_rated_chefs = UserAccount.objects.all().filter(stars=4)
            
            api_client.force_authenticate(new_user)
            response = api_client.get(top_rated_accounts_url)

            for chef in top_rated_chefs:
                assert f'{chef}' in f'{response.content}'
                
            for chef in bottom_rated_chefs:
                assert f'{chef}' not in f'{response.content}'

    class TestGuestUsers:
        
        def test_top_chefs_feed_page_return_status_code_200(self, api_client):
            response = api_client.get(top_rated_accounts_url) 

            assert response.status_code == 200
        
        def test_top_chefs_page_should_display_top_rated_chefs(self, api_client):
            for i in range(10):
                new_user = UserFactory() 
                new_user.stars = 5
                new_user.save()

            for i in range(10):
                new_user = UserFactory() 
                new_user.stars = 4
                new_user.save()
            
            top_rated_chefs = UserAccount.objects.all().filter(stars=5)
            bottom_rated_chefs = UserAccount.objects.all().filter(stars=4)

            response = api_client.get(top_rated_accounts_url)

            for chef in top_rated_chefs:
                assert f'{chef}' in f'{response.content}'
                
            for chef in bottom_rated_chefs:
                assert f'{chef}' not in f'{response.content}'

