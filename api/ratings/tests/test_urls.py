import pytest
from django.urls import resolve, reverse

from factories import RatingFactory
from ratings.models import Rating

pytestmark = pytest.mark.django_db

class TestCreatetUrl:
    def test_create_reverse(self):
        assert reverse('ratings:create') == '/api/ratings/create/'

    def test_create_resolve(self):
        assert resolve('/api/ratings/create/').view_name == 'ratings:create'

class TestDeletelUrl:
    def test_detail_reverse(self):
        new_rating = RatingFactory()
        url = reverse('ratings:delete', kwargs={'pk': new_rating.id})
        assert url == f'/api/ratings/delete/{new_rating.id}/'

    def test_detail_resolve(self):
        new_rating = RatingFactory()
        url = f'/api/ratings/delete/{new_rating.id}/'
        assert resolve(url).view_name == 'ratings:delete'

class TestSearchUrl:
    def test_search_url_reverse(self):
        url = reverse('ratings:ratings_in_recipe')
        assert url == f'/api/ratings/ratings_in_recipe/'

    def test_search_url_resolve(self):
        url = f'/api/ratings/ratings_in_recipe/'
        assert resolve(url).view_name == 'ratings:ratings_in_recipe'