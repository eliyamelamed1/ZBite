from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, UpdateAPIView

from apps.posts.ingredients.models import Ingredient
from apps.posts.ingredients.serializers import IngredientSerializer
from apps.posts.recipes.models import Recipe


class IngredientCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def create(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        recipes_queryset = Recipe.objects.all()
        input_recipe_id = self.request.data['recipe']
        recipe = recipes_queryset.get(id__exact=input_recipe_id)
        user = self.request.user

        if recipe.author != user: return HttpResponse(status=403)
        if recipe.ingredients != None: return HttpResponse(status=403)

        self.perform_create(serializer)

        return HttpResponse(status=201)

    def perform_create(self, serializer):
        '''save the the current logged in user as the author'''
        obj = serializer.save(author=self.request.user)
        recipes_queryset = Recipe.objects.all()
        input_recipe_id = self.request.data['recipe']
        recipe = recipes_queryset.get(id__exact=input_recipe_id)

        if recipe.author == self.request.user:
            Recipe.ingredients = obj

class IngredientUpdate(UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    # def update(self, request, format=None):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)

    #     recipes_queryset = Recipe.objects.all()
    #     input_recipe_id = self.request.data['recipe']
    #     recipe = recipes_queryset.get(id__exact=input_recipe_id)
    #     user = self.request.user

    #     if recipe.author != user: return HttpResponse(status=403)
    #     if recipe.ingredients != None: return HttpResponse(status=403)

    #     self.perform_create(serializer)

    #     return HttpResponse(status=201)

    def perform_create(self, serializer):
        '''save the the current logged in user as the author'''
        obj = serializer.save(author=self.request.user)
        recipes_queryset = Recipe.objects.all()
        input_recipe_id = self.request.data['recipe']
        recipe = recipes_queryset.get(id__exact=input_recipe_id)

        if recipe.author == self.request.user:
            Recipe.ingredients = obj
