from graphene import Mutation, Field, ID, ObjectType, Boolean

from inventory.graphql.types import ProductInput, ProductType
from inventory.graphql.utils import get_object_id
from inventory.graphql.services.crud.product import ProductCRUDService


class CreateProduct(Mutation):
    class Arguments:
        input = ProductInput(required=True)

    product = Field(ProductType)

    def mutate(self, root, info, input):
        product = ProductCRUDService.create(input)
        return CreateProduct(product=product)


class UpdateProduct(Mutation):
    class Arguments:
        id = ID(required=True)
        input = ProductInput(required=True)

    product = Field(ProductType)

    def mutate(self, root, info, id, input):
        product_id = get_object_id(id, 'ProductType')
        product = ProductCRUDService.update(product_id, input)
        return UpdateProduct(product=product)


class DeleteProduct(Mutation):
    class Arguments:
        id = ID(required=True)

    success = Boolean()

    def mutate(self, root, info, id):
        product_id = get_object_id(id, 'ProductType')
        success = ProductCRUDService.delete(product_id)
        return DeleteProduct(success=success)


class Mutation(ObjectType):
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()
