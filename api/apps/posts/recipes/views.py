from rest_framework import permissions
from rest_framework.generics import (CreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView


from permissions import IsAuthorOrReadOnly

from .models import Recipe
from .serializers import (RecipeCreateSerializer, RecipeSerializer)
from apps.users.accounts.models import UserAccount


class RecipeList(ListAPIView):
    queryset = Recipe.objects.order_by('-updated_at')
    serializer_class = RecipeSerializer

class RecipeDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Recipe.objects.order_by('-updated_at')
    serializer_class = RecipeSerializer


class RecipeCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Recipe.objects.all()
    serializer_class = RecipeCreateSerializer

    def perform_create(self, serializer):
        '''save the the current logged in user as the author of the recipe'''
        serializer.save(author=self.request.user)

class RecipesOfAccountsFollowed(ListAPIView):
    '''display the recipes of followed users'''
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        all_recipes = Recipe.get_recipes_of_followed_accounts(self.request)
        queryset = all_recipes.order_by('-created_at')

        return queryset
    
class TopRatedRecipes(ListAPIView):
    '''display the top rated recipes'''
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.order_by('-stars')[:10]

