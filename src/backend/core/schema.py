from graphene import ObjectType, Schema

from inventory.graphql import Query as InventoryQuery, Mutation as InventoryMutation


class Query(InventoryQuery, ObjectType):
    pass

class Mutation(InventoryMutation, ObjectType):
    pass

schema = Schema(query=Query, mutation=Mutation)
