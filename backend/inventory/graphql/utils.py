from graphql import GraphQLError
from graphql_relay import from_global_id


def get_object_id(global_id, expected_type):
    type_, id_ = from_global_id(global_id)
    if type_ != expected_type:
        raise GraphQLError(f"Invalid ID type: {type_}. Expected {expected_type}")
    return id_
