from inventory.graphql.services.crud import BaseCRUDService
from inventory.models import Product


class ProductCRUDService(BaseCRUDService):
    model = Product
 