from graphene import ObjectType, Schema

from inventory.graphql.queries import Query as InventoryQuery
from inventory.graphql.mutations import Mutation as InventoryMutation


class Query(InventoryQuery, ObjectType):
    pass

class Mutation(InventoryMutation, ObjectType):
    pass

schema = Schema(query=Query, mutation=Mutation)
