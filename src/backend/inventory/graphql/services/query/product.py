from inventory.models import Product


class ProductQueryService:
    model = Product
    
    @classmethod
    def get_by_category(cls, category_id):
        return cls.model.objects.filter(category_id=category_id)
    
    @classmethod
    def get_low_stock_products(cls, threshold=10):
        return cls.model.objects.filter(stock_quantity__lte=threshold)