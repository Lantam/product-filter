from inventory.graphql.services.crud import BaseCRUDService
from inventory.models import Category


class CategoryCRUDService(BaseCRUDService):
    model = Category


category_crud_service = CategoryCRUDService()
