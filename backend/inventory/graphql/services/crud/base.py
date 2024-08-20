from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import transaction, IntegrityError
from django.forms.models import model_to_dict


class BaseCRUDService:
    model = None

    def pre_create(self, data):
        return data

    def post_create(self, instance):
        return instance

    def create(self, data):
        try:
            prepared_data = self.pre_create(data)
            instance = self.model.objects.create(**prepared_data)
            return self.post_create(instance)
        except (IntegrityError, ValidationError) as e:
            raise ValueError(f'Failed to create {self.model.__name__}: {str(e)}')

    def pre_get(self, **kwargs):
        return kwargs

    def post_get(self, instance):
        return instance

    def get(self, **kwargs):
        filter_kwargs = self.pre_get(**kwargs)
        instance = self.model.objects.filter(**filter_kwargs).select_for_update(nowait=True).first()
        return self.post_get(instance) if instance else None
    
    def pre_update(self, instance, data):
        return data

    def post_update(self, instance):
        return instance

    def apply_updates(self, instance, updated_data):
        original_data = model_to_dict(instance)
        changed_fields = [
            field for field, new_value in updated_data.items()
            if field in original_data and original_data[field] != new_value and not setattr(instance, field, new_value)
        ]
        return changed_fields

    def update(self, instance_id, updated_data):
        try:
            with transaction.atomic():
                instance = self.get(id=instance_id)
                if not instance:
                    raise ObjectDoesNotExist(f'{self.model.__name__} not found')

                prepared_data = self.pre_update(instance, updated_data)
                changed_data = self.apply_updates(instance, prepared_data)
                if changed_data:
                    rows_updated = self.model.objects.filter(id=instance_id).update(**changed_data)
                    if rows_updated == 0:
                        raise ObjectDoesNotExist(f'{self.model.__name__} not found')
                
                return self.post_update(instance)
        except IntegrityError as e:
            raise ValueError(f'Failed to update {self.model.__name__}: {str(e)}')
    
    def pre_delete(self, instance_id):
        return instance_id

    def post_delete(self, deleted_count):
        return deleted_count > 0

    def delete(self, instance_id):
        instance_id = self.pre_delete(instance_id)
        deleted_count, _ = self.model.objects.filter(id=instance_id).delete()
        return self.post_delete(deleted_count)
