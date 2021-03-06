# Generated by Django 3.1.2 on 2020-11-08 21:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20201104_1612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='rating',
            field=models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Rating'),
        ),
        migrations.AlterField(
            model_name='game',
            name='developer',
            field=models.CharField(max_length=100, verbose_name='Developer'),
        ),
        migrations.AlterField(
            model_name='game',
            name='platform',
            field=models.CharField(max_length=100, verbose_name='Platform'),
        ),
        migrations.AlterField(
            model_name='game',
            name='price',
            field=models.FloatField(verbose_name='Price'),
        ),
        migrations.CreateModel(
            name='Game_Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genreName', models.CharField(max_length=100, verbose_name='Genre_Name')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.game')),
            ],
            options={
                'db_table': 'game_genre',
            },
        ),
    ]
