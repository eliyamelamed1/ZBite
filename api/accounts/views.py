from recipes.models import Recipe
from django.contrib.auth import get_user_model
from django.http.response import Http404, HttpResponse
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from .models import UserAccount
from .permissions import IsAuthorOrReadOnly
from .serializers import FavoriteRecipeSerializer, UserSerializer


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

class SaveFavoriteRecipe(APIView):
    serializer_class = FavoriteRecipeSerializer

    def perform_create(self, serializer):
        '''set the logged user as the one who make the request of saving favorites recipe'''
        serializer.save(author=self.request.user)

    def post(self, request, format=None):
        user = request.user
        input_recipe = request.data['favorites']

        try:
            user_already_saved_recipe = user.favorites.all().get(id__exact=input_recipe)
            if user_already_saved_recipe:
                user.favorites.remove(input_recipe)
        except:
            user.favorites.add(input_recipe)

        return Response()
