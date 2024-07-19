from graphene import Mutation, Field, ID, ObjectType, Boolean

from inventory.graphql.services import create_product, delete_product, update_product
from inventory.graphql.types import ProductInput, ProductType
from inventory.graphql.utils import get_object_id, handle_exceptions


class CreateProduct(Mutation):
    class Arguments:
        input = ProductInput(required=True)

    product = Field(ProductType)

    @classmethod
    @handle_exceptions
    def mutate(cls, root, info, input):
        product = create_product(input)
        return CreateProduct(product=product)


class UpdateProduct(Mutation):
    class Arguments:
        id = ID(required=True)
        input = ProductInput(required=True)

    product = Field(ProductType)

    @classmethod
    @handle_exceptions
    def mutate(cls, root, info, id, input):
        product_id = get_object_id(id, 'ProductType')
        product = update_product(product_id, input)
        return UpdateProduct(product=product)


class DeleteProduct(Mutation):
    class Arguments:
        id = ID(required=True)

    success = Boolean()

    @classmethod
    @handle_exceptions
    def mutate(cls, root, info, id):
        product_id = get_object_id(id, 'ProductType')
        success = delete_product(product_id)
        return DeleteProduct(success=success)


class Mutation(ObjectType):
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()
