from django.http.response import HttpResponse
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.exceptions import PermissionDenied

from apps.posts.instructions.serializers import InstructionUpdateSerializer
from apps.posts.instructions.models import Instruction
from apps.posts.instructions.serializers import InstructionCreateSerializer
from apps.posts.recipes.models import Recipe


class InstructionCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = InstructionCreateSerializer
    queryset = Instruction.objects.all()

    def create(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipes_queryset = Recipe.objects.all()
        input_recipe_id = self.request.data['recipe']

        recipe = recipes_queryset.get(id__exact=input_recipe_id)
        user = self.request.user

        is_recipe_author = recipe.author == user
        if not is_recipe_author: raise PermissionDenied(detail='You are no the author')
        
        self.perform_create(serializer)

        return HttpResponse(status=201)

class IngredientDetails(RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = InstructionUpdateSerializer
    queryset = Instruction.objects.all()

    def perform_update(self, serializer):
        obj = serializer.save()

        Recipe.instructions = obj

    def perform_destroy(self, serializer):
        serializer.delete()

        Recipe.instructions = None
