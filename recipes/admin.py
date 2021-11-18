from django.contrib import admin

from .models import Recipe


class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    list_filter = ('author', )
    search_fields = ('title', 'description')
    list_per_page = 25

admin.site.register(Recipe, RecipeAdmin)
