from graphene import ObjectType
from graphene_django import DjangoListField

from inventory.graphql.types import CategoryType


class Query(ObjectType):
    all_categories = DjangoListField(CategoryType)
