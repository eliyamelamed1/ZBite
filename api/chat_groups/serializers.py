from rest_framework import serializers

from .models import ChatGroup
from chat_massages.models import ChatMassage


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