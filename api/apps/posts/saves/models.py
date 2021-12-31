# Create your models here.
import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse

from apps.posts.recipes.models import Recipe


class Save(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    def __str__(self):
        return str(self.author)
    
    @classmethod
    def get_create_url(cls):
        return reverse('saves:save')