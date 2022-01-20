import pytest
from django.urls import reverse

import conftest
from apps.users.accounts.models import UserAccount
from factories import UserFactory, RecipeFactory

top_rated_accounts_url = UserAccount.get_top_rated_accounts_url()
saved_recipes_url = UserAccount.get_saved_recipes_url()

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
                new_user.score = 5
                new_user.save()

            for i in range(10):
                new_user = UserFactory() 
                new_user.score = 4
                new_user.save()
            
            top_rated_chefs = UserAccount.objects.all().filter(score=5)
            bottom_rated_chefs = UserAccount.objects.all().filter(score=4)
            
            api_client.force_authenticate(new_user)
            response = api_client.get(top_rated_accounts_url)

            for chef in top_rated_chefs:
                assert f'{chef}' in f'{response.content}'
                
            for chef in bottom_rated_chefs:
                assert f'{chef}' not in f'{response.content}'

    class TestGuestUsers:
        
        def test_top_chefs_feed_page_return_status_code_200(self, api_client):
            response = api_client.get(top_rated_accounts_url) 
            for i in range(10):
                new_user = UserFactory() 
                new_user.score = 5
                new_user.save()

            for i in range(10):
                new_user = UserFactory() 
                new_user.score = 4
                new_user.save()
            
            top_rated_chefs = UserAccount.objects.all().filter(score=5)
            bottom_rated_chefs = UserAccount.objects.all().filter(score=4)
            
            api_client.force_authenticate(new_user)
            response = api_client.get(top_rated_accounts_url)

            for chef in top_rated_chefs:
                assert f'{chef}' in f'{response.content}'
                
            for chef in bottom_rated_chefs:
                assert f'{chef}' not in f'{response.content}'

            assert response.status_code == 200
        
        def test_top_chefs_page_should_display_top_rated_chefs(self, api_client):
            for i in range(10):
                new_user = UserFactory() 
                new_user.score = 5
                new_user.save()

            for i in range(10):
                new_user = UserFactory() 
                new_user.score = 4
                new_user.save()
            
            top_rated_chefs = UserAccount.objects.all().filter(score=5)
            bottom_rated_chefs = UserAccount.objects.all().filter(score=4)

            response = api_client.get(top_rated_accounts_url)

            for chef in top_rated_chefs:
                assert f'{chef}' in f'{response.content}'
                
            for chef in bottom_rated_chefs:
                assert f'{chef}' not in f'{response.content}'

class TestUserSavedRecipes:
    class TestAuthenticatedUsers:
        def test_saved_recipes_page_should_render_successfully(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(saved_recipes_url)
    
            assert response.status_code == 200

        def test_page_should_display_saved_recipes(self, api_client):
            new_user = UserFactory() 
            api_client.force_authenticate(new_user)
            
            for i in range(5):
                new_recipe = RecipeFactory()
                new_user.saved_recipes.add(new_recipe) 
                new_user.save()
            
            saved_recipes_queryset = UserAccount.objects.all().get(id=new_user.id).saved_recipes.all() 
            response = api_client.get(saved_recipes_url)

            for recipe in saved_recipes_queryset:
                assert f'{recipe}' in f'{response.content}'

    class TestGuestUsers:
        def test_saved_recipes_page_should_not_render(self, api_client):
            response = api_client.get(saved_recipes_url)
    
            assert response.status_code == 401



class TestOwnRecipesList:
    class TestAuthenticatedUsers:
        def test_get_request_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            user_own_recipes = new_user.get_own_recipes_url()
            response = api_client.get(user_own_recipes) 

            assert response.status_code == 200

        def test_should_return_user_own_recipes(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            
            other_recipe = RecipeFactory()
            new_recipe = RecipeFactory()
            new_user = UserAccount.objects.get(id=new_recipe.author.id)
              
            response = api_client.get(new_user.get_own_recipes_url()) 

            
            assert f'{new_recipe.id}' in f'{response.content}'
            assert f'{new_recipe.title}' in f'{response.content}'
            assert f'{new_recipe.description}' in f'{response.content}'

            
            assert f'{other_recipe.id}' not in f'{response.content}'
            assert f'{other_recipe.title}' not in f'{response.content}'
            assert f'{other_recipe.description}' not in f'{response.content}'

            
    class TestGuestUsers:
        def test_get_request_return_status_code_200(self, api_client):
            new_user = UserFactory()
            response = api_client.get(new_user.get_own_recipes_url()) 

            assert response.status_code == 200

        def test_should_return_user_own_recipes(self, api_client):
            other_recipe = RecipeFactory()
            new_recipe = RecipeFactory()
            new_user = UserAccount.objects.get(id=new_recipe.author.id)
              
            response = api_client.get(new_user.get_own_recipes_url()) 

            
            assert f'{new_recipe.id}' in f'{response.content}'
            assert f'{new_recipe.title}' in f'{response.content}'
            assert f'{new_recipe.description}' in f'{response.content}'

            
            assert f'{other_recipe.id}' not in f'{response.content}'
            assert f'{other_recipe.title}' not in f'{response.content}'
            assert f'{other_recipe.description}' not in f'{response.content}'

            
class TestSearchUsers:
    class TestAuthenticatedUsers:
        def test_searching_without_value_should_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(UserAccount.get_search_url(None)) 

            assert response.status_code == 200

        def test_searching_with_value_should_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(UserAccount.get_search_url(new_user.name)) 

            assert response.status_code == 200

        # def test_searching_user_name_should_display_it(self, api_client):
        #     first_user = UserFactory()
        #     api_client.force_authenticate(first_user)
        #     second_user = UserFactory()
        #     response = api_client.get(UserAccount.get_search_url(first_user.name))

        #     assert f'{first_user.name}' in f'{response.content}'
        #     assert f'{second_user.name}' not in f'{response.content}'

    class TestGuestUsers:
        def test_searching_without_value_should_return_status_code_200(self, api_client):
            response = api_client.get(UserAccount.get_search_url(None)) 

            assert response.status_code == 200
        
        def test_searching_with_value_should_return_status_code_200(self, api_client):
            new_user = UserFactory()
            response = api_client.get(UserAccount.get_search_url(new_user.name)) 

            assert response.status_code == 200

        # def test_searching_user_name_should_display_it(self, api_client):
        #     first_user = UserFactory()
        #     second_user = UserFactory()
        #     response = api_client.get(UserAccount.get_search_url(first_user.name))

        #     assert f'{first_user.name}' in f'{response.content}'
        #     assert f'{second_user.name}' not in f'{response.content}'
