from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.posts.recipes.models import Recipe

from .serializers import SaveSerializer


class SaveRecipe(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SaveSerializer

    def perform_create(self, serializer):
        '''set the logged user as as save author'''
        serializer.save(author=self.request.user)  

    def post(self, request, format=None):
        recipes_queryset = Recipe.objects.all()
        user = request.user
        input_recipe_id = request.data['recipe']
        recipe = recipes_queryset.get(id__exact=input_recipe_id)
        
        try:
            user_already_saved_recipe = recipe.saves.all().get(id__exact=user.id)
            if user_already_saved_recipe:
                recipe.saves.remove(user)
                user.saved_recipes.remove(recipe)
        except:
            recipe.saves.add(user)
            user.saved_recipes.add(recipe)


        return Response()