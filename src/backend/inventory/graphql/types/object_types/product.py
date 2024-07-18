from graphene_django.types import DjangoObjectType

from inventory.models import Product


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
