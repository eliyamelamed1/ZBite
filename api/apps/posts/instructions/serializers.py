from rest_framework import serializers

from apps.posts.recipes.models import Recipe

from .models import Instruction
from django.http import HttpResponse


class InstructionCreateSerializer(serializers.ModelSerializer):
    text_list = serializers.ListField()
    image_list = serializers.ListField()
    class Meta:
        model = Instruction
        fields = ('recipe','text_list', 'image_list')

class InstructionUpdateSerializer(serializers.ModelSerializer):
    text = serializers.ListField()
    class Meta:
        model = Instruction
        fields = ('text', 'image_list')
