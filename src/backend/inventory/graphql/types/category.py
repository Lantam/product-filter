from graphene_django.types import DjangoObjectType

from inventory.models import Category


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = (
            'name',
            'description',
        )
