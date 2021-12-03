from rest_framework import serializers

from apps.posts.recipes.models import Recipe

from .models import Ingredient
from django.http import HttpResponse


class IngredientSerializer(serializers.ModelSerializer):
    text = serializers.ListField()
    class Meta:
        model = Ingredient
        fields = ('recipe','text',)
class IngredientDetailsSerializer(serializers.ModelSerializer):
    text = serializers.ListField()
    class Meta:
        model = Ingredient
        fields = ('text',)
