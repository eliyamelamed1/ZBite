from rest_framework import serializers

from .models import ChatGroup


class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = ('title', 'members', )
class ChatGroupMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = ('members', )

class ChatGroupTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = ('title',)