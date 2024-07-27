from django.db.models import (
    Avg, BooleanField, CASCADE, CharField,
    DateTimeField, DecimalField, ForeignKey,
    ImageField, IntegerField, Model, TextField,
)


class Product(Model):
    title = CharField(max_length=255)
    price = DecimalField(max_digits=10, decimal_places=2)
    description = TextField(blank=True, null=True)
    discount = DecimalField(max_digits=5, decimal_places=2, default=0)
    stock = IntegerField()
    available = BooleanField(default=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    category = ForeignKey(to='inventory.Category', related_name='products', on_delete=CASCADE)
    supplier = ForeignKey(to='inventory.Supplier', related_name='products', on_delete=CASCADE)
    image = ImageField(upload_to='product_images/', blank=True, null=True)

    @property
    def average_rating(self):
        return self.ratings.aggregate(Avg('value'))['value__avg'] or 0

    @property
    def number_of_ratings(self):
        return self.ratings.count()

    def __str__(self):
        return self.title
