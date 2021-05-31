import pytest
from django.urls import reverse

from factories import RatingFactory, RecipeFactory, UserFactory
from ratings.models import Rating
from recipes.models import Recipe

pytestmark = pytest.mark.django_db
rating_create_url = Rating.get_create_url()

def test__str__():
    new_rating = RatingFactory()

    assert new_rating.__str__() == str(new_rating.author)

def test_get_delete_url():
    new_rating = RatingFactory()
    
    assert new_rating.get_delete_url() == reverse('ratings:delete', kwargs={"pk": new_rating.id})


def test_get_create_url():
    assert Rating.get_create_url() == reverse('ratings:create')

def test_get_search_url():
    assert Rating.get_search_url() == reverse('ratings:search')




def test_get_recipe_avg_rating_score(api_client):
    new_recipe = RecipeFactory()
    api_client.force_authenticate(new_recipe.author)
    new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
    data = {
        'recipe': new_recipe.id,
        'stars': 5
    }
    api_client.post(rating_create_url, data)
    api_client.logout()

    new_user = UserFactory()
    api_client.force_authenticate(new_user)    
    data = {
        'recipe': new_recipe.id,
        'stars': 1
    }
    api_client.post(rating_create_url, data)

    recipe_avg_stars = Rating.get_recipe_stars_score(recipe=new_recipe)

    assert recipe_avg_stars == 3.0

def test_get_account_stars_score(api_client):
    user = UserFactory()
    api_client.force_authenticate(user)

    first_recipe = RecipeFactory.build()
    create_recipe_url = reverse('recipes:create')
    data = {
        'title': {first_recipe.title},
        'description': {first_recipe.description},
        'flavor_type': {first_recipe.flavor_type}, 
    }
    api_client.post(create_recipe_url, data)  

    second_recipe = RecipeFactory.build()
    data = {
        'title': {second_recipe.title},
        'description': {second_recipe.description},
        'flavor_type': {second_recipe.flavor_type}, 
    }
    api_client.post(create_recipe_url, data)  

    first_recipe = Recipe.objects.all().get(title__exact=first_recipe.title)
    data = {
        'recipe': first_recipe.id,
        'stars': 5
    }
    api_client.post(rating_create_url, data)  
    second_recipe = Recipe.objects.all().get(title__exact=second_recipe.title)
    data = {
        'recipe': second_recipe.id,
        'stars': 0
    }
    api_client.post(rating_create_url, data)  

    second_user = UserFactory()
    api_client.force_authenticate(second_user)

    data = {
        'recipe': first_recipe.id,
        'stars': 1
    }
    api_client.post(rating_create_url, data)  
    data = {
        'recipe': second_recipe.id,
        'stars': 3
    }
    api_client.post(rating_create_url, data)  

    account_avg_stars = Rating.get_account_stars_score(user=user)

    assert account_avg_stars == 2.25