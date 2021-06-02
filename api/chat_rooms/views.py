from chat_massages.serializers import ChatMassageSerializer
from chat_massages.models import ChatMassage
from chat_rooms.serializers import ChatRoomSerializer, ChatRoomTitleSerializer, ChatRoomParticipentsSerializer
from rest_framework import permissions
from chat_rooms.models import ChatRoom
from permissions import IsAuthorOrReadOnly
from rest_framework.generics import (CreateAPIView, ListAPIView, UpdateAPIView)
from rest_framework.response import Response




class ChatRoomList(ListAPIView):
    # TODO set permission class to only my chat rooms
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

class ChatRoomMassagesList(ListAPIView):
    # TODO set permission class to only participents
    serializer_class = ChatMassageSerializer
    queryset = ChatMassage.objects.order_by('-created_at')
    
    def post(self, request, format=None):
        queryset = ChatMassage.objects.order_by('-created_at')
        data = self.request.data
        room = data['room']

        queryset = queryset.filter(room=room)
        serializer = ChatMassageSerializer(queryset, many=True)

        return Response(serializer.data)

class ChatRoomCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def perform_create(self, serializer):
        '''save the current logged in user as the author of the Chat Room'''
        
        serializer.save(author=self.request.user)

class ChatRoomUpdateParticipents(UpdateAPIView):
    permission_classes = (IsAuthorOrReadOnly)
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomParticipentsSerializer

class ChatRoomUpdateTitle(UpdateAPIView):
    # TODO set permission class to only participents
    querySet = ChatRoom.objects.all()
    serializers_class = ChatRoomTitleSerializer
