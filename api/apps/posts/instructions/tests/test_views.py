import io
import pytest
from django.urls import reverse

from apps.posts.instructions.models import Instruction
from apps.posts.recipes.models import Recipe
from apps.users.accounts.models import UserAccount
from factories import RecipeFactory, UserFactory

create_intructions_url = reverse('instructions:create')
pytestmark = pytest.mark.django_db

text_list = ['1','2']
updated_text_list = ['1','2','6']
image_list = ['some_image']
updated_image_list = ['other_image']


class TestInstructionCreateView:
    class TestAuthenticatedUsers:
        def test_instruction_create_page_render(self, api_client):
            new_user = UserAccount()
            api_client.force_authenticate(new_user)
            create_instruction_page_render = api_client.get(create_intructions_url)

            assert create_instruction_page_render.status_code == 405

        def test_creating_instruction_list_allowed_to_recipe_author(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list,
                'image_list': '',
            }
            response = api_client.post(create_intructions_url, data)

            assert response.status_code == 201
            assert len(Instruction.objects.all()) == 1
            assert Instruction.objects.all()[0].author == recipe_data.author
            assert Instruction.objects.all()[0].recipe == recipe_data
            assert Instruction.objects.all()[0].text_list == text_list
            assert Instruction.objects.all()[0].image_list == ['']
            assert Recipe.objects.all()[0].instructions.text_list == text_list 

        def test_creating_instruction_list_not_allowed_if_not_recipe_author(self, api_client):
            new_user = UserFactory()
            recipe_data = RecipeFactory()
            api_client.force_authenticate(new_user)
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list,
                'image_list': '',
            }
            response = api_client.post(create_intructions_url, data)

            assert response.status_code == 403
            assert len(Instruction.objects.all()) == 0
  
        def test_creating_multiple_instructions_models_for_different_recipes_is_allowed(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list,
                'image_list': image_list,
            }
            response = api_client.post(create_intructions_url, data)

            recipe_data2 = RecipeFactory()
            api_client.force_authenticate(recipe_data2.author)
            text_list2 = ['1','2','4']
            image_list2 = ['other_image']

            data = {
                'recipe': recipe_data2.id,
                'text_list': text_list2,
                'image_list': image_list2,
            }
            response2 = api_client.post(create_intructions_url, data)

            assert len(Instruction.objects.all()) == 2

            assert response.status_code == 201
            assert Instruction.objects.all()[0].author == recipe_data.author
            assert Instruction.objects.all()[0].recipe == recipe_data
            assert Instruction.objects.all()[0].text_list == text_list
            assert Instruction.objects.all()[0].image_list == image_list
            assert Recipe.objects.all()[0].instructions.text_list == text_list2 

            assert response2.status_code == 201
            assert Instruction.objects.all()[1].author == recipe_data2.author
            assert Instruction.objects.all()[1].recipe == recipe_data2
            assert Instruction.objects.all()[1].text_list == text_list2
            assert Instruction.objects.all()[1].image_list == image_list2
            assert Recipe.objects.all()[1].instructions.text_list == text_list2 

        def test_creating_multiple_instructions_models_for_same_recipe_is_forbidden(self, api_client):
            recipe_data = RecipeFactory()
            api_client.force_authenticate(recipe_data.author)
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list,
                'image_list': ''
            }
            response1 = api_client.post(create_intructions_url, data)
            data = {
                'recipe': recipe_data.id,
                'text_list': text_list,
                'image_list': ''
            }
            response2 = api_client.post(create_intructions_url, data)

            assert response1.status_code == 201
            assert response2.status_code == 400

    class TestGuestUsers:
        def test_instruction_create_page_should_not_render(self, api_client):
            create_instruction_page_render = api_client.get(create_intructions_url)

            assert create_instruction_page_render.status_code == 401

class TestInstructionDetailView:
    class TestAuthenticatedUsers:
        def test_instruction_detail_page_render(self, api_client, create_instruction):
            instructions_data = create_instruction
            api_client.force_authenticate(instructions_data.author)
            update_instruction_page_render = api_client.get(instructions_data.get_absolute_url())

            assert update_instruction_page_render.status_code == 200

        def test_updating_instructions_text_allowed_to_recipe_author(self, api_client, create_instruction):
            new_instruction = create_instruction
            api_client.force_authenticate(new_instruction.recipe.author)
            instructions_data = Instruction.objects.all()[0]
            data = {
                'recipe': instructions_data.recipe.id,
                'text_list': updated_text_list
            }
            response = api_client.patch(instructions_data.get_absolute_url(), data)

            assert response.status_code == 200
            assert len(Instruction.objects.all()) == 1
            assert Instruction.objects.all()[0].author == instructions_data.recipe.author
            assert Instruction.objects.all()[0].recipe == instructions_data.recipe
            assert Instruction.objects.all()[0].text_list == updated_text_list
            assert Recipe.objects.all()[0].instructions.text_list == updated_text_list 
      
        def test_updating_instructions_images_allowed_to_recipe_author(self, api_client, create_instruction):
            new_instruction = create_instruction
            api_client.force_authenticate(new_instruction.recipe.author)
            instructions_data = Instruction.objects.all()[0]
            data = {
                'recipe': instructions_data.recipe.id,
                'image_list': updated_image_list
            }
            response = api_client.patch(instructions_data.get_absolute_url(), data)

            assert response.status_code == 200
            assert len(Instruction.objects.all()) == 1
            assert Instruction.objects.all()[0].author == instructions_data.recipe.author
            assert Instruction.objects.all()[0].recipe == instructions_data.recipe
            assert Instruction.objects.all()[0].image_list == updated_image_list
            assert Recipe.objects.all()[0].instructions.image_list == updated_image_list 
      
        def test_updating_instructions_images_and_text_allowed_to_recipe_author(self, api_client, create_instruction):
            new_instruction = create_instruction
            api_client.force_authenticate(new_instruction.recipe.author)
            instructions_data = Instruction.objects.all()[0]
            data = {
                'recipe': instructions_data.recipe.id,
                'text_list': updated_text_list,
                'image_list': updated_image_list
            }
            response = api_client.patch(instructions_data.get_absolute_url(), data)

            assert response.status_code == 200
            assert len(Instruction.objects.all()) == 1
            assert Instruction.objects.all()[0].author == instructions_data.recipe.author
            assert Instruction.objects.all()[0].recipe == instructions_data.recipe
            assert Instruction.objects.all()[0].image_list == updated_image_list
            assert Instruction.objects.all()[0].text_list == updated_text_list
            assert Recipe.objects.all()[0].instructions.image_list == updated_image_list 
            assert Recipe.objects.all()[0].instructions.text_list == updated_text_list 

        def test_updating_instructions_forbidden_if_not_recipe_author(self, api_client, create_instruction):
            new_instruction = create_instruction
            new_user = UserFactory()
            api_client.force_authenticate(new_user)

            text_list = new_instruction.text_list
            image_list = new_instruction.image_list

            updated_text = ['1','2','6']
            data = {
                'recipe': new_instruction.recipe.id,
                'text_list': updated_text,
                'image_list': updated_image_list,
            }
            response = api_client.patch(new_instruction.get_absolute_url(), data)

            assert response.status_code == 403
            assert len(Instruction.objects.all()) == 1
            assert Instruction.objects.all()[0].author == new_instruction.recipe.author
            assert Instruction.objects.all()[0].recipe == new_instruction.recipe
            assert Instruction.objects.all()[0].text_list == text_list
            assert Instruction.objects.all()[0].image_list == image_list
            assert Recipe.objects.all()[0].instructions.text_list == text_list 
            assert Recipe.objects.all()[0].instructions.image_list == image_list 

        def test_updating_multiple_times_allowed_for_recipe_author(self, api_client, create_instruction):
            new_instruction = create_instruction
            api_client.force_authenticate(new_instruction.recipe.author)
            instructions_data = Instruction.objects.all()[0]

            data = {
                'recipe': new_instruction.recipe.id,
                'text_list': updated_text_list,
                'image_list': updated_image_list
            }
            response = api_client.patch(instructions_data.get_absolute_url(), data)

            updated_text2 = ['updated_text2']
            updated_image2 = ['updated_image2']
            data = {
                'recipe': new_instruction.recipe.id,
                'text_list': updated_text2,
                'image_list': updated_image2
            }
            response = api_client.patch(instructions_data.get_absolute_url(), data)

            assert response.status_code == 200
            assert len(Instruction.objects.all()) == 1
            assert Instruction.objects.all()[0].author == new_instruction.recipe.author
            assert Instruction.objects.all()[0].recipe == new_instruction.recipe
            assert Instruction.objects.all()[0].text_list == updated_text2
            assert Instruction.objects.all()[0].image_list == updated_image2
            assert Recipe.objects.all()[0].instructions.text_list == updated_text2 
            assert Recipe.objects.all()[0].instructions.image_list == updated_image2 

        def test_deleting_instructions_allowed_to_recipe_author(self, api_client, create_instruction):
            instructions_data = create_instruction
            api_client.force_authenticate(instructions_data.recipe.author)
            data = {
                'recipe': instructions_data.recipe.id,
            }
            response = api_client.delete(instructions_data.get_absolute_url(), data)

            assert response.status_code == 204
            assert len(Instruction.objects.all()) == 0
            assert instructions_data.recipe.instructions == None

        def test_deleting_instructions_forbidden_if_not_recipe_author(self, api_client, create_instruction):
            instructions_data = create_instruction
            new_user = UserFactory()
            api_client.force_authenticate(new_user)
            response = api_client.delete(instructions_data.get_absolute_url())

            assert response.status_code == 403
            assert len(Instruction.objects.all()) == 1
            assert instructions_data.recipe.instructions == instructions_data


    class TestGuestUsers:
        def test_instruction_detail_page_should_not_render(self, api_client, create_instruction, logout):
            instruction_data = create_instruction
            response = api_client.get(instruction_data.get_absolute_url())

            assert response.status_code == 401

        def test_updating_instructions_forbidden(self, api_client, create_instruction, logout):
            instruction_data = create_instruction
            updated_text = ['1','2','6']
            data = {
                'recipe': instruction_data.recipe.id,
                'text_list': updated_text,
                'image_list': updated_image_list,
            }
            response = api_client.patch(instruction_data.get_absolute_url(), data)

            assert response.status_code == 401
