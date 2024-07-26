from django.db.models import CharField, Model, TextField


class Category(Model):
    name = CharField(max_length=255)
    description = TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
