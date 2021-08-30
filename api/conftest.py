import pytest
from django.http import HttpResponse
from django.urls.base import reverse
from rest_framework.test import APIClient

from accounts.models import UserAccount
from factories import (ChatDuoFactory, ChatGroupFactory, ChatMassageFactory, RecipeFactory, UserFactory)
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
    login_url = '/api/djoser/token/login/'
    credentials = {
        "email": signup.credentials['email'],
        "password": signup.credentials['password']
    }
    user_logged_in = api_client.post(login_url, credentials)
    user = LoginResponseOrCredentials(response=user_logged_in, credentials=credentials)

    return user

@pytest.fixture
def logout(api_client):
    logout_url = '/api/djoser/token/login/'
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

# @pytest.fixture
# def search_comment_response(api_client):
#     new_recipe = RecipeFactory()
#     comments_in_recipe_url = '/api/comments/comments_in_recipe/'

#     data = {
#         'recipe': {new_recipe.id},
#     }

#     response = api_client.post(comments_in_recipe_url, data)

#     return response

@pytest.fixture
def chat_massage_create():
    user = UserFactory()
    user2 = UserFactory()
    chat_room = ChatGroupFactory.create(members=(user, user2))
    chat_massage = ChatMassageFactory()
    chat_room.members.add(chat_room.author)
    chat_room.members.add(chat_massage.author)
    chat_massage.room = chat_room
    chat_room.save()
    chat_massage.save()

    return chat_massage

