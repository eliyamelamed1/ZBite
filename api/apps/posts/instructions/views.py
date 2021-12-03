from api.apps.posts.instructions.serializers import InstructionUpdateSerializer
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView

from apps.posts.instructions.models import Instruction
from apps.posts.instructions.serializers import InstructionCreateSerializer
from apps.posts.recipes.models import Recipe


class InstructionCreate(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = InstructionCreateSerializer
    queryset = Instruction.objects.all()

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
