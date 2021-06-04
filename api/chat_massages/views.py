from django.http.response import Http404
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from permissions import (IsAuthorOrAccessDenied, )
from rest_framework.generics import (RetrieveUpdateDestroyAPIView, CreateAPIView,)
from chat_massages.models import ChatMassage
from .serializers import ChatMassageCreateSerializer, ChatMassageDetailsSerializer, ChatMassagesRoomSerializer
from django.db.models.query_utils import Q
from chat_rooms.models import ChatRoom
from accounts.models import UserAccount
from django.core.exceptions import PermissionDenied

class ChatMassageDetails(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrAccessDenied,)
    queryset = ChatMassage.objects.all()
    serializer_class = ChatMassageDetailsSerializer



class ChatMassagesInRoom(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatMassagesRoomSerializer

    def post(self, request, format=None):
        user = request.user
        data = request.data

        room = data['room']

        try:
            room = ChatRoom.objects.get(id=room)
            user = UserAccount.objects.get(email=user)
            if user in room.members.all():
                queryset = ChatMassage.objects.filter(room=room)
                serializer = ChatMassageDetailsSerializer(queryset, many=True)

                return Response(serializer.data)
            else:
                raise PermissionDenied()
        except:
            raise PermissionDenied()

class ChatMassageCreate(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatMassageCreateSerializer

    def post(self, request, format=None):
        user = request.user
        data = request.data

        room = data['room']
        text = data['text']

        '''check if the user is a member of the room he wants to send massage to'''
        try:
            room = ChatRoom.objects.get(id=room)
            user = UserAccount.objects.get(email=user)
            if user in room.members.all():
                ChatMassage.objects.create(
                    author = user,
                    room = room,
                    text = text
                )
            else:
                raise PermissionDenied()    
        except:
            raise PermissionDenied() 
        
        return Response()


    def perform_create(self, serializer):
        '''save the current logged in user as the author of the Chat Massage'''
        serializer.save(author=self.request.user)
