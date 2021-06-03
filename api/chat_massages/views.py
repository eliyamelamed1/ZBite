from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from permissions import (IsAuthorOrReadOnly, IsParticipatnsOrAcssessDenied,)
from rest_framework.generics import (RetrieveUpdateDestroyAPIView, CreateAPIView)
from chat_massages.models import ChatMassage
from .serializers import ChatMassageSerializer, ChatMassageDetailsSerializer, ChatMassagesRoomSerializer
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

class ChatMassagesInRoom(APIView):
    permission_classes = (IsParticipatnsOrAcssessDenied, permissions.IsAuthenticated,)
    serializer_class = ChatMassagesRoomSerializer
    
    def post(self, request, format=None):
        queryset = ChatMassage.objects.order_by('-created_at')
        data = request.data
        room = data['room']

        queryset = queryset.filter(room__exact=room)
        serializer = ChatMassageSerializer(queryset, many=True)

        return Response(serializer.data)
    