from rest_framework import serializers

from .models import ChatDuo

class ChatDuoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatDuo
        fields = '__all__'