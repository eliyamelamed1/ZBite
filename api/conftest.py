from django.urls.base import reverse
import pytest
from django.http import HttpResponse
from rest_framework.test import APIClient

from accounts.models import UserAccount
from factories import CommentFactory, RecipeFactory, UserFactory, ChatGroupFactory, ChatMassageFactory
from recipes.models import Recipe

# ---------------------------------------- Set Up
@pytest.fixture
def api_client():
   return APIClient()

# ---------------------------------------- Authentication

class SignupResponseOrCredentials:
    def __init__(self, response, credentials: dict):
        self.response = response
        self.credentials = credentials

class LoginResponseOrCredentials:
    def __init__(self, response, credentials: dict):
        self.response = response
        self.credentials = credentials


@pytest.fixture
def signup(api_client):
    user_data = UserFactory.build()
    credentials = {
        'email': user_data.email,
        'name': user_data.name,
        'password': user_data.password ,
        're_password': user_data.password 
    }
    signup_url = "/api/djoser/users/"
    user_created = api_client.post(signup_url, credentials)
    user = SignupResponseOrCredentials(response=user_created, credentials=credentials)
    return user

@pytest.fixture
def signup_and_login(api_client, signup):
    login_url = "/api/users/login/"
    credentials = {
        "email": signup.credentials['email'],
        "password": signup.credentials['password']
    }
    user_logged_in = api_client.post(login_url, credentials)
    user = LoginResponseOrCredentials(response=user_logged_in, credentials=credentials)

    return user

@pytest.fixture
def logout(api_client):
    logout_url = "/api/users/logout/"
    logout = api_client.post(logout_url)


    return logout

# ---------------------------------------- Recipes

# TODO check for better fixture name
@pytest.fixture
def search_recipe_response(api_client):
    search_recipe_url = '/api/recipes/search/'
    data = {
        'flavor_type': 'Sour',
    }

    response = api_client.post(search_recipe_url, data)

    return response

@pytest.fixture
def search_comment_response(api_client):
    new_recipe = RecipeFactory()
    search_comment_url = '/api/comments/search/'

    data = {
        'recipe': {new_recipe.id},
    }

    response = api_client.post(search_comment_url, data)

    return response

@pytest.fixture
def chat_massage_create():
    user = UserFactory()
    user2 = UserFactory()
    chat_group = ChatGroupFactory.create(members=(user, user2))
    chat_massage = ChatMassageFactory()
    chat_group.members.add(chat_group.author)
    chat_group.members.add(chat_massage.author)
    chat_massage.group = chat_group
    chat_group.save()
    chat_massage.save()
    chat_massage.group = chat_group

    return chat_massage