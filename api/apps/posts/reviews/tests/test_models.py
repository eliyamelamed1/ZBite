import pytest
from django.urls import reverse

from factories import RecipeFactory, ReviewFactory, UserFactory
from apps.posts.recipes.models import Recipe
from apps.posts.reviews.models import Review

pytestmark = pytest.mark.django_db
review_create_url = Review.get_create_url()

def test__str__():
    new_review = ReviewFactory()

    assert new_review.__str__() == str(new_review.author)

def test_get_delete_url():
    new_review = ReviewFactory()
    
    assert new_review.get_delete_url() == reverse('reviews:delete', kwargs={"pk": new_review.id})


def test_get_create_url():
    assert Review.get_create_url() == reverse('reviews:create')

def test_get_reviews_in_recipe_url():
    assert Review.get_reviews_in_recipe_url() == reverse('reviews:reviews_in_recipe')




def test_get_recipe_avg_review_score(api_client):
    new_recipe = RecipeFactory()
    api_client.force_authenticate(new_recipe.author)
    new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
    data = {
        'recipe': new_recipe.id,
        'stars': 5
    }
    api_client.post(review_create_url, data)
    api_client.logout()

    new_user = UserFactory()
    api_client.force_authenticate(new_user)    
    data = {
        'recipe': new_recipe.id,
        'stars': 1
    }
    api_client.post(review_create_url, data)

    recipe_avg_stars = Review.get_recipe_stars_score(recipe=new_recipe)

    assert recipe_avg_stars == 3.0

def test_get_account_stars_score(api_client):
    user = UserFactory()
    api_client.force_authenticate(user)

    first_recipe = RecipeFactory.build()
    create_recipe_url = reverse('recipes:create')
    data = {
        'title': {first_recipe.title},
        'description': {first_recipe.description},
        'serving': 'four people',
        'cook_time': '2 hours',
        'ingredients_text_list': '',
        'instructions_text_list': '',
    }
    api_client.post(create_recipe_url, data)  

    second_recipe = RecipeFactory.build()
    data = {
        'title': {second_recipe.title},
        'description': {second_recipe.description},
        'serving': 'four people',
        'cook_time': '2 hours',
        'ingredients_text_list': '',
        'instructions_text_list': '',
    }
    api_client.post(create_recipe_url, data)  

    first_recipe = Recipe.objects.all().get(title__exact=first_recipe.title)
    data = {
        'recipe': first_recipe.id,
        'stars': 5
    }
    api_client.post(review_create_url, data)  
    second_recipe = Recipe.objects.all().get(title__exact=second_recipe.title)
    data = {
        'recipe': second_recipe.id,
        'stars': 0
    }
    api_client.post(review_create_url, data)  

    second_user = UserFactory()
    api_client.force_authenticate(second_user)

    data = {
        'recipe': first_recipe.id,
        'stars': 1
    }
    api_client.post(review_create_url, data)  
    data = {
        'recipe': second_recipe.id,
        'stars': 3
    }
    api_client.post(review_create_url, data)  

    account_avg_stars = Review.get_account_stars_score(user=user)

    assert account_avg_stars == 2.25