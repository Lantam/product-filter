from django.db.models import Manager


class ProductManager(Manager):
    def get_by_category(self, category_id):
        return self.filter(category_id=category_id)

    def get_low_stock_products(self, threshold=10):
        return self.filter(stock__lte=threshold)
