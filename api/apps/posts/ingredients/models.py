# Create your models here.
import uuid

from django.db import models

class Ingredient(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    text = models.CharField(max_length=150)

    def __str__(self):
        return str(self.text)
    