# TODO - add tests for factories
import factory
import factory.fuzzy

from apps.users.accounts.models import UserAccount
from apps.chats.chat_duos.models import ChatDuo
from apps.chats.chat_groups.models import ChatGroup
from apps.chats.chat_massages.models import ChatMassage
from apps.posts.saves.models import Save
from apps.posts.recipes.models import Recipe
from apps.posts.reviews.models import Review

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

    class Meta:
        model = Recipe

class SaveFactory(factory.django.DjangoModelFactory):
    recipe = factory.SubFactory(RecipeFactory)
    author = factory.SubFactory(UserFactory)
    class Meta:
        model = Save

class ReviewFactory(factory.django.DjangoModelFactory):
    author = factory.SubFactory(UserFactory)
    recipe = factory.SubFactory(RecipeFactory) 
    stars = 5
    comment = factory.fuzzy.FuzzyText()

    class Meta:
        model = Review


class ChatDuoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ChatDuo

    @factory.post_generation
    def members(self, create, extracted, **kwargs):
        if not create:
            return 
            
        if extracted:
            for participant in extracted:
                self.members.add(participant)
        
class ChatGroupFactory(factory.django.DjangoModelFactory):
    # TODO - need to add the author to the members
    author = factory.SubFactory(UserFactory)
    title = factory.fuzzy.FuzzyText()
    class Meta:
        model = ChatGroup

    @factory.post_generation
    def members(self, create, extracted, **kwargs):
        if not create:
            return 
            
        if extracted:
            for participant in extracted:
                self.members.add(participant)
        

class ChatMassageFactory(factory.django.DjangoModelFactory):
    author = factory.SubFactory(UserFactory)
    text = factory.fuzzy.FuzzyText() 
    room = factory.SubFactory(ChatGroupFactory)
    class Meta:
        model = ChatMassage
    

    