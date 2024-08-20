from graphene import Field, ID, ObjectType, Int, List
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError

from inventory.models import Product
from inventory.graphql.types import ProductType
from inventory.graphql.utils import get_object_id
from inventory.graphql.services.crud import product_crud_service


class Query(ObjectType):
    all_products = DjangoFilterConnectionField(ProductType)
    product_by_id = Field(ProductType, product_id=ID(required=True))
    products_by_category = DjangoFilterConnectionField(ProductType, category_id=ID(required=True))
    low_stock_products = List(ProductType, threshold=Int(default_value=10))

    def resolve_product_by_id(self, info, product_id):
        try:
            product_id = get_object_id(product_id, 'ProductType')
            return product_crud_service.get(id=product_id)
        except (ValueError, Product.DoesNotExist):
            return None

    def resolve_products_by_category(self, info, category_id):
        try:
            category_id = get_object_id(category_id, 'CategoryType')
            return Product.objects.get_by_category(category_id)
        except ValueError:
            raise GraphQLError("Invalid category ID")
    
    def resolve_low_stock_products(self, info, threshold):
        return Product.objects.get_low_stock_products(threshold)
