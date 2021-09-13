from rest_framework import permissions
from rest_framework.generics import (CreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.serializers import FavoriteRecipeSerializer
from permissions import IsAuthorOrReadOnly

from .models import Recipe
from .serializers import (RecipeCreateSerializer, RecipeSearchSerializer,
                          RecipeSerializer)


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
    
class RecipeSearch(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RecipeSearchSerializer

    # TODO learn again
    def post(self, request, format=None):
        queryset = Recipe.objects.order_by('-updated_at')
        data = request.data

        flavor_type = data['flavor_type']
        queryset = queryset.filter(flavor_type__iexact=flavor_type)

        serializer = RecipeSerializer(queryset, many=True) 

        return Response(serializer.data)
    
class RecipesOfAccountsFollowed(APIView):
    '''display the recipes of followed users'''
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = RecipeSerializer

    def get(self, request):
        all_recipes = Recipe.get_recipes_of_followed_accounts(request)
        queryset = all_recipes.order_by('-created_at')
        serializer = RecipeSerializer(queryset, many=True)
        
        return Response(serializer.data)

class TopRatedRecipes(APIView):
    '''display the top rated recipes'''
    serializer_class = RecipeSerializer

    def get(self, request):
        recipes = Recipe.objects.all()

        queryset = recipes.order_by('-stars')[:10]
        serializer = RecipeSerializer(queryset, many=True)

        return Response(serializer.data)
