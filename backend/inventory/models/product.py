from typing import Type

from django.db.models import (
    Avg,
    BooleanField,
    CASCADE,
    CharField,
    DateTimeField,
    DecimalField,
    ForeignKey,
    ImageField,
    IntegerField,
    Model,
    TextField,
)

from inventory.managers import ProductManager
from inventory.utils import PathAndRename


class Product(Model):
    title = CharField(max_length=255, verbose_name='Product Title')
    price = DecimalField(max_digits=10, decimal_places=2, verbose_name='Price')
    description = TextField(blank=True, verbose_name='Description')
    discount = DecimalField(max_digits=5, decimal_places=2, default=0, verbose_name='Discount')
    stock = IntegerField(verbose_name='Stock')
    available = BooleanField(default=True, verbose_name='Available')
    created_at = DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = DateTimeField(auto_now=True, verbose_name='Updated At')
    category = ForeignKey(to='inventory.Category', related_name='products', on_delete=CASCADE, verbose_name='Category')
    supplier = ForeignKey(to='inventory.Supplier', related_name='products', on_delete=CASCADE, verbose_name='Supplier')
    image = ImageField(upload_to=PathAndRename('product_images/'), blank=True, verbose_name='Product Image')

    objects: Type[ProductManager] = ProductManager()

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    @property
    def average_rating(self):
        return self.ratings.aggregate(Avg('value'))['value__avg'] or 0

    @property
    def number_of_ratings(self):
        return self.ratings.count()

    def __str__(self):
        return self.title
