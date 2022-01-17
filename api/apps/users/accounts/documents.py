from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from .models import UserAccount

@registry.register_document
class UserAccountDocument(Document):
    class Index:
        name = 'accounts'
        settings = {
        'number_of_shards': 1,
        'number_of_replicas': 0
        }

    class Django:
        model = UserAccount
        fields = [
             'name',
        ]

