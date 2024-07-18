from django.db import transaction
from django.forms.models import model_to_dict

from inventory.models import Product
from inventory.exceptions import ProductOperationError


def create_product(data):
    with transaction.atomic():
        product = Product(**data)
        product.full_clean()
        product.save()
    return product

def get_product_or_404(product_id):
    try:
        return Product.objects.select_for_update().get(pk=product_id)
    except Product.DoesNotExist:
        raise ProductOperationError("Product not found")

def apply_updates(product, updated_data):
    original_data = model_to_dict(product)
    changed_fields = [
        field for field, new_value in updated_data.items()
        if field in original_data and original_data[field] != new_value and not setattr(product, field, new_value)
    ]
    return changed_fields

def update_product(product_id, updated_data):
    with transaction.atomic():
        product = get_product_or_404(product_id)
        changed_fields = apply_updates(product, updated_data)
        if changed_fields:
            product.full_clean()
            product.save(update_fields=changed_fields)
    return product

def delete_product(product_id):
    if not Product.objects.filter(pk=product_id).delete()[0]:
        raise ProductOperationError("Failed to delete product")
    return True
