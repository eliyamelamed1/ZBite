from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.posts.recipes.models import Recipe
from permissions import IsAuthorOrReadOnly

from .models import Review
from .serializers import (ReviewCreateSerializer, ReviewDetailSerializer,
                          ReviewsInRecipeSerializer)


class ReviewCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ReviewCreateSerializer

    def perform_create(self, serializer):
        '''save the current logged in user as the author of the comment'''
        serializer.save(author=self.request.user)

    def create(self, request, format=None):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = request.data
            user = request.user

            # comment is optional so check for value 
            try:
                recipe = data['recipe']
                stars = data['stars']
                comment = data['comment']
            except:
                raise ValueError(['at least one input is missing'])


            if (float(stars)>5 or float(stars)<1):
                raise ValueError(['stars should be above 1 and below 5'])
            
            # if already reviewed delete previous review and create new one
            try:
                recipe = Recipe.objects.all().get(id=recipe)
                recipe_reviews = Review.objects.all().filter(recipe=recipe)
                user_review_of_recipe = recipe_reviews.filter(author=user)
                user_review_of_recipe.delete()
                Review.objects.all().create(recipe=recipe, author=user, stars=stars, comment=comment)

            finally:
                # update recipe review_count + stars + score
                recipe = Recipe.objects.all().get(id=recipe.id)
                recipe.review_count = len(Review.objects.filter(recipe__exact=recipe))
                recipe.save()
                recipe.stars = Review.get_recipe_avg_stars(recipe=recipe)
                recipe.save()
                recipe.score = Review.calculate_recipe_score(recipe)
                recipe.save()

                # update author account score
                recipe_author = recipe.author
                recipe_author.stars = Review.get_account_avg_stars(user=recipe_author)
                recipe_author.save()
                recipe_author.score = Review.calculate_account_score(recipe.author)
                recipe_author.save()
                
            return HttpResponse(status=201)
    
class ReviewDelete(DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated ,IsAuthorOrReadOnly,)
    queryset = Review.objects.all()
    serializer_class = ReviewDetailSerializer

    def destroy(self, request, *args, **kwargs):
        review_id = kwargs['pk']
        review = Review.objects.all().get(id=review_id)
        
        if (review.author != self.request.user): return HttpResponse(status=403)  

        Review.objects.get(id=review_id).delete()

        recipe = Recipe.objects.all().get(id=review.recipe.id)
        recipe.review_count = len(Review.objects.filter(recipe__exact=recipe))
        recipe.save()
        recipe.stars = Review.get_recipe_avg_stars(recipe=recipe)
        recipe.save()
        recipe.score = Review.calculate_recipe_score(recipe)
        recipe.save()

        # update author account score
        recipe_author = recipe.author
        recipe_author.stars = Review.get_account_avg_stars(user=recipe_author)
        recipe_author.save()
        recipe_author.score = Review.calculate_account_score(recipe.author)
        recipe_author.save()

        return HttpResponse(status=204)

class ReviewsInRecipe(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ReviewsInRecipeSerializer

    def post(self, request, format=None):
        queryset = Review.objects.all()
        data = self.request.data

        recipe = data['recipe']
        recipe = Recipe.objects.get(id=recipe)
        queryset = queryset.filter(recipe__exact=recipe)

        serializer = ReviewDetailSerializer(queryset, many=True)

        return Response(serializer.data)
