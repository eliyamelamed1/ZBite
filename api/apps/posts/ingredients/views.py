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

    def create(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        input_recipe_id = self.request.data['recipe']

        recipe = Recipe.objects.get(id__exact=input_recipe_id)
        user = self.request.user

        is_recipe_author = recipe.author == user
        if not is_recipe_author: raise PermissionDenied(detail='You are no the author')
        
        self.perform_create(serializer)

        return HttpResponse(status=201)

    def perform_create(self, serializer):
        '''save the the current logged in user as the author'''
        obj = serializer.save(author=self.request.user)

        input_recipe_id = self.request.data['recipe']
        recipe = Recipe.objects.get(id__exact=input_recipe_id)
        recipe.ingredients = obj
        recipe.save()

class IngredientDetails(RetrieveUpdateAPIView):
    permission_classes = (IsRecipeAuthorOrIngredientModifyDenied,)
    serializer_class = IngredientUpdateSerializer
    queryset = Ingredient.objects.all()

    def perform_update(self, serializer):
        obj = serializer.save()

        input_recipe_id = self.request.data['recipe']
        recipe = Recipe.objects.get(id__exact=input_recipe_id)
        recipe.ingredients = obj
        recipe.save()
