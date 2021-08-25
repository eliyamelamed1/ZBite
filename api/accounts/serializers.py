from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
# ref_name field is added to enable the api docs 
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'password')
        ref_name = "user_create"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        ref_name = "user_details"

class FavoriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('favorites',)

