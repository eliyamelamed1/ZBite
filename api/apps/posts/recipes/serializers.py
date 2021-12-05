from apps.posts.instructions.serializers import InstructionFieldSerializer
from apps.posts.ingredients.serializers import IngredientFieldSerializer
from rest_framework import serializers

from apps.users.accounts.serializers import AuthorFieldSerializer

from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    author = AuthorFieldSerializer()
    ingredients = IngredientFieldSerializer()
    instructions = InstructionFieldSerializer()
    class Meta:
        model = Recipe
        fields = '__all__'

class RecipeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id','title', 'description', 'photo_main','cook_time','serving')

