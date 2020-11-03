from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField('Name', max_length=100)
    age = models.IntegerField('Age', null=False)

    class Meta:
        db_table = 'user'

# TODO: Experience, Game, Game_Genre