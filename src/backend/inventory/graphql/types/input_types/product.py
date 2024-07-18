from graphene import Boolean, Decimal, Float, ID, InputObjectType, Int, String  


class ProductInput(InputObjectType):
    title = String(required=True)
    price = Decimal(required=True)
    description = String()
    discount = Decimal()
    stock = Int(required=True)
    available = Boolean()
    category_id = ID(required=True)
    supplier_id = ID(required=True)
    rating = Float()
