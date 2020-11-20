from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField('Name', max_length = 100)
    age = models.IntegerField('Age', null=False)

    class Meta:
        db_table = 'user'

class Game(models.Model):
    name = models.CharField('Name', max_length = 100, default = '')
    developer = models.CharField('Developer', max_length = 100)

    class Meta:
        db_table = 'game'

class Game_Platform(models.Model):
    game = models.ForeignKey(Game, on_delete = models.CASCADE)
    price = models.FloatField('Price', null=False)
    platform = models.CharField('Platform', max_length = 100)

    class Meta:
        db_table = 'game_platform'

# TODO: Experience, Game, Game_Genre
class Experience(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    game = models.ForeignKey(Game, on_delete = models.CASCADE)
    rating = models.DecimalField('Rating', max_digits=4, decimal_places=2)

    class Meta:
        db_table = 'experience'
    
class Game_Genre(models.Model):
    game = models.ForeignKey(Game, on_delete = models.CASCADE)
    genre_name = models.CharField('Genre_Name', max_length = 100)

    class Meta:
        db_table = 'game_genre'