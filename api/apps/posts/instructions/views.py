from django.http.response import HttpResponse
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import (CreateAPIView, RetrieveUpdateAPIView,)

from apps.posts.instructions.models import Instruction
from apps.posts.instructions.serializers import (InstructionCreateSerializer,
                                                 InstructionUpdateSerializer)
from permissions import IsRecipeAuthorOrIngredientModifyDenied


class InstructionCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = InstructionCreateSerializer
    queryset = Instruction.objects.all()
    
    def perform_create(self, serializer):
        '''save the the current logged in user as the author'''
        obj = serializer.save(author=self.request.user)

        is_recipe_author = obj.recipe.author == self.request.user
        if not is_recipe_author: 
            obj.delete()
            raise PermissionDenied(detail='You are no the author')

        obj.recipe.instructions = obj
        obj.recipe.save()


class InstructionDetails(RetrieveUpdateAPIView):
    permission_classes = (IsRecipeAuthorOrIngredientModifyDenied,)
    serializer_class = InstructionUpdateSerializer
    queryset = Instruction.objects.all()

    def perform_update(self, serializer):
        obj = serializer.save()

        obj.recipe.instructions = obj
        obj.recipe.save()
