from django.http import HttpResponse
from permissions import IsRecipeAuthorOrIngredientCreationDenied
from rest_framework import permissions
from rest_framework.generics import CreateAPIView

from apps.posts.ingredients.models import Ingredient
from apps.posts.ingredients.serializers import IngredientSerializer
from apps.posts.recipes.models import Recipe

class IngredientCreate(CreateAPIView):
    permission_classes = (IsRecipeAuthorOrIngredientCreationDenied,)
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def perform_create(self, serializer):
        '''save the the current logged in user as the author'''
        serializer.save(author=self.request.user)
        obj = serializer.save(author=self.request.user)
        recipes_queryset = Recipe.objects.all()
        input_recipe_id = self.request.data['recipe']
        recipe = recipes_queryset.get(id__exact=input_recipe_id)

        if recipe.author == self.request.user:
            Recipe.ingredients = obj
            return HttpResponse(status=201)
            
