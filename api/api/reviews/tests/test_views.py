# TODO add tests for MIN and MAX values of stars 
# TODO test perform_create

import pytest
from django.core.exceptions import ValidationError

from accounts.models import UserAccount
from factories import RecipeFactory, ReviewFactory, UserFactory
from recipes.models import Recipe
from reviews.models import Review

pytestmark = pytest.mark.django_db

review_create_url = Review.get_create_url()
reviews_in_recipe_url = Review.get_reviews_in_recipe_url()
create_recipe_url = Recipe.get_create_url()

class TestRatingCreateView:
    class TestAuthenticatedUsers:
        def test_get_request_return_status_code_405(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(review_create_url) 

            assert response.status_code == 405
        
        def test_create_review_post_request_returns_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            response = api_client.post(review_create_url, data)
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)

            assert response.status_code == 200
    
        def test_creating_a_review_match_it_to_a_recipe(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
            data = {
                'recipe': new_recipe.id,
                'stars': 5,
                'comment': 'comment',
                'image': 'image'
            }
            api_client.post(review_create_url, data)
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)

            assert new_recipe.stars == '5.0'

        def test_creating_a_review_without_image_and_comment_should_be_successfull(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id,
                'stars': 5,
            }
            api_client.post(review_create_url, data)
            review = Review.objects.all().get(author__exact=new_user.id)

            assert review.stars == 5
            assert review.comment == ''
            assert review.image == ''

        def test_review_above_5_stars_raise_validation_error(self, api_client):
            with pytest.raises(ValidationError):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)
                new_recipe = RecipeFactory()
                new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
                data = {
                    'recipe': new_recipe.id,
                    'stars': 5.1,
                    'comment': 'comment'
                }
                api_client.post(review_create_url, data)
                new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)

        def test_review_below_1_stars_raise_validation_error(self, api_client):
            with pytest.raises(ValidationError):
                new_user = UserFactory()
                api_client.force_authenticate(new_user)
                new_recipe = RecipeFactory()
                new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
                data = {
                    'recipe': new_recipe.id,
                    'stars': 0.9,
                    'comment': 'comment'
                }
                api_client.post(review_create_url, data)
                new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)

        def test_user_second_review_will_update_the_first_one(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            data = {
                'recipe': new_recipe.id,
                'stars': 5,
                'comment': 'comment',
                'image': 'image'
            }
            
            api_client.post(review_create_url, data)
            data = {
                'recipe': new_recipe.id,
                'stars': 4,
                'comment': 'comment2',
                'image': 'image2'
            }
            response = api_client.post(review_create_url, data)

            review = Review.objects.all().get(author__exact=new_user.id)

            assert response.status_code == 200
            assert review.stars == 4
            assert review.comment == 'comment2'
            assert review.image == 'image2'
            assert Review.objects.all().count() == 1  

        def test_reviews_from_different_users(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()

            data = {
                'recipe': new_recipe.id,
                'stars': '5',
                'comment': 'comment'
            }
            response = api_client.post(review_create_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id,
                'stars': '4',
                'comment': 'comment'
            }
            response2 = api_client.post(review_create_url, data)

            first_review = Review.objects.all().get(author__exact=new_user.id)
            second_review = Review.objects.all().get(author__exact=new_user2.id)

            assert response.status_code == 200
            assert response2.status_code == 200
            assert Review.objects.all().count() == 2
            assert first_review.stars == 5
            assert second_review.stars== 4
            assert first_review.comment == 'comment'
            assert second_review.comment == 'comment'
        
        def test_multiple_reviews_from_different_users(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            new_recipe = RecipeFactory()
            
            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            api_client.post(review_create_url, data)
            data = {
                'recipe': new_recipe.id,
                'stars': 3
            }
            api_client.post(review_create_url, data)
            api_client.logout()

            new_user2 = UserFactory()
            api_client.force_authenticate(new_user2)
            data = {
                'recipe': new_recipe.id,
                'stars': 4
            }
            api_client.post(review_create_url, data)

            data = {
                'recipe': new_recipe.id,
                'stars': 2
            }
            api_client.post(review_create_url, data)

            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            api_client.post(review_create_url, data)
            api_client.logout()


            first_review = Review.objects.all().get(author__exact=new_user.id)
            second_review = Review.objects.all().get(author__exact=new_user2.id)


            assert Review.objects.all().count() == 2
            assert first_review.stars == 3
            assert second_review.stars == 5


        def test_review_recipe_calculate_recipe_stars(self, api_client):
            recipe = RecipeFactory()
            first_user = UserFactory()
            api_client.force_authenticate(first_user)

            data = {
                'recipe': recipe.id,
                'stars': 4
            }
            api_client.post(review_create_url, data)
            api_client.logout()

            second_user = UserFactory()
            api_client.force_authenticate(second_user)
            data = {
                'recipe': recipe.id,
                'stars': 2
            }
            api_client.post(review_create_url, data)
            recipe = Recipe.objects.all().get(id=recipe.id)

            assert recipe.stars == '3.0'
            assert recipe.stars == str(Review.get_recipe_stars_score(recipe=recipe))


        def test_review_recipe_calculate_account_stars(self, api_client):
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

            api_client.post(review_create_url, data)
            
            data = {
                'recipe': second_recipe.id,
                'stars': 0
            }
            api_client.post(review_create_url, data)
            api_client.logout()


            second_user = UserFactory()
            api_client.force_authenticate(second_user)
            data = {
                'recipe': first_recipe.id,
                'stars': 5
            }
            api_client.post(review_create_url, data)

            data = {
                'recipe': second_recipe.id,
                'stars': 5
            }
            api_client.post(review_create_url, data)
            api_client.logout()


            first_recipe = Recipe.objects.all().get(title=first_recipe.title)
            second_recipe = Recipe.objects.all().get(title=second_recipe.title)
            user = UserAccount.objects.all().get(id=recipe_author.id)

            assert first_recipe.stars == '5.0'
            assert second_recipe.stars == '2.5'
            assert Review.get_account_stars_score(user=user) == 3.75
            assert user.stars == '3.75'


        def test_reviews_on_recipe_from_non_recipe_author_should_still_calculate_recipe_author_avg_score(self, api_client):
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
            api_client.post(review_create_url, data)

            data = {
                'recipe': second_recipe.id,
                'stars': 0
            }
            api_client.post(review_create_url, data)

            first_recipe = Recipe.objects.all().get(title=first_recipe.title)
            second_recipe = Recipe.objects.all().get(title=second_recipe.title)
            user = UserAccount.objects.all().get(id=recipe_author.id)

            assert first_recipe.stars == '5.0'
            assert second_recipe.stars == '0.0'
            assert Review.get_account_stars_score(user=user) == 2.5
            assert user.stars == '2.5'

    class TestGuestUsers:
        def test_review_page_should_not_render(self, api_client):
            
            response = api_client.get(review_create_url) 

            assert response.status_code == 401

        def test_create_review_post_request_should_fail(self, api_client):
            new_recipe = RecipeFactory()

            
            new_recipe = Recipe.objects.all().get(id__exact=new_recipe.id)
            data = {
                'recipe': new_recipe.id,
                'stars': 5
            }
            response = api_client.post(review_create_url, data)

            assert response.status_code == 401


class TestRatingDeleteView:
    class TestAuthenticatedUsers:
        def test_delete_page_should_render(self, api_client):
            new_review = ReviewFactory()
            api_client.force_authenticate(new_review.author)

            delete_url = new_review.get_delete_url()
            response = api_client.get(delete_url)

            assert response.status_code == 405

        def test_author_can_delete_his_own_reviews(self, api_client):
            new_review = ReviewFactory()
            api_client.force_authenticate(new_review.author)

            delete_url = new_review.get_delete_url()
            response = api_client.delete(delete_url)


            assert response.status_code == 204
            assert Review.objects.all().count() == 0
        
        def test_user_cant_delete_other_users_reviews(self, api_client):
            new_review = ReviewFactory()
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            delete_url = new_review.get_delete_url()
            response = api_client.delete(delete_url)


            assert response.status_code == 403
            assert Review.objects.all().count() == 1
        
        
    class TestGuestUsers:
        def test_delete_page_should_not_render(self, api_client):
            new_review = ReviewFactory()

            delete_url = new_review.get_delete_url()
            response = api_client.get(delete_url)

            assert response.status_code == 401

        def test_delete_reviews_should_fail(self, api_client):
            new_review = ReviewFactory()

            delete_url = new_review.get_delete_url()
            response = api_client.delete(delete_url)


            assert response.status_code == 401
            assert Review.objects.all().count() == 1


class TestRatingsInRecipe:
    class TestAuthenticatedUsers:
        def test_get_request_should_return_status_code_405(self, api_client):
            new_review = ReviewFactory()
            api_client.force_authenticate(new_review.author)

            response = api_client.get(reviews_in_recipe_url)

            assert response.status_code == 405

        def test_search_post_request_should_return_status_code_200(self, api_client):
            new_review = ReviewFactory()
            api_client.force_authenticate(new_review.author)
            data = {
                'recipe': new_review.recipe.id
            }
            response = api_client.post(reviews_in_recipe_url, data)

            assert response.status_code == 200

        def test_search_post_request_should_return_reviews(self, api_client):
            new_review = ReviewFactory()
            api_client.force_authenticate(new_review.author)
            data = {
                'recipe': new_review.recipe.id
            }
            response = api_client.post(reviews_in_recipe_url, data)

            assert f'{new_review.id}' in f'{response.content}'
            assert f'{new_review.stars}' in f'{response.content}'        
        
    class TestGuestUsers:
        def test_get_request_should_return_status_code_200(self, api_client):
            response = api_client.get(reviews_in_recipe_url)

            assert response.status_code == 405

        def test_reviews_search_post_request_return_status_code_200(self, api_client):
            new_review = ReviewFactory()
            data = {
                'recipe': new_review.recipe.id
            }
            response = api_client.post(reviews_in_recipe_url, data)

            assert response.status_code == 200
        
        
        def test_reviews_search_post_request_return_reviews(self, api_client):
            new_review = ReviewFactory()
            data = {
                'recipe': new_review.recipe.id
            }
            response = api_client.post(reviews_in_recipe_url, data)

            assert f'{new_review.id}' in f'{response.content}'
            assert f'{new_review.stars}' in f'{response.content}'
        
        
