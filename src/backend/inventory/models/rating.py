from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import CASCADE, DateTimeField, ForeignKey, IntegerField, Model

from inventory.models import Product


User = get_user_model()


class Rating(Model):
    product = ForeignKey(Product, related_name='ratings', on_delete=CASCADE, db_index=True)
    user = ForeignKey(User, on_delete=CASCADE, db_index=True)
    value = IntegerField(
        choices=[(i, i) for i in range(1, 6)],
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'user')
