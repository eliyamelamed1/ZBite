from rest_framework import permissions
from permissions import IsAuthorOrReadOnly
from rest_framework.generics import (RetrieveUpdateDestroyAPIView, CreateAPIView)
from chat_massages.models import ChatMassage
from .serializers import ChatMassageSerializer, ChatMassageDetailsSerializer

class ChatMassageCreate(CreateAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = ChatMassage.objects.all()
    serializer_class = ChatMassageSerializer

    def perform_create(self, serializer):
        '''save the current logged in user as the author of the Chat Massage'''
        serializer.save(author=self.request.user)

class ChatMassageDetails(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly, )
    queryset = ChatMassage.objects.all()
    serializer_class = ChatMassageDetailsSerializer

