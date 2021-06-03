from rest_framework import serializers

from .models import ChatMassage


class ChatMassageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMassage
        fields = ('text', 'room')


class ChatMassageDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMassage
        fields = ('text')

class ChatMassagesRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMassage
        fields = ('room', )