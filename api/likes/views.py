from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from recipes.models import Recipe

from .serializers import LikeSerializer


class LikeRecipe(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        '''set the logged user as as like author'''
        serializer.save(author=self.request.user)  

    def post(self, request, format=None):
        recipes_queryset = Recipe.objects.all()
        user = request.user
        input_recipe_id = request.data['recipe']
        recipe = recipes_queryset.get(id__exact=input_recipe_id)
        
        try:
            user_already_liked_recipe = recipe.likes.all().get(id__exact=user.id)
            if user_already_liked_recipe:
                recipe.likes.remove(user.id)
                user.favorites.remove(recipe.id)
        except:
            recipe.likes.add(user.id)
            user.favorites.add(recipe.id)


        return Response()