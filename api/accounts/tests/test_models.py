import pytest
from django.urls import reverse

from accounts.models import UserAccount
from factories import RecipeFactory, UserFactory
from recipes.models import Recipe

pytestmark = pytest.mark.django_db

def test__str__():
    new_user = UserFactory()

    assert new_user.__str__() == new_user.email

def test_get_absolute_url():
    new_user = UserFactory()

    assert new_user.get_absolute_url() == f'/api/accounts/{new_user.id}/'

def test_get_top_rated_accounts_url():
    assert UserAccount.get_top_rated_accounts_url() == reverse('accounts:top')

def test_get_saved_recipes_url():
    assert UserAccount.get_saved_recipes_url() == reverse('accounts:saved_recipes')