import pytest
from django.urls import resolve, reverse

from factories import CommentFactory

pytestmark = pytest.mark.django_db

class TestCreatetUrl:
    def test_create_reverse(self):
        assert reverse('comments:create') == '/api/comments/create/'

    def test_create_resolve(self):
        assert resolve('/api/comments/create/').view_name == 'comments:create'


class TestDetailUrl:
    def test_detail_reverse(self):
        new_comment = CommentFactory()
        url = reverse('comments:detail', kwargs={'pk': new_comment.id})
        assert url == f'/api/comments/{new_comment.id}/'

    def test_detail_resolve(self):
        new_comment = CommentFactory()
        url = f'/api/comments/{new_comment.id}/'
        assert resolve(url).view_name == 'comments:detail'


class TestDeletelUrl:
    def test_detail_reverse(self):
        new_comment = CommentFactory()
        url = reverse('comments:delete', kwargs={'pk': new_comment.id})
        assert url == f'/api/comments/delete/{new_comment.id}/'

    def test_detail_resolve(self):
        new_comment = CommentFactory()
        url = f'/api/comments/delete/{new_comment.id}/'
        assert resolve(url).view_name == 'comments:delete'


class TestSearchUrl:
    def test_search_url_reverse(self):
        url = reverse('comments:comments_in_recipe')
        assert url == f'/api/comments/comments_in_recipe/'

    def test_search_url_resolve(self):
        url = f'/api/comments/comments_in_recipe/'
        assert resolve(url).view_name == 'comments:comments_in_recipe'