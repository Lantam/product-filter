from graphene import Boolean, Decimal, Field, Float, Int, Mutation, ObjectType, String

from inventory.models import Product
from inventory.schemas import ProductType


class CreateProduct(Mutation):
    class Arguments:
        name = String(required=True)
        description = String()
        price = Decimal(required=True)
        discount = Decimal()
        stock = Int(required=True)
        available = Boolean()
        category_id = Int(required=True)
        supplier_id = Int(required=True)
        rating = Float()

    product = Field(ProductType)

    def mutate(self, info, name, description, price, discount, stock, available, category_id, supplier_id, rating):
        product = Product(
            name=name,
            description=description,
            price=price,
            discount=discount,
            stock=stock,
            available=available,
            category_id=category_id,
            supplier_id=supplier_id,
            rating=rating
        )
        product.save()
        return CreateProduct(product=product)

class Mutation(ObjectType):
    create_product = CreateProduct.Field()
