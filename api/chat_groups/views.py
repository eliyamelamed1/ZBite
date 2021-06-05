from rest_framework.views import APIView
from chat_groups.serializers import ChatGroupSerializer, ChatGroupTitleSerializer, ChatGroupMembersSerializer
from rest_framework import permissions
from chat_groups.models import ChatGroup
from permissions import (IsAuthorOrReadOnly, IsMembersOrAccessDenied)
from rest_framework.generics import (CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied, ValidationError
from django.http import JsonResponse





class ChatGroupList(APIView):
    permission_classes = (IsMembersOrAccessDenied, permissions.IsAuthenticated,)
    queryset = ChatGroup.objects.all()

    def get(self, request, format=None):
        '''display chats the the user participate'''

        user = request.user
        queryset = ChatGroup.objects.all().filter(members=user) 

        serializer = ChatGroupSerializer(queryset, many=True)

        return Response(serializer.data)

class ChatGroupCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer

    def perform_create(self, serializer):
        '''
        save the current logged in user as the author of the Chat Room, 
        and add the author to the group members list
        '''
        obj = serializer.save(author=self.request.user)
        obj.members.add(self.request.user)
        if obj.members.all().count() < 3:
            raise PermissionDenied()

class ChatGroupUpdateMembers(UpdateAPIView):
    permission_classes = (IsAuthorOrReadOnly, permissions.IsAuthenticated,)
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupMembersSerializer

class ChatGroupUpdateTitle(UpdateAPIView):
    permission_classes = (IsMembersOrAccessDenied, permissions.IsAuthenticated)
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupTitleSerializer
