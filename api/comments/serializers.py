from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CommentsInRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('recipe',)
class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('title','image',)
