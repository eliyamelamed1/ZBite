from rest_framework import serializers

from .models import ChatMassage


class ChatMassageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMassage
        fields = ('text', 'room',)


class ChatMassageDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMassage
        fields = '__all__'

class ChatMassagesRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMassage
        fields = ('room', )
