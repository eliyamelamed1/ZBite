from django.contrib.auth import get_user_model
from django.db.models import fields
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from accounts.models import UserAccount

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'