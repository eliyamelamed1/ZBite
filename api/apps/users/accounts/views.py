from django.contrib.auth import get_user_model

from django.http.response import HttpResponse
from .documents import UserAccountDocument
from rest_framework import permissions
from rest_framework.generics import (ListAPIView, ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.posts.recipes.models import Recipe
from apps.posts.recipes.serializers import RecipeSerializer

from .models import UserAccount
from .permissions import IsAuthorOrReadOnly
from .serializers import UserSearchSerializer, UserSerializer


class UserListView(ListCreateAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveUpdateDestroyAPIView):
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

class UserSavedRecipes(ListAPIView):
    '''display the user saved recipes'''
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        logged_user = UserAccount.objects.get(id=self.request.user.id) 
        queryset = logged_user.saved_recipes.all()
        return queryset

class UserOwnRecipes(ListAPIView):
    '''display recipes of requested user'''
    serializer_class = RecipeSerializer

    def get_queryset(self, *args, **kwargs):
        try:
            account = UserAccount.objects.get(id=self.kwargs['pk'])
        except:
            raise ValueError('account doesnt exits')
        
        queryset = Recipe.objects.filter(author=account).order_by('-created_at')
        
        return queryset

class SearchUsers(ListAPIView):
    serializer_class = UserSearchSerializer

    def get_queryset(self, *args, **kwargs):
        value = self.kwargs['value']
        usersQueryset = UserAccountDocument.search().query('wildcard',name=f'*{value}*',)

        return usersQueryset

