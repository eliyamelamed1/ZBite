# TODO add tests for MIN and MAX values of stars 
# TODO test perform_create

import pytest
from django.urls import reverse

from accounts.models import UserAccount
from factories import RatingFactory, RecipeFactory, UserFactory
from ratings.models import Rating
from recipes.models import Recipe

pytestmark = pytest.mark.django_db

rating_rate_url = Rating.get_create_url()
rating_search_url = Rating.get_search_url()
create_recipe_url = Recipe.get_create_url()
class TestRatingCreateView:
    class TestAuthenticatedUsers:
        def test_rating_page_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(rating_rate_url) 

            assert response.status_code == 405
        
        def test_rate_post_request(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            response = api_client.post(rating_rate_url, data)

            assert response.status_code == 200

        def test_user_second_rate_will_update_the_first_one(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            
            api_client.post(rating_rate_url, data)
            data = {
                'recipe': new_recipe.id,
                'stars': 4
            }
            response = api_client.post(rating_rate_url, data)

            rating = Rating.objects.all().get(author__exact=new_user.id)

            assert response.status_code == 200
            assert rating.stars == 4
            assert Rating.objects.all().count() == 1  

        def test_ratings_from_different_users(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()

            data = {
                'recipe': new_recipe.id,
                'stars': '5'
            }
            api_client.post(rating_rate_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id,
                'stars': '4'
            }
            api_client.post(rating_rate_url, data)

            first_rating = Rating.objects.all().get(author__exact=new_user.id)
            second_rating = Rating.objects.all().get(author__exact=new_user2.id)


            assert Rating.objects.all().count() == 2
            assert first_rating.stars == 5
            assert second_rating.stars== 4
        
        def test_multiple_ratings_from_different_users(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            new_recipe = RecipeFactory()
            
            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            api_client.post(rating_rate_url, data)
            data = {
                'recipe': new_recipe.id,
                'stars': 3
            }
            api_client.post(rating_rate_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id,
                'stars': 4
            }
            api_client.post(rating_rate_url, data)

            data = {
                'recipe': new_recipe.id,
                'stars': 2
            }
            api_client.post(rating_rate_url, data)

            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            api_client.post(rating_rate_url, data)
            api_client.logout()


            first_rating = Rating.objects.all().get(author__exact=new_user.id)
            second_rating = Rating.objects.all().get(author__exact=new_user2.id)


            assert Rating.objects.all().count() == 2
            assert first_rating.stars == 3
            assert second_rating.stars == 5


        def test_rating_recipe_calculate_recipe_stars(self, api_client):
            recipe = RecipeFactory()
            first_user = UserFactory()
            api_client.force_authenticate(first_user)

            data = {
                'recipe': recipe.id,
                'stars': 4
            }
            api_client.post(rating_rate_url, data)
            api_client.logout()

            second_user = UserFactory()
            api_client.force_authenticate(second_user)
            data = {
                'recipe': recipe.id,
                'stars': 2
            }
            api_client.post(rating_rate_url, data)
            recipe = Recipe.objects.all().get(id=recipe.id)

            assert recipe.stars == '3.0'
            assert recipe.stars == str(Rating.get_recipe_stars_score(recipe=recipe))


        def test_rating_recipe_calculate_account_stars(self, api_client):
            first_recipe = RecipeFactory()
            recipe_author = first_recipe.author
            api_client.force_authenticate(recipe_author)

            second_recipe = RecipeFactory.build()
            data = {
                'title': {second_recipe.title},
                'description': {second_recipe.description},
                'flavor_type': {second_recipe.flavor_type}, 
            }
            api_client.post(create_recipe_url, data)
            second_recipe = Recipe.objects.all().get(title=second_recipe.title)

            data = {
                'recipe': first_recipe.id,
                'stars': 5
            }

            api_client.post(rating_rate_url, data)
            
            data = {
                'recipe': second_recipe.id,
                'stars': 0
            }
            api_client.post(rating_rate_url, data)
            api_client.logout()


            second_user = UserFactory()
            api_client.force_authenticate(second_user)
            data = {
                'recipe': first_recipe.id,
                'stars': 5
            }
            api_client.post(rating_rate_url, data)

            data = {
                'recipe': second_recipe.id,
                'stars': 5
            }
            api_client.post(rating_rate_url, data)
            api_client.logout()


            first_recipe = Recipe.objects.all().get(title=first_recipe.title)
            second_recipe = Recipe.objects.all().get(title=second_recipe.title)
            user = UserAccount.objects.all().get(id=recipe_author.id)

            assert first_recipe.stars == '5.0'
            assert second_recipe.stars == '2.5'
            assert Rating.get_account_stars_score(user=user) == 3.75
            assert user.stars == '3.75'


        def test_ratings_on_recipe_from_non_recipe_author_should_still_calculate_recipe_author_avg_score(self, api_client):
            first_recipe = RecipeFactory()
            recipe_author = first_recipe.author
            api_client.force_authenticate(recipe_author)

            second_recipe = RecipeFactory.build()
            data = {
                'title': {second_recipe.title},
                'description': {second_recipe.description},
                'flavor_type': {second_recipe.flavor_type}, 
            }
            api_client.post(create_recipe_url, data)

            
            second_recipe = Recipe.objects.all().get(title=second_recipe.title)
            second_user = UserFactory()
            api_client.force_authenticate(second_user)

            data = {
                'recipe': first_recipe.id,
                'stars': 5
            }
            api_client.post(rating_rate_url, data)

            data = {
                'recipe': second_recipe.id,
                'stars': 0
            }
            api_client.post(rating_rate_url, data)

            first_recipe = Recipe.objects.all().get(title=first_recipe.title)
            second_recipe = Recipe.objects.all().get(title=second_recipe.title)
            user = UserAccount.objects.all().get(id=recipe_author.id)

            assert first_recipe.stars == '5.0'
            assert second_recipe.stars == '0.0'
            assert Rating.get_account_stars_score(user=user) == 2.5
            assert user.stars == '2.5'

    class TestGuestUsers:
        def test_rating_page_should_not_rende(self, api_client):
            
            response = api_client.get(rating_rate_url) 

            assert response.status_code == 401

        def test_rate_post_request_should_fail(self, api_client):
            new_recipe = RecipeFactory()

            
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            response = api_client.post(rating_rate_url, data)

            assert response.status_code == 401


class TestRatingDeleteView:
    class TestAuthenticatedUsers:
        def test_delete_page_should_render(self, api_client):
            new_rating = RatingFactory()
            api_client.force_authenticate(new_rating.author)

            delete_url = new_rating.get_delete_url()
            response = api_client.get(delete_url)

            assert response.status_code == 405

        def test_author_can_delete_his_own_ratings(self, api_client):
            new_rating = RatingFactory()
            api_client.force_authenticate(new_rating.author)

            delete_url = new_rating.get_delete_url()
            response = api_client.delete(delete_url)


            assert response.status_code == 204
            assert Rating.objects.all().count() == 0
        
        def test_user_cant_delete_other_users_ratings(self, api_client):
            new_rating = RatingFactory()
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            delete_url = new_rating.get_delete_url()
            response = api_client.delete(delete_url)


            assert response.status_code == 403
            assert Rating.objects.all().count() == 1
        
        
    class TestGuestUsers:
        def test_delete_page_should_not_render(self, api_client):
            new_rating = RatingFactory()

            delete_url = new_rating.get_delete_url()
            response = api_client.get(delete_url)

            assert response.status_code == 401

        def test_delete_ratings_should_fail(self, api_client):
            new_rating = RatingFactory()

            delete_url = new_rating.get_delete_url()
            response = api_client.delete(delete_url)


            assert response.status_code == 401
            assert Rating.objects.all().count() == 1
        
        



class TestRatingSearchView:
    class TestAuthenticatedUsers:
        def test_search_page_should_render(self, api_client):
            new_rating = RatingFactory()
            api_client.force_authenticate(new_rating.author)

            response = api_client.get(rating_search_url)

            assert response.status_code == 405

        def test_ratings_search_request_should_work(self, api_client):
            new_rating = RatingFactory()
            api_client.force_authenticate(new_rating.author)
            data = {
                'recipe': new_rating.recipe.id
            }
            response = api_client.post(rating_search_url, data)

            assert response.status_code == 200
        
        
    class TestGuestUsers:
        def test_search_page_should_render(self, api_client):
            response = api_client.get(rating_search_url)

            assert response.status_code == 405

        def test_ratings_search_request_success(self, api_client):
            new_rating = RatingFactory()
            data = {
                'recipe': new_rating.recipe.id
            }
            response = api_client.post(rating_search_url, data)

            assert response.status_code == 200
        
        
