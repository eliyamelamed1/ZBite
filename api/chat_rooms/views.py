from rest_framework.views import APIView
from chat_massages.serializers import ChatMassageSerializer
from chat_massages.models import ChatMassage
from chat_rooms.serializers import ChatRoomSerializer, ChatRoomTitleSerializer, ChatRoomParticipantsSerializer
from rest_framework import permissions
from chat_rooms.models import ChatRoom
from permissions import (IsAuthorOrReadOnly,)
from rest_framework.generics import (CreateAPIView, ListAPIView, UpdateAPIView)
from rest_framework.response import Response



class ChatRoomList(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = ChatRoom.objects.all()

    def get(self, request, format=None):
        '''display chats the the user participate'''

        user = request.user
        queryset = ChatRoom.objects.all().filter(participants=user) 

        serializer = ChatRoomSerializer(queryset, many=True)

        return Response(serializer.data)
class ChatRoomMassagesList(ListAPIView):
    # TODO set permission class to only participants
    serializer_class = ChatMassageSerializer
    queryset = ChatMassage.objects.order_by('-created_at')
    
    def post(self, request, format=None):
        queryset = ChatMassage.objects.order_by('-created_at')
        data = self.request.data
        room = data['room']

        queryset = queryset.filter(room=room)
        serializer = ChatMassageSerializer(queryset, many=True)

        return Response(serializer.data)


class ChatRoomCreate(CreateAPIView): # Tested
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
    # TODO set permission class to only participants
    permission_classes = (IsAuthorOrReadOnly, )
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomParticipantsSerializer

class ChatRoomUpdateTitle(UpdateAPIView):
    # TODO set permission class to only participants
    querySet = ChatRoom.objects.all()
    serializers_class = ChatRoomTitleSerializer
