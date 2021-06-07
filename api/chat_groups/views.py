from django.core.exceptions import PermissionDenied
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from chat_groups.models import ChatGroup
from chat_groups.serializers import (ChatGroupMembersSerializer,
                                     ChatGroupSerializer,
                                     ChatGroupTitleSerializer)
from permissions import IsAuthorOrReadOnly, IsMembersOrAccessDenied


class ChatGroupList(APIView):
    permission_classes = (IsMembersOrAccessDenied, permissions.IsAuthenticated,)

    def get(self, request, format=None):
        '''display chat groups the the user participate'''

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
            raise PermissionDenied('group need to have atleast 3 members')

class ChatGroupUpdateMembers(UpdateAPIView):
    permission_classes = (IsAuthorOrReadOnly, permissions.IsAuthenticated,)
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupMembersSerializer

class ChatGroupUpdateTitle(UpdateAPIView):
    permission_classes = (IsMembersOrAccessDenied, permissions.IsAuthenticated)
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupTitleSerializer
