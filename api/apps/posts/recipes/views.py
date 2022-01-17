from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank
from rest_framework import permissions
from rest_framework.generics import (CreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView)
from permissions import IsAuthorOrReadOnly
from .models import Recipe
from .serializers import RecipeCreateSerializer, RecipeSearchSerializer, RecipeSerializer



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



class SearchRecipes(ListAPIView):
    serializer_class = RecipeSearchSerializer

    def get_queryset(self, *args, **kwargs):
        value = self.kwargs['value']

        if value:
            vector = SearchVector('title','description')
            query = SearchQuery(value)
            recipesQueryset = Recipe.objects.annotate(rank=SearchRank(vector,query)).filter(rank__gte=0.001).order_by('-rank')
        
        else:
            recipesQueryset: None

        return recipesQueryset
