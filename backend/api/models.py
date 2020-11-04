from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField('Name', max_length = 100)
    age = models.IntegerField('Age', null=False)

    class Meta:
        db_table = 'user'

class Game(models.Model):
    name = models.CharField('Name', max_length = 100, default = '')
    price = models.FloatField('price', null=False)
    platform = models.CharField('platform', max_length = 100)
    developer = models.CharField('developer', max_length = 100)

    class Meta:
        db_table = 'game'

# TODO: Experience, Game, Game_Genre
class Experience(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    game = models.ForeignKey(Game, on_delete = models.CASCADE)
    rating = models.DecimalField('rating', max_digits=4, decimal_places=2)

    class Meta:
        db_table = 'experience'