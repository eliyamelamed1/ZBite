# Create your models here.
import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse


class Follower(models.Model):
    user_to_follow = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    @classmethod
    def get_follow_url(cls):
        return reverse('followers:follow')