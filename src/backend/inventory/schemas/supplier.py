from graphene_django.types import DjangoObjectType

from inventory.models.supplier import Supplier


class SupplierType(DjangoObjectType):
    class Meta:
        model = Supplier
