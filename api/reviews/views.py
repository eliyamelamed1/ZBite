from django.core.exceptions import ValidationError
from rest_framework import permissions
from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from permissions import IsAuthorOrReadOnly
from recipes.models import Recipe

from .models import Review
from .serializers import (ReviewCreateSerializer, ReviewDetailSerializer,
                          ReviewsInRecipeSerializer)


class ReviewCreate(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ReviewCreateSerializer

    def perform_create(self, serializer):
        '''save the current logged in user as the author of the comment'''

        serializer.save(author=self.request.user)

    def post(self, request, format=None):
        data = request.data
        user = request.user

        recipe = data['recipe']
        stars = data['stars']


        if (1<float(stars)>5):
            raise ValidationError('review stars should be between above 1 and below 5')
        
        # if already reviewed update review
        try:
            recipe = Recipe.objects.all().get(id=recipe)
            recipe_reviews = Review.objects.all().filter(recipe=recipe)
            user_review_of_recipe = recipe_reviews.filter(author=user)

            user_review_of_recipe.delete()
            Review.objects.all().create(recipe=recipe, author=user, stars=stars)

        # else create review
        except:
            recipe = Recipe.objects.all().get(id=recipe)
            Review.objects.all().create(recipe=recipe, author=user, stars=stars)

        recipe.stars = Review.get_recipe_stars_score(recipe=recipe)
        recipe.save()

        recipe_author = recipe.author
        recipe_author.stars = Review.get_account_stars_score(user=recipe_author)
        recipe_author.save()

        return Response()

    
class ReviewDelete(DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated ,IsAuthorOrReadOnly,)
    queryset = Review.objects.all()
    serializer_class = ReviewDetailSerializer


class ReviewsInRecipe(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ReviewsInRecipeSerializer

    def post(self, request, format=None):
        queryset = Review.objects.all()
        data = self.request.data

        recipe = data['recipe']
        queryset = queryset.filter(recipe__exact=recipe)

        serializer = ReviewDetailSerializer(queryset, many=True)

        return Response(serializer.data)