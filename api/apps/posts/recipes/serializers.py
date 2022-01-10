from rest_framework import serializers

from apps.users.accounts.serializers import AuthorFieldSerializer

from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    author = AuthorFieldSerializer()
    ingredients_text_list = serializers.ListField()
    instructions_text_list = serializers.ListField()

    class Meta:
        model = Recipe
        fields = '__all__'

class RecipeCreateSerializer(serializers.ModelSerializer):
    ingredients_text_list = serializers.ListField()
    instructions_text_list = serializers.ListField()
    class Meta:
        model = Recipe
        fields = ('id','title', 'description', 'photo_main','cook_time','serving', 'ingredients_text_list','instructions_text_list',)

