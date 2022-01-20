import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse

from apps.posts.recipes.models import Recipe



class Review(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    stars = models.FloatField()
    comment = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return str(self.author)

    def get_delete_url(self):
        """Return absolute URL to the Rating Delete page."""
        return reverse('reviews:delete', kwargs={'pk': self.id})

    @classmethod
    def get_recipe_avg_stars(cls, recipe):
        recipe_reviews_queryset = Review.objects.all().filter(recipe=recipe)
        total_users_who_reviewed_recipe = recipe_reviews_queryset.count()

        total_recipe_stars = 0
        recipe_avg_stars = 0

        for i in range(total_users_who_reviewed_recipe):
            recipe_review = recipe_reviews_queryset[i]
            total_recipe_stars += recipe_review.stars

        try:
            recipe_avg_stars = total_recipe_stars/total_users_who_reviewed_recipe

        except:
            recipe_avg_stars = 0

        return recipe_avg_stars

    @classmethod
    def calculate_recipe_score(cls, recipe):
        recipe = Recipe.objects.get(id=recipe.id)
        review_count = len(Review.objects.all().filter(recipe=recipe))
        score = 0
        if review_count != 0:
            score = (recipe.stars - 3) * review_count
        
        return round(score,1)

    @classmethod
    def calculate_account_score(cls, author):
        all_recipes = Recipe.objects.filter(author=author)
        score = 0.0

        for recipe in all_recipes:
            score += recipe.score

        return round(score,1)

    @classmethod
    def get_account_avg_stars(cls, user):
        user_own_recipes = Recipe.objects.all().filter(author=user)

        user_own_recipes_count = user_own_recipes.count()
        sum_of_recipes_stars = 0

        for recipe in user_own_recipes:
            sum_of_recipes_stars += Review.get_recipe_avg_stars(recipe=recipe)

        try:
            account_avg_stars = sum_of_recipes_stars/user_own_recipes_count
        except:
            account_avg_stars = 0


        return account_avg_stars

    @classmethod
    def get_create_url(cls):
        return reverse('reviews:create')

    @classmethod
    def get_reviews_in_recipe_url(cls):
        return reverse('reviews:reviews_in_recipe')