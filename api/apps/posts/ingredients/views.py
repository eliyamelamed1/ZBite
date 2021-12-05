from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import (CreateAPIView, RetrieveUpdateAPIView,)

from apps.posts.ingredients.models import Ingredient
from apps.posts.ingredients.serializers import (IngredientCreateSerializer,
                                                IngredientUpdateSerializer)
from apps.posts.recipes.models import Recipe
from permissions import IsRecipeAuthorOrIngredientModifyDenied


class IngredientCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = IngredientCreateSerializer
    queryset = Ingredient.objects.all()

    def perform_create(self, serializer):
        '''save the the current logged in user as the author'''
        obj = serializer.save(author=self.request.user)

        is_recipe_author = obj.recipe.author == self.request.user
        if not is_recipe_author: 
            obj.delete()
            raise PermissionDenied(detail='You are not the recipe author')

        obj.recipe.ingredients = obj
        obj.recipe.save()

class IngredientDetails(RetrieveUpdateAPIView):
    permission_classes = (IsRecipeAuthorOrIngredientModifyDenied,)
    serializer_class = IngredientUpdateSerializer
    queryset = Ingredient.objects.all()

    def perform_update(self, serializer):
        obj = serializer.save()

        obj.recipe.ingredients = obj
        obj.recipe.save()
