import pytest

from apps.users.accounts.models import UserAccount
from factories import RecipeFactory, UserFactory
from apps.posts.recipes.models import Recipe


# add test to get info from recipe detail page
# ------------------------------------------------ Tests
pytestmark = pytest.mark.django_db
create_recipe_url = Recipe.get_create_url()
recipes_of_accounts_followed_url = Recipe.get_recipes_of_accounts_followed_url()
top_rated_recipes_url = Recipe.get_top_rated_recipes_url()

class TestRecipeCreateView:
    class TestAuthenticatedUsers:
        def test_recipe_create_page_render(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            create_recipe_page_render = api_client.get(create_recipe_url)

            assert create_recipe_page_render.status_code == 405 # 405 = method not allowed - get isnt allowed only post

        def test_should_create_recipe(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            recipe_data = RecipeFactory.build()
            data = {
                'title': {recipe_data.title},
                'description': {recipe_data.description},
                'serving': 'four people',
                'cook_time': '2 hours',
                'ingredients_text_list': '',
                'instructions_text_list': '',
            }
            response = api_client.post(create_recipe_url, data)

            assert response.status_code == 201
            assert Recipe.objects.all().count() == 1
        
        def test_recipe_author_is_current_logged_in_user(self, api_client):
                ''' testing the method perform_create '''
                first_user = UserFactory()
                api_client.force_authenticate(first_user)
                recipe_data = RecipeFactory.build()
                data = {
                    'title': {recipe_data.title},
                    'description': {recipe_data.description},
                    'serving': 'four people',
                    'cook_time': '2 hours',
                    'ingredients_text_list': '',
                    'instructions_text_list': '',
                }
                api_client.post(create_recipe_url, data)
                new_recipe = Recipe.objects.get(title=recipe_data.title)

                assert new_recipe.author == first_user

        def test_creating_recipe_should_recalculate_user_recipe_count(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            recipe_data = RecipeFactory.build()
            data = {
                'title': {recipe_data.title},
                'description': {recipe_data.description},
                'serving': 'four people',
                'cook_time': '2 hours',
                'ingredients_text_list': '',
                'instructions_text_list': '',
            }
            api_client.post(create_recipe_url, data)
            new_user = UserAccount.objects.get(id=new_user.id)

            assert new_user.recipe_count == 1

            recipe_data = RecipeFactory.build()
            data = {
                'title': {recipe_data.title},
                'description': {recipe_data.description},
                'serving': 'four people',
                'cook_time': '2 hours',
                'ingredients_text_list': '',
                'instructions_text_list': '',
            }
            api_client.post(create_recipe_url, data)
            new_user = UserAccount.objects.get(id=new_user.id)

            assert new_user.recipe_count == 2

    class TestGuestUsers:
        def test_recipe_create_page_should_not_render(self, api_client):
            response = api_client.get(create_recipe_url)

            assert response.status_code == 401 

        def test_recipe_create_post_request_not_allowed(self, api_client):
            new_user = UserFactory()
            recipe_data = RecipeFactory.build()
            data = {
                'author': {new_user.id},
                'title': {recipe_data.title},
                'serving': 'four people',
                'cook_time': '2 hours',
                'ingredients_text_list': '',
                'instructions_text_list': '',
            }
            response = api_client.post(create_recipe_url, data)            

            assert response.status_code == 401

class TestRecipeDetailsView:
        class TestAuthenticatedUsers:
            def test_recipe_detail_page_render(self ,api_client):
                new_recipe = RecipeFactory()
                api_client.force_authenticate(new_recipe.author)
                response = api_client.get(new_recipe.get_absolute_url())

                assert response.status_code == 200
                
        class TestGuestUsers:
            def test_recipe_detail_page_render(self, api_client):
                new_recipe = RecipeFactory()
                response = api_client.get(new_recipe.get_absolute_url())

                assert response.status_code == 200

class TestDeleteRecipeView:
    class TestIsAuthorOrReadOnly:
        def test_not_author_cant_delete_recipe(self, api_client):
            new_recipe = RecipeFactory()
            random_user = UserFactory()
            api_client.force_authenticate(random_user)
            response = api_client.delete(new_recipe.get_absolute_url())

            assert response.status_code == 403

        def test_author_can_delete_own_recipe(self, api_client):
            new_recipe = RecipeFactory()
            api_client.force_authenticate(new_recipe.author)
            response = api_client.delete(new_recipe.get_absolute_url())

            assert response.status_code == 204 
            assert Recipe.objects.all().count() == 0
            
        def test_deleting_recipe_should_recalculate_user_recipe_count(self, api_client):
            new_recipe = RecipeFactory()
            author = new_recipe.author
            author.recipe_count = 1
            author.save()

            api_client.force_authenticate(author)
            api_client.delete(new_recipe.get_absolute_url())
            author = UserAccount.objects.get(id=author.id)

            assert author.recipe_count == 0
            
        # def test_deleting_recipe_recalculates_author_stars(self, api_client):
            
        #     new_recipe = RecipeFactory()
        #     author = UserAccount.objects.get(id=new_recipe.author.id) 
            # author.stars = 2
            # author.save()

            # assert author.stars == 2
            
            # api_client.force_authenticate(new_recipe.author)
            # api_client.delete(new_recipe.get_absolute_url())

            # author = UserAccount.objects.get(id=new_recipe.author.id)

            # assert author.stars == 0


    class TestGuestUsers:
        def test_recipe_delete(self, api_client):
            new_recipe = RecipeFactory()
            response = api_client.delete(new_recipe.get_absolute_url())

            assert response.status_code == 401

class TestUpdateRecipeView:
    class TestIsAuthorOrReadOnly:
        def test_author_can_update_own_recipe(self, api_client):
            new_recipe = RecipeFactory()
            api_client.force_authenticate(new_recipe.author)
            data = {
                'title': 'updated title',
                'description':'updated_description',
                'serving': 'four people',
                'cook_time': '2 hours',
                'ingredients_text_list': ['updated_ingredients_text_list'],
                'instructions_text_list': ['updated_instructions_text_list'],
            }
            response = api_client.patch(new_recipe.get_absolute_url(), data)

            assert response.status_code == 200
        
        def test_not_author_cant_update_recipe(self, api_client): 
            new_recipe = RecipeFactory()
            random_user = UserFactory()
            api_client.force_authenticate(random_user)
            data = {
                'title': 'updated title',
                'description':'updated_description',
                'serving': 'four people',
                'cook_time': '2 hours',
                'ingredients_text_list': ['updated_ingredients_text_list'],
                'instructions_text_list': ['updated_instructions_text_list'],
            }
            response = api_client.patch(new_recipe.get_absolute_url(), data)

            assert response.status_code == 403

    class TestGuestUsers:
        def test_guest_user_cant_update_recipe(self, api_client):
            first_recipe = RecipeFactory()
            data = {
                'title': 'updated title'
            }
            response = api_client.patch(first_recipe.get_absolute_url(), data)

            assert response.status_code == 401
        
class TestRecipesOfAccountsFollowedView:
    class TestAuthenticatedUsers:
        def test_followed_users_recipes_page_should_render(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            response = api_client.get(recipes_of_accounts_followed_url) 

            assert response.status_code == 200
        
        def test_should_only_display_recipes_of_users_that_in_account_following_list(self, api_client):
            first_user = RecipeFactory().author
            api_client.force_authenticate(first_user)
            
            second_recipe = RecipeFactory()
            third_recipe = RecipeFactory()

            first_user.following.add(second_recipe.author)

            response = api_client.get(recipes_of_accounts_followed_url)

            assert f'{second_recipe}' in f'{response.content}'
            assert f'{third_recipe}' not in f'{response.content}'

        def test_should_display_all_recipes_of_users_that_in_account_following_list(self, api_client):
            first_user = RecipeFactory().author
            
            second_user = UserFactory()
            api_client.force_authenticate(second_user)
            for i in range(10):
                recipe_data = RecipeFactory.build()
                data = {
                    'title': {recipe_data.title},
                    'description': {recipe_data.description},
                }
                api_client.post(create_recipe_url, data)
            
            api_client.logout()
            api_client.force_authenticate(first_user)
            first_user.following.add(second_user)

            response = api_client.get(recipes_of_accounts_followed_url)
            recipes = Recipe.objects.all().filter(author=second_user)

            for recipe in recipes:
                assert f'{recipe}' in f'{response.content}'
    class TestGuestUsers:
        def test_followed_users_recipes_page_should_not_render(self, api_client):
            response = api_client.get(recipes_of_accounts_followed_url) 

            assert response.status_code == 401

class TestTopRatedRecipes:

    class TestAuthenticatedUsers:
        def test_page_should_render_successfully_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(top_rated_recipes_url) 

            assert response.status_code == 200
    

        def test_get_request_should_return_top_rated_recipes(self, api_client):
            for i in range(10):
                new_user = UserFactory() 
                api_client.force_authenticate(new_user)
                recipe_data = RecipeFactory.build()
                data = {
                    'title': {recipe_data.title},
                    'description': {recipe_data.description},
                    'serving': 'four people',
                    'cook_time': '2 hours',
                    'ingredients_text_list': '',
                    'instructions_text_list': '',
                }
                api_client.post(create_recipe_url, data)
                new_recipe = Recipe.objects.all().get(title=recipe_data.title)
                new_recipe.stars = 5
                new_recipe.save()
                api_client.logout()

            for i in range(10):
                new_user = UserFactory() 
                api_client.force_authenticate(new_user)
                recipe_data = RecipeFactory.build()
                data = {
                    'title': {recipe_data.title},
                    'description': {recipe_data.description},
                    'serving': 'four people',
                    'cook_time': '2 hours',
                    'ingredients_text_list': '',
                    'instructions_text_list': '',
                }
                api_client.post(create_recipe_url, data)
                new_recipe = Recipe.objects.all().get(title=recipe_data.title)
                new_recipe.stars = 4
                new_recipe.save()
                api_client.logout()
            
            api_client.force_authenticate(new_user)
            response = api_client.get(top_rated_recipes_url)
            top_rated_recipes = Recipe.objects.all().filter(stars=5)
            bottom_rated_recipes = Recipe.objects.all().filter(stars=4)

            for recipe in top_rated_recipes:
                assert f'{recipe}' in f'{response.content}'
                
            for recipe in bottom_rated_recipes:
                assert f'{recipe}' not in f'{response.content}'
                
    class TestGuestUsers:

        def test_page_should_render_successfully_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(top_rated_recipes_url) 

            assert response.status_code == 200
    
        def test_get_request_should_return_top_rated_recipes(self, api_client):
            
            for i in range(10):
                new_user = UserFactory() 
                api_client.force_authenticate(new_user)
                recipe_data = RecipeFactory.build()
                data = {
                    'title': {recipe_data.title},
                    'description': {recipe_data.description},
                    'serving': 'four people',
                    'cook_time': '2 hours',
                    'ingredients_text_list': '',
                    'instructions_text_list': '',
                }
                api_client.post(create_recipe_url, data)
                new_recipe = Recipe.objects.all().get(title=recipe_data.title)
                new_recipe.stars = 5
                new_recipe.save()
                api_client.logout()

            for i in range(10):
                new_user = UserFactory() 
                api_client.force_authenticate(new_user)
                recipe_data = RecipeFactory.build()
                data = {
                    'title': {recipe_data.title},
                    'description': {recipe_data.description},
                    'serving': 'four people',
                    'cook_time': '2 hours',
                    'ingredients_text_list': '',
                    'instructions_text_list': '',
                }
                api_client.post(create_recipe_url, data)
                new_recipe = Recipe.objects.all().get(title=recipe_data.title)
                new_recipe.stars = 4
                new_recipe.save()
                api_client.logout()
            
            response = api_client.get(top_rated_recipes_url)
            top_rated_recipes = Recipe.objects.all().filter(stars=5)
            bottom_rated_recipes = Recipe.objects.all().filter(stars=4)

            for recipe in top_rated_recipes:
                assert f'{recipe}' in f'{response.content}'
                
            for recipe in bottom_rated_recipes:
                
                assert f'{recipe}' not in f'{response.content}'

class TestSearchRecipes:
    class TestAuthenticatedUsers:
        def test_searching_without_value_should_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.get(Recipe.get_search_url(None)) 

            assert response.status_code == 200

        def test_searching_with_value_should_return_status_code_200(self, api_client):
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            new_recipe = RecipeFactory()
            response = api_client.get(Recipe.get_search_url(new_recipe.title)) 

            assert response.status_code == 200

        # def test_searching_recipe_title_should_display_it(self, api_client):
        #     new_user = UserFactory()
        #     api_client.force_authenticate(new_user)
        #     first_recipe = RecipeFactory()
        #     second_recipe = RecipeFactory()
        #     response = api_client.get(Recipe.get_search_url(first_recipe.title))

        #     assert f'{first_recipe.title}' in f'{response.content}'
        #     assert f'{second_recipe.title}' not in f'{response.content}'

    class TestGuestUsers:
        def test_searching_without_value_should_return_status_code_200(self, api_client):
            response = api_client.get(Recipe.get_search_url(None)) 

            assert response.status_code == 200
        
        def test_searching_with_value_should_return_status_code_200(self, api_client):
            new_recipe = RecipeFactory()
            response = api_client.get(Recipe.get_search_url(new_recipe.title)) 

            assert response.status_code == 200

        # def test_searching_recipe_title_should_display_it(self, api_client):
        #     first_recipe = RecipeFactory()
        #     second_recipe = RecipeFactory()
        #     response = api_client.get(Recipe.get_search_url(first_recipe.title))

        #     assert f'{first_recipe.title}' in f'{response.content}'
        #     assert f'{second_recipe.title}' not in f'{response.content}'
