from django.db.models import fields
from rest_framework import serializers

from recipes.models import Recipe

from .models import Review


class ReviewDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('stars', 'recipe', 'comment')

class ReviewsInRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('recipe', )
class RecipeStarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('stars', )