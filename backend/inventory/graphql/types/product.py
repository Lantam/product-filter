from django.core.validators import MinValueValidator
from graphene import Boolean, Decimal, Float, ID, InputObjectType, Int, String
from graphene.relay import Node
from graphene_django.types import DjangoObjectType

from inventory.models import Product


class ProductInput(InputObjectType):
    title = String(required=True)
    price = Decimal(required=True, validators=[MinValueValidator(0)])
    description = String()
    discount = Decimal()
    stock = Int(required=True, validators=[MinValueValidator(0)])
    available = Boolean()
    category_id = ID(required=True)
    supplier_id = ID(required=True)
    rating = Float()


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        interfaces = (Node,)
        filter_fields = []
        fields = (
            'id',
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
            'image',
            'average_rating',
            'number_of_ratings',
        )

    average_rating = Float()
    number_of_ratings = Int()

    def resolve_average_rating(self, info):
        return self.average_rating

    def resolve_number_of_ratings(self, info):
        return self.number_of_ratings
