from functools import wraps

from django.core.exceptions import ValidationError
from graphql import GraphQLError
from graphql_relay import from_global_id

from inventory.exceptions import ProductOperationError


def handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ProductOperationError as e:
            raise GraphQLError(str(e))
        except ValidationError as e:
            raise GraphQLError(f"Validation error: {str(e)}")
        except Exception as e:
            raise GraphQLError(f"An unexpected error occurred: {str(e)}")
    return wrapper

def get_object_id(global_id, expected_type):
    type_, id_ = from_global_id(global_id)
    if type_ != expected_type:
        raise GraphQLError(f"Invalid ID type: {type_}. Expected {expected_type}")
    return id_
