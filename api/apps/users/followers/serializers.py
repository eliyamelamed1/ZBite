from rest_framework import serializers

from apps.users.accounts.models import UserAccount
from apps.users.followers.models import Follower


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = ('user_to_follow', )