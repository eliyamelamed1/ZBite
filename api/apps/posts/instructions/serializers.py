from rest_framework import serializers

from apps.posts.recipes.models import Recipe

from .models import Instruction
from django.http import HttpResponse


class InstructionCreateSerializer(serializers.ModelSerializer):
    text = serializers.ListField()
    class Meta:
        model = Instruction
        fields = ('recipe','text', 'image')

class InstructionUpdateSerializer(serializers.ModelSerializer):
    text = serializers.ListField()
    class Meta:
        model = Instruction
        fields = ('text', 'image')
