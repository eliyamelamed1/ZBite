from rest_framework import serializers

from .models import ChatRoom


class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('title', 'participents')

class ChatRoomParticipentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('participents')

class ChatRoomTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('title',)