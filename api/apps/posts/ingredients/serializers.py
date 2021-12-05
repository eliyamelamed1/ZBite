from rest_framework import serializers

from apps.posts.recipes.models import Recipe

from .models import Ingredient
from django.http import HttpResponse


class IngredientCreateSerializer(serializers.ModelSerializer):
    text_list = serializers.ListField()
    class Meta:
        model = Ingredient
        fields = ('recipe','text_list',)
class IngredientUpdateSerializer(serializers.ModelSerializer):
    text_list = serializers.ListField()
    class Meta:
        model = Ingredient
        fields = ('text_list',)


class IngredientFieldSerializer(serializers.ModelSerializer):
    text_list = serializers.ListField()
    class Meta:
        model = Ingredient
        fields = ('text_list',)