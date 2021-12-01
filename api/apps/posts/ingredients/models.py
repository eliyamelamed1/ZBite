# Create your models here.
import uuid

from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField

class Ingredient(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    recipe = models.ForeignKey('recipes.Recipe', on_delete=models.CASCADE)
    text = ArrayField(models.CharField(max_length=100, blank=True),size=15,)

    def __str__(self):
        return str(self.text)
    