# Create your models here.
import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse


class Instruction(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    recipe = models.OneToOneField('recipes.Recipe', on_delete=models.CASCADE)
    text = models.CharField(max_length=150)
    image = models.ImageField(upload_to='media/', blank=True)

    def get_absolute_url(self):
        """Return absolute URL to the Instruction Detail page."""
        return reverse('instructions:details', kwargs={"pk": self.id})

    def __str__(self):
        return str(self.text)
