from rest_framework import serializers

from .models import ChatRoom
from chat_massages.models import ChatMassage


class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('title', 'members', )
class ChatRoomMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('members', )

class ChatRoomTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('title',)