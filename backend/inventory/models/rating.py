from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import CASCADE, DateTimeField, ForeignKey, IntegerField, Model


User = get_user_model()


class Rating(Model):
    product = ForeignKey('inventory.Product', related_name='ratings', on_delete=CASCADE, db_index=True, verbose_name='Product')
    user = ForeignKey(User, on_delete=CASCADE, db_index=True, verbose_name='User')
    value = IntegerField(
        choices=[(i, i) for i in range(1, 6)],
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name='Value'
    )
    created_at = DateTimeField(auto_now_add=True, verbose_name='Created At')

    class Meta:
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'
        unique_together = ('product', 'user')
