from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.posts.ingredients.models import Ingredient
from apps.posts.ingredients.serializers import IngredientSerializer


class IngredientCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def perform_create(self, serializer):
        '''save the the current logged in user as the author of the recipe'''
        serializer.save(author=self.request.user)

