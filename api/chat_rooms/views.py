from rest_framework.views import APIView
from chat_rooms.serializers import ChatRoomSerializer, ChatRoomTitleSerializer, ChatRoomMembersSerializer
from rest_framework import permissions
from chat_rooms.models import ChatRoom
from permissions import (IsAuthorOrReadOnly, IsMembersOrAccessDenied)
from rest_framework.generics import (CreateAPIView, UpdateAPIView)
from rest_framework.response import Response



class ChatRoomList(APIView):
    permission_classes = (IsMembersOrAccessDenied, permissions.IsAuthenticated,)
    queryset = ChatRoom.objects.all()

    def get(self, request, format=None):
        '''display chats the the user participate'''

        user = request.user
        queryset = ChatRoom.objects.all().filter(members=user) 

        serializer = ChatRoomSerializer(queryset, many=True)

        return Response(serializer.data)

class ChatRoomCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def perform_create(self, serializer):
        '''
        save the current logged in user as the author of the Chat Room, 
        and add the author to the room members list
        '''
        obj = serializer.save(author=self.request.user)
        obj.members.add(self.request.user)

class ChatRoomUpdateMembers(UpdateAPIView):
    permission_classes = (IsAuthorOrReadOnly, permissions.IsAuthenticated,)
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomMembersSerializer

class ChatRoomUpdateTitle(UpdateAPIView):
    permission_classes = (IsMembersOrAccessDenied, permissions.IsAuthenticated)
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomTitleSerializer
