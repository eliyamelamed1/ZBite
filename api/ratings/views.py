from django.core.exceptions import ValidationError
from rest_framework import permissions
from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from permissions import IsAuthorOrReadOnly
from recipes.models import Recipe

from .models import Rating
from .serializers import (RatingCreateSerializer, RatingDetailSerializer,
                          RatingsInRecipeSerializer)


class RatingCreate(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = RatingCreateSerializer

    def perform_create(self, serializer):
        '''save the current logged in user as the author of the comment'''

        serializer.save(author=self.request.user)

    def post(self, request, format=None):
        data = request.data
        user = request.user

        recipe = data['recipe']
        rate = data['stars']


        if (1<float(rate)>5):
            raise ValidationError('rating stars should be between above 1 and below 5')
        
        # if already rated update rating
        try:
            recipe = Recipe.objects.all().get(id=recipe)
            recipe_ratings = Rating.objects.all().filter(recipe=recipe)
            user_rating_of_recipe = recipe_ratings.filter(author=user)

            user_rating_of_recipe.delete()
            Rating.objects.all().create(recipe=recipe, author=user, stars=rate)

        # else create rating
        except:
            recipe = Recipe.objects.all().get(id=recipe)
            Rating.objects.all().create(recipe=recipe, author=user, stars=rate)

        recipe.stars = Rating.get_recipe_stars_score(recipe=recipe)
        recipe.save()

        recipe_author = recipe.author
        recipe_author.stars = Rating.get_account_stars_score(user=recipe_author)
        recipe_author.save()

        return Response()

    
class RatingDelete(DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated ,IsAuthorOrReadOnly,)
    queryset = Rating.objects.all()
    serializer_class = RatingDetailSerializer


class RatingsInRecipe(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RatingsInRecipeSerializer

    def post(self, request, format=None):
        queryset = Rating.objects.all()
        data = self.request.data

        recipe = data['recipe']
        queryset = queryset.filter(recipe__exact=recipe)

        serializer = RatingDetailSerializer(queryset, many=True)

        return Response(serializer.data)