from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import analyzer, tokenizer
from .models import UserAccount

autocomplete_analyzer = analyzer('autocomplete_analyzer',
            tokenizer=tokenizer('trigram', 'edge_ngram', min_gram=1, max_gram=20),
            filter=['lowercase']
        )

@registry.register_document
class UserAccountDocument(Document):

    name = fields.TextField(required=True, analyzer=autocomplete_analyzer)

    class Index:
        name = 'accounts'
        settings = {
        'number_of_shards': 1,
        'number_of_replicas': 0
        }

    class Django:
        model = UserAccount
        fields = []

