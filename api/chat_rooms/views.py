from rest_framework.views import APIView
from chat_rooms.serializers import ChatRoomSerializer, ChatRoomTitleSerializer, ChatRoomParticipantsSerializer
from rest_framework import permissions
from chat_rooms.models import ChatRoom
from permissions import (IsAuthorOrReadOnly, IsParticipatnsOrAcssessDenied)
from rest_framework.generics import (CreateAPIView, UpdateAPIView)
from rest_framework.response import Response



class ChatRoomList(APIView):
    permission_classes = (IsParticipatnsOrAcssessDenied, permissions.IsAuthenticated,)
    queryset = ChatRoom.objects.all()

    def get(self, request, format=None):
        '''display chats the the user participate'''

        user = request.user
        queryset = ChatRoom.objects.all().filter(participants=user) 

        serializer = ChatRoomSerializer(queryset, many=True)

        return Response(serializer.data)

class ChatRoomCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def perform_create(self, serializer):
        '''
        save the current logged in user as the author of the Chat Room, 
        and add the author to the room participants list
        '''
        obj = serializer.save(author=self.request.user)
        obj.participants.add(self.request.user)

class ChatRoomUpdateParticipants(UpdateAPIView):
    permission_classes = (IsAuthorOrReadOnly, permissions.IsAuthenticated,)
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomParticipantsSerializer

class ChatRoomUpdateTitle(UpdateAPIView):
    permission_classes = (IsParticipatnsOrAcssessDenied, permissions.IsAuthenticated)
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomTitleSerializer
