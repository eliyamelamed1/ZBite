# TODO - add tests for factories
from chat_rooms.models import ChatRoom
from chat_massages.models import ChatMassage
import factory
import factory.fuzzy
from attr import attributes

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


class ChatRoomFactory(factory.django.DjangoModelFactory):
    author = factory.SubFactory(UserFactory)
    title = factory.fuzzy.FuzzyText() 
    class Meta:
        model = ChatRoom

    @factory.post_generation
    def participants(self, create, extracted, **kwargs):
        if not create:
            return
        
        if extracted:
            for participent in extracted:
                self.participants.add(participent)

class ChatMassageFactory(factory.django.DjangoModelFactory):
    author = factory.SubFactory(UserFactory)
    text = factory.fuzzy.FuzzyText() 
    class Meta:
        model = ChatMassage