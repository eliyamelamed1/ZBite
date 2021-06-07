from rest_framework import permissions, response
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserAccount

from .serializers import FollowSerializer


# TODO change author to other name
# TODO user_followed change to user_followed.id
class FollowSomeone(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FollowSerializer

    def post(self, request, format=None):
        author = request.user
        input_data = request.data
        user_followed = input_data['user_followed']

        try:
            user_followed = UserAccount.objects.all().get(id__exact=user_followed)
        except:
            return Response('invalid user_followed data')

        if author.id == user_followed.id:
            return Response('you cant follow yourself')

        try:
            already_following = author.following.all().get(id__exact=user_followed.id)
            if already_following:
                author.following.remove(user_followed)
                user_followed.followers.remove(author)
                return Response('unfollowed')
        except:
            author.following.add(user_followed)
            user_followed.followers.add(author)
            return Response('followed')

