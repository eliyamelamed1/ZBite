from accounts.serializers import AuthorFieldSerializer
from rest_framework import serializers
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    author = AuthorFieldSerializer()
    class Meta:
        model = Recipe
        fields = '__all__'

class RecipeCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ('title', 'description', 'flavor_type', 'photo_main', 'ingredients', 'instructions','cook_time','serving')

class RecipeSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('flavor_type',)


