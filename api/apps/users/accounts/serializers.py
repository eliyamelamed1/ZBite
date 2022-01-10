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
        fields = ('id','email','name','followers','following','saved_recipes','stars',)
        ref_name = "user_details"

class SavedRecipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('saved_recipes',)

class AuthorFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name','photo_main',)