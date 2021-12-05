from django.contrib import admin

from .models import Ingredient


class IngredientAdmin(admin.ModelAdmin):
    list_display = ('text_list',)
    list_display_links = ('text_list',)
    list_filter = ('author', )
    list_per_page = 25

admin.site.register(Ingredient, IngredientAdmin)
