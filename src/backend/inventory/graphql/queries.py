from graphene import Field, Int, List, ObjectType

from inventory.schemas import CategoryType, ProductType, SupplierType
from inventory.models import Category, Product, Supplier


class Query(ObjectType):
    all_categories = List(CategoryType)
    all_suppliers = List(SupplierType)
    all_products = List(ProductType)
    product_by_id = Field(ProductType, id=Int())
    products_by_category = List(ProductType, category_id=Int())

    def resolve_all_categories(self, info, **kwargs):
        return Category.objects.all()

    def resolve_all_suppliers(self, info, **kwargs):
        return Supplier.objects.all()

    def resolve_all_products(self, info, **kwargs):
        return Product.objects.all()

    def resolve_product_by_id(self, info, id):
        try:
            return Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return None

    def resolve_products_by_category(self, info, category_id):
        return Product.objects.filter(category_id=category_id)
