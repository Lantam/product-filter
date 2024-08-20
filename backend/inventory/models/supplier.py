from django.db.models import CharField, EmailField, Model, TextField


class Supplier(Model):
    name = CharField(max_length=255, verbose_name='Name')
    contact_email = EmailField(verbose_name='Contact Email')
    phone_number = CharField(max_length=20, verbose_name='Phone Number')
    address = TextField(verbose_name='Address')

    class Meta:
        verbose_name = 'Supplier'
        verbose_name_plural = 'Suppliers'

    def __str__(self):
        return self.name
