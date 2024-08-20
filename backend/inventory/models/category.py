from django.db.models import CharField, Model, TextField


class Category(Model):
    name = CharField(max_length=255, verbose_name='Category Name')
    description = TextField(blank=True, verbose_name='Description')

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
