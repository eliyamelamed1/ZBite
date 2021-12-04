import pytest
from django.urls import reverse

from apps.posts.recipes.models import Recipe

pytestmark = pytest.mark.django_db

def test__str__(create_ingredient):
    new_ingredient = create_ingredient

    assert new_ingredient.__str__() == str(new_ingredient.text_list)

def test_get_absolute_url(create_ingredient):
    new_ingredient = create_ingredient
    
    assert new_ingredient.get_absolute_url() == reverse('ingredients:detail', kwargs={"pk": new_ingredient.id})
