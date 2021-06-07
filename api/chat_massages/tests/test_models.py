import pytest
from django.urls import reverse

from chat_massages.models import ChatMassage

pytestmark = pytest.mark.django_db

def test__str__(chat_massage_create):
    chat_massage = chat_massage_create

    assert chat_massage.__str__() == chat_massage.text

def test_get_absolute_url(chat_massage_create):
    chat_massage = chat_massage_create
    details_url = reverse('chat_massages:details', kwargs={"pk": chat_massage.id})

    assert chat_massage.get_absolute_url() == details_url

def test_get_create_url():
    create_chat_massage_url = reverse('chat_massages:create')

    assert ChatMassage.get_create_url() == create_chat_massage_url

def test_get_massages_in_room_url():
    massages_in_room_url = reverse('chat_massages:massages_in_room')

    assert ChatMassage.get_massages_in_room_url() == massages_in_room_url
