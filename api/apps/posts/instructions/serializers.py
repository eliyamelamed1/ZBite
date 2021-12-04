from rest_framework import serializers

from apps.posts.recipes.models import Recipe

from .models import Instruction


class InstructionCreateSerializer(serializers.ModelSerializer):
    text_list = serializers.ListField()
    class Meta:
        model = Instruction
        fields = ('recipe','text_list',)

class InstructionUpdateSerializer(serializers.ModelSerializer):
    text_list = serializers.ListField()
    class Meta:
        model = Instruction
        fields = ('text_list',)
