from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView

from apps.posts.ingredients.models import Ingredient
from apps.posts.ingredients.serializers import (IngredientSerializer,
                                                IngredientUpdateSerializer)
from apps.posts.recipes.models import Recipe
from permissions import IsRecipeAuthorOrIngredientModifyDenied


class IngredientCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def create(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipes_queryset = Recipe.objects.all()
        input_recipe_id = self.request.data['recipe']
        recipe = recipes_queryset.get(id__exact=input_recipe_id)
        user = self.request.user

        if recipe.author != user: raise PermissionDenied(detail='You are no the author')
        
        ingredients_already_created = Ingredient.objects.filter(recipe=input_recipe_id)
        if ingredients_already_created: raise PermissionDenied(detail='Ingredient already related to input')

        self.perform_create(serializer)

        return HttpResponse(status=201)

    def perform_create(self, serializer):
        '''save the the current logged in user as the author'''
        obj = serializer.save(author=self.request.user)

        Recipe.ingredients = obj

class IngredientUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsRecipeAuthorOrIngredientModifyDenied,)
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def perform_update(self, serializer):
        obj = serializer.save()

        Recipe.ingredients = obj
