from django.urls.base import reverse
import psycopg2
from factories import RecipeFactory
import pytest
from django.conf import settings
from django.db import connections
from rest_framework.test import APIClient

from factories import ChatGroupFactory, ChatMassageFactory, UserFactory

create_ingredient_url = reverse('ingredients:create')
logout_url = '/api/djoser/token/login/'

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
    logout = api_client.post(logout_url)


    return logout

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

@pytest.fixture
def create_ingredient(api_client ,signup_and_login):
    recipe_data = RecipeFactory()
    api_client.force_authenticate(recipe_data.author)
    text = ['1','2','5']
    data = {
        'recipe': recipe_data.id,
        'text': text
    }
    api_client.post(create_ingredient_url, data)
    api_client.post(logout_url)
    

# enable testing for postgres db
@pytest.fixture(scope='session')
def django_db_setup():
    settings.DATABASES['default'] 
