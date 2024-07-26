from graphene import ObjectType
from graphene_django import DjangoListField

from inventory.graphql.types import SupplierType


class Query(ObjectType):
    all_suppliers = DjangoListField(SupplierType)
