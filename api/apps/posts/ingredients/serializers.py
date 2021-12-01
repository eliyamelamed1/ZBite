from rest_framework import serializers

from .models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    text = serializers.ListField()

    class Meta:
        model = Ingredient
        fields = ('recipe','text',)

class IngredientDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

