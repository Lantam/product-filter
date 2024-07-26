from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import transaction, IntegrityError
from django.forms.models import model_to_dict


class BaseCRUDService:
    model = None

    @classmethod
    def create(cls, data):
        try:
            with transaction.atomic():
                instance = cls.model(**data)
                instance.full_clean()
                instance.save()
            return instance
        except (IntegrityError, ValidationError) as e:
            raise ValueError(f'Failed to create {cls.model.__name__}: {str(e)}')

    @classmethod
    def get(cls, **kwargs):
        return cls.model.objects.filter(**kwargs).select_for_update(nowait=True).first()
    
    @staticmethod
    def apply_updates(instance, updated_data):
        original_data = model_to_dict(instance)
        changed_fields = [
            field for field, new_value in updated_data.items()
            if field in original_data and original_data[field] != new_value and not setattr(instance, field, new_value)
        ]
        return changed_fields

    @classmethod
    def update(cls, instance_id, updated_data):
        try:
            with transaction.atomic():
                instance = cls.get(id=instance_id)
                if not instance:
                    raise ObjectDoesNotExist(f'{cls.model.__name__} not found')

                changed_data = cls.apply_updates(instance, updated_data)
                if changed_data:
                    rows_updated = cls.model.objects.filter(id=instance_id).update(**changed_data)
                    if rows_updated == 0:
                        raise ObjectDoesNotExist(f'{cls.model.__name__} not found')

                    instance.refresh_from_db()
                
                return instance
        except IntegrityError as e:
            raise ValueError(f'Failed to update {cls.model.__name__}: {str(e)}')

    @classmethod
    def delete(cls, instance_id):
        with transaction.atomic():
            deleted_count, _ = cls.model.objects.filter(id=instance_id).delete()
            if deleted_count == 0:
                raise ObjectDoesNotExist(f'{cls.model.__name__} not found')
        return True
