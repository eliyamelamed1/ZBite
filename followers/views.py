from rest_framework import permissions, response
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserAccount

from .serializers import FollowSerializer


# TODO change author to other name
# TODO user_to_follow change to user_to_follow.id
class FollowSomeone(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FollowSerializer

    def post(self, request, format=None):
        author = request.user
        input_data = request.data
        user_to_follow = input_data['user_to_follow']

        try:
            user_to_follow = UserAccount.objects.all().get(id__exact=user_to_follow)
        except:
            return Response('invalid user_to_follow data')

        if author.id == user_to_follow.id:
            return Response('you cant follow yourself')

        try:
            already_following = author.following.all().get(id__exact=user_to_follow.id)
            if already_following:
                author.following.remove(user_to_follow)
                user_to_follow.followers.remove(author)
                return Response('unfollowed')
        except:
            author.following.add(user_to_follow)
            user_to_follow.followers.add(author)
            return Response('followed')

