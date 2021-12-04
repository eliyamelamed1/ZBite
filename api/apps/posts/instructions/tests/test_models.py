import pytest
from django.urls import reverse

pytestmark = pytest.mark.django_db

def test__str__(create_instruction):
    new_instruction = create_instruction

    assert new_instruction.__str__() == str(new_instruction.text_list)

def test_get_absolute_url(create_instruction):
    new_instruction = create_instruction
    
    assert new_instruction.get_absolute_url() == reverse('instructions:detail', kwargs={"pk": new_instruction.id})
