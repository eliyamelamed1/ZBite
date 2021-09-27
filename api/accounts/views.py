from django.contrib.auth import get_user_model
from django.http.response import HttpResponse
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserAccount
from .permissions import IsAuthorOrReadOnly
from .serializers import UserSerializer
from recipes.serializers import RecipeSerializer

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
        try:
            logged_user = UserAccount.objects.get(id=request.user.id) 
            serializer = UserSerializer(logged_user)

            return Response(serializer.data)
        except:
            return HttpResponse('Unauthorized', status=401)

class TopRatedAccounts(APIView):
    '''display the top rated accounts'''
    serializer_class = UserSerializer

    def get(self, request):
        users = UserAccount.objects.all()

        queryset = users.order_by('-stars')[:10]
        serializer = UserSerializer(queryset, many=True)

        return Response(serializer.data)

class UserWishlist(APIView):
    '''display the user saved recipes'''
    serializer_class = UserSerializer

    def get(self, request):
        try:
            logged_user = UserAccount.objects.get(id=request.user.id) 
            queryset = logged_user.wishlist.all()
            serializer = RecipeSerializer(queryset, many=True)

            return Response(serializer.data)
        except:
            return HttpResponse('Unauthorized', status=401)