from inventory.graphql.queries.category import Query as CategoryQuery
from inventory.graphql.queries.product import Query as ProductQuery
from inventory.graphql.queries.supplier import Query as SupplierQuery


class Query(CategoryQuery, ProductQuery, SupplierQuery):
    pass
