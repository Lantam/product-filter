from graphene import Boolean, Decimal, Float, ID, InputObjectType, Int, String  
from graphene_django.types import DjangoObjectType

from inventory.models import Product


class ProductInput(InputObjectType):
    title = String(required=True)
    price = Decimal(required=True)
    description = String()
    discount = Decimal()
    stock = Int(required=True)
    available = Boolean()
    category_id = ID(required=True)
    supplier_id = ID(required=True)
    rating = Float()


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = (
            'title',
            'price',
            'description',
            'discount',
            'stock',
            'available',
            'created_at',
            'updated_at',
            'category',
            'supplier',
            'rating',
            'image',
        )
