from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import analyzer, tokenizer

from .models import Recipe

autocomplete_analyzer = analyzer('autocomplete_analyzer',
            tokenizer=tokenizer('trigram', 'edge_ngram', min_gram=1, max_gram=20),
            filter=['lowercase']
        )
@registry.register_document
class RecipeDocument(Document):
    author = fields.ObjectField(properties={
        'id': fields.TextField(),
        'name': fields.TextField(),
        # 'photo_main': fields.FileField(),
    })

    title = fields.TextField(required=True, analyzer=autocomplete_analyzer)
    # photo_main = fields.FieldFile()
    ingredients_text_list = fields.ListField(fields.TextField())
    instructions_text_list = fields.ListField(fields.TextField())

    class Index:
        name = 'recipes'
        settings = {
        'number_of_shards': 1,
        'number_of_replicas': 0,
        'max_ngram_diff': 20
        }

    class Django:
        model = Recipe
        fields = [
            'id',
            'score',
            'description', 
            'photo_main',
            'stars',
            'review_count',
        ]
