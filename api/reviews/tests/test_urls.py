import pytest
from django.urls import resolve, reverse

from factories import RatingFactory

pytestmark = pytest.mark.django_db

class TestCreatetUrl:
    def test_create_reverse(self):
        assert reverse('reviews:create') == '/api/reviews/create/'

    def test_create_resolve(self):
        assert resolve('/api/reviews/create/').view_name == 'reviews:create'

class TestDeletelUrl:
    def test_detail_reverse(self):
        new_rating = RatingFactory()
        url = reverse('reviews:delete', kwargs={'pk': new_rating.id})
        assert url == f'/api/reviews/delete/{new_rating.id}/'

    def test_detail_resolve(self):
        new_rating = RatingFactory()
        url = f'/api/reviews/delete/{new_rating.id}/'
        assert resolve(url).view_name == 'reviews:delete'

class TestSearchUrl:
    def test_search_url_reverse(self):
        url = reverse('reviews:reviews_in_recipe')
        assert url == f'/api/reviews/reviews_in_recipe/'

    def test_search_url_resolve(self):
        url = f'/api/reviews/reviews_in_recipe/'
        assert resolve(url).view_name == 'reviews:reviews_in_recipe'