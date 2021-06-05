from rest_framework import permissions
from rest_framework.generics import (CreateAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView
from chat_duos.models import ChatDuo
from .serializers import ChatDuoSerializer
from django.core.exceptions import PermissionDenied
from django.db.models.query_utils import Q


class ChatDuoList(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        '''display the chat duos of the user'''
        user = request.user
        queryset = ChatDuo.objects.all().filter(members=user)

        serializer = ChatDuoSerializer(queryset, many=True)

        return Response(serializer.data)

class ChatDuoCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = ChatDuo.objects.all()
    serializer_class = ChatDuoSerializer

    def perform_create(self, serializer):
        ''' 
        save the current logged in user as the author of the Chat Room, 
        and add the author to the group members list
        '''
        obj = serializer.save()
        obj.members.add(self.request.user)

        if obj.members.all().count() != 2:
            raise PermissionDenied()
    
        chat_duos = ChatDuo.objects.all()
        user = obj.members.all()[0]
        user2 = obj.members.all()[1]
        if chat_duos.filter(Q(members=user) and Q(members=user2)).count() > 1:
            raise PermissionDenied()