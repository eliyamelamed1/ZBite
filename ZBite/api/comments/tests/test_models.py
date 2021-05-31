import pytest
from django.urls import reverse

import conftest
from comments.models import Comment
from factories import CommentFactory

pytestmark = pytest.mark.django_db
def test__str__():
    new_comment = CommentFactory()

    assert new_comment.__str__() == new_comment.title

def test_get_absolute_url():
    new_comment = CommentFactory()
    
    assert new_comment.get_absolute_url() == reverse('comments:detail', kwargs={"pk": new_comment.id})

def test_get_delete_url():
    new_comment = CommentFactory()
    
    assert new_comment.get_delete_url() == reverse('comments:delete', kwargs={"pk": new_comment.id})

def test_get_comment_create_url():

    assert Comment.get_comment_create_url() == reverse('comments:create')