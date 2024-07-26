from django.db.models import CharField, EmailField, Model, TextField


class Supplier(Model):
    name = CharField(max_length=255)
    contact_email = EmailField()
    phone_number = CharField(max_length=20)
    address = TextField()

    def __str__(self):
        return self.name
