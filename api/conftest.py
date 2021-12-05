import io
import psycopg2
import pytest
from django.conf import settings
from django.db import connections
from django.urls.base import reverse
from rest_framework.test import APIClient

from apps.posts.ingredients.models import Ingredient
from apps.posts.instructions.models import Instruction
from factories import (ChatGroupFactory, ChatMassageFactory, RecipeFactory,
                       UserFactory)

create_ingredient_url = reverse('ingredients:create')
create_instruction_url = reverse('instructions:create')
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
    api_client.logout()

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
def create_ingredient(api_client):
    recipe_data = RecipeFactory()
    api_client.force_authenticate(recipe_data.author)
    text_list = [f'{recipe_data.title}']
    data = {
        'recipe': recipe_data.id,
        'text_list': text_list
    }
    api_client.post(create_ingredient_url, data)
    
    return Ingredient.objects.get(recipe=recipe_data.id)

@pytest.fixture
def create_instruction(api_client):
    recipe_data = RecipeFactory()
    api_client.force_authenticate(recipe_data.author)
    text_list = [f'{recipe_data.title}',]
    image_list = [f'{recipe_data.description}',]
    data = {
        'recipe': recipe_data.id,
        'text_list': text_list,
        'image_list': image_list
    }
    api_client.post(create_instruction_url, data)
    new_instruction = Instruction.objects.get(recipe=recipe_data.id)
    api_client.logout()

    return new_instruction

# enable testing for postgres db
@pytest.fixture(scope='session')
def django_db_setup():
    settings.DATABASES['default'] 
