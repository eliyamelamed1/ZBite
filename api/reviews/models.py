import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse

from recipes.models import Recipe


class Review(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    stars = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.author)

    def get_delete_url(self):
        """Return absolute URL to the Rating Delete page."""
        return reverse('reviews:delete', kwargs={'pk': self.id})

    @classmethod
    def get_recipe_stars_score(cls, recipe):
        recipe_reviews_queryset = Review.objects.all().filter(recipe=recipe)
        total_users_who_reviewed_recipe = recipe_reviews_queryset.count()

        total_recipe_stars = 0
        recipe_stars_score = 0

        for i in range(total_users_who_reviewed_recipe):
            recipe_review = recipe_reviews_queryset[i]
            total_recipe_stars += int(recipe_review.stars)

        try:
            recipe_stars_score = total_recipe_stars/total_users_who_reviewed_recipe

        except:
            recipe_stars_score = 0

        return recipe_stars_score

    @classmethod
    def get_account_stars_score(cls, user):
        user_own_recipes = Recipe.objects.all().filter(author=user)
        user_own_recipes_count = user_own_recipes.count()
        sum_of_recipes_scores = 0

        for recipe in user_own_recipes:
            sum_of_recipes_scores += Review.get_recipe_stars_score(recipe=recipe)

        try:
            account_stars_score = sum_of_recipes_scores/user_own_recipes_count
        except:
            account_stars_score = 0

        
        return account_stars_score

    @classmethod
    def get_create_url(cls):
        return reverse('reviews:create')

    @classmethod
    def get_reviews_in_recipe_url(cls):
        return reverse('reviews:reviews_in_recipe')