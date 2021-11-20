from django.core.exceptions import PermissionDenied
from django.http import HttpResponseForbidden
from rest_framework import permissions
from rest_framework.generics import RetrieveDestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.accounts.models import UserAccount
from apps.chats.chat_duos.models import ChatDuo
from apps.chats.chat_groups.models import ChatGroup
from apps.chats.chat_massages.models import ChatMassage
from permissions import IsAuthorOrAccessDenied

from .serializers import (ChatMassageCreateSerializer,
                          ChatMassageDetailsSerializer,
                          ChatMassagesRoomSerializer,
                          ChatMassageUpdateSerializer)


class ChatMassageDetails(RetrieveDestroyAPIView):
    permission_classes = (IsAuthorOrAccessDenied, permissions.IsAuthenticated)
    queryset = ChatMassage.objects.all()
    serializer_class = ChatMassageDetailsSerializer

class ChatMassageUpdate(UpdateAPIView):
    permission_classes = (IsAuthorOrAccessDenied, permissions.IsAuthenticated)
    queryset = ChatMassage.objects.all()
    serializer_class = ChatMassageUpdateSerializer


class ChatMassagesInRoom(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatMassagesRoomSerializer


    def post(self, request, format=None):
        user = request.user
        data = request.data

        room = data['room'] # or Chatduo

        room = get_room(room)
        try:
            user = UserAccount.objects.get(email=user)
            if is_user_a_room_member(user, room):
                queryset = room.massages.all()
                serializer = ChatMassageDetailsSerializer(queryset, many=True)

                return Response(serializer.data)
            else:
                raise PermissionDenied('user isnt a room member')
        except:
            raise PermissionDenied('invalid user')
        

class ChatMassageCreate(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatMassageCreateSerializer

    def post(self, request, format=None):
        user = request.user
        data = request.data

        room = data['room']
        text = data['text']

        room = get_room(room)
        try:
            user = UserAccount.objects.get(email=user)
            if is_user_a_room_member(user, room):
                ChatMassage.objects.create(
                    author = user,
                    room = room,
                    text = text
                )

                return Response('massage created successfully')

            else:
                raise PermissionDenied('user is not a room member')    
        except:
            raise PermissionDenied('invalid user') 
        


    def perform_create(self, serializer):
        '''save the current logged in user as the author of the Chat Massage'''
        serializer.save(author=self.request.user)


def is_user_a_room_member(user, room):
    if user in room.members.all():
        return True
    else:
        return False

def get_room(room):
    try:
        room = ChatDuo.objects.get(id=room)
        return room
    except:
        try:
            room = ChatGroup.objects.get(id=room)
            return room
        except:
            PermissionDenied('room isnt exists')
    