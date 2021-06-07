from django.db.models import fields
from rest_framework import serializers

from recipes.models import Recipe

from .models import Rating


class RatingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class RatingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('stars', 'recipe',)

class RatingsInRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('recipe', )
class RecipeStarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('stars', )