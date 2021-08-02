from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from .models import UserAccount
from .permissions import IsAuthorOrReadOnly
from .serializers import UserSerializer


class UserListView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly, )
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class LoggedUserDetailView(APIView):
# TODO test this function
    serializer_class = UserSerializer 
    def get(self, request):
        logged_user = UserAccount.objects.get(id=request.user.id) 
        
        serializer = UserSerializer(logged_user)

        return Response(serializer.data)

class TopRatedAccounts(APIView):
    '''display the top rated recipes'''
    serializer_class = UserSerializer

    def get(self, request):
        users = UserAccount.objects.all()

        queryset = users.order_by('-stars')[:10]
        serializer = UserSerializer(queryset, many=True)

        return Response(serializer.data)