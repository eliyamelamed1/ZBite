from rest_framework import permissions
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveDestroyAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework.views import APIView

from permissions import IsAuthorOrReadOnly, RecipeAuthorCanDeleteComments, IsAuthorOrAccessDenied
from recipes.models import Recipe

from .models import Comment
from .serializers import CommentUpdateSerializer, CommentsInRecipeSerializer, CommentSerializer


class CommentCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        '''save the current logged in user as the author of the comment'''
        serializer.save(author=self.request.user)


class CommentDetail(RetrieveDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentUpdate(UpdateAPIView):
    permission_classes = (IsAuthorOrAccessDenied, )
    queryset = Comment.objects.all()
    serializer_class = CommentUpdateSerializer

class CommentDelete(DestroyAPIView):
    permission_classes = (RecipeAuthorCanDeleteComments, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentsInRecipe(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = CommentsInRecipeSerializer
    
    def post(self, request, format=None):
        queryset = Comment.objects.all() 
        data = self.request.data

        recipe = data['recipe']
        queryset = queryset.filter(recipe__exact=recipe)

        serializer = CommentSerializer(queryset, many=True) 

        return Response(serializer.data)

