import pytest
from django.urls import resolve, reverse

pytestmark = pytest.mark.django_db

class TestCreateView:
    def test_reverse(self):
        assert reverse('instructions:create') == '/api/instructions/create/'

    def test_resolve(self):
        assert resolve('/api/instructions/create/').view_name == 'instructions:create'

class TestDetailsView:
    def test_reverse(self, create_instruction):
        new_instruction = create_instruction
        url = reverse('instructions:detail', kwargs={"pk": new_instruction.id})

        assert url == f'/api/instructions/{new_instruction.id}/'

    def test_resolve(self, create_instruction):
        new_instruction = create_instruction
        url = f'/api/instructions/{new_instruction.id}/'
        assert resolve(url).view_name == 'instructions:detail'

