# TODO - add tests for factories
from chat_groups.models import ChatGroup
from chat_massages.models import ChatMassage
import factory
import factory.fuzzy

from accounts.models import UserAccount
from comments.models import Comment
from likes.models import Like
from ratings.models import Rating
from recipes.models import Recipe


class UserFactory(factory.django.DjangoModelFactory):
    name = factory.fuzzy.FuzzyText()
    email = factory.Sequence(lambda n: 'person{}@example.com'.format(n))
    password = factory.fuzzy.FuzzyText()

    class Meta:
        model = UserAccount

class RecipeFactory(factory.django.DjangoModelFactory):
    author = factory.SubFactory(UserFactory)
    title = factory.fuzzy.FuzzyText() 
    description= factory.fuzzy.FuzzyText()
    flavor_type = factory.fuzzy.FuzzyChoice(
        [x[0] for x in Recipe.FlavorType.choices] 
    )

    class Meta:
        model = Recipe
class CommentFactory(factory.django.DjangoModelFactory):
    recipe = factory.SubFactory(RecipeFactory)
    author = factory.SubFactory(UserFactory)
    title = factory.fuzzy.FuzzyText()

    class Meta:
        model = Comment

class LikeFactory(factory.django.DjangoModelFactory):
    recipe = factory.SubFactory(RecipeFactory)
    author = factory.SubFactory(UserFactory)
    class Meta:
        model = Like

class RatingFactory(factory.django.DjangoModelFactory):
    author = factory.SubFactory(UserFactory)
    recipe = factory.SubFactory(RecipeFactory) 
    stars = 5
    class Meta:
        model = Rating


class ChatGroupFactory(factory.django.DjangoModelFactory):
    # TODO - need to add the author to the members
    author = factory.SubFactory(UserFactory)
    title = factory.fuzzy.FuzzyText()
    class Meta:
        model = ChatGroup

    @factory.post_generation
    def members(self, create, extracted, **kwargs):
        if not create:
            # self.members.add(self.author)
            return 
            
        if extracted:
            for participant in extracted:
                self.members.add(participant)
        

class ChatMassageFactory(factory.django.DjangoModelFactory):
    author = factory.SubFactory(UserFactory)
    text = factory.fuzzy.FuzzyText() 
    group = factory.SubFactory(ChatGroupFactory)
    class Meta:
        model = ChatMassage
    

    