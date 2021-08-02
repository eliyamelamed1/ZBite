from rest_framework import serializers

from accounts.models import UserAccount
from followers.models import Follower


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = ('user_to_follow', )