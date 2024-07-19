from graphene import Field, ID, ObjectType
from graphene_django import DjangoListField
from graphql import GraphQLError
from graphql_relay import from_global_id

from inventory.models import Product
from inventory.graphql.types import CategoryType, ProductType, SupplierType
from inventory.graphql.utils import get_object_id


class Query(ObjectType):
    all_categories = DjangoListField(CategoryType)
    all_suppliers = DjangoListField(SupplierType)
    all_products = DjangoListField(ProductType)
    product_by_id = Field(ProductType, id=ID(required=True))
    products_by_category = DjangoListField(ProductType, category_id=ID(required=True))

    def resolve_product_by_id(self, info, id):
        try:
            product_id = get_object_id(id, 'ProductType')
            return Product.objects.get(pk=product_id)
        except (ValueError, Product.DoesNotExist):
            return None

    def resolve_products_by_category(self, info, category_id):
        try:
            category_id = get_object_id(id, 'CategoryType')
            return Product.objects.filter(category_id=category_id)
        except ValueError:
            raise GraphQLError("Invalid category ID")
