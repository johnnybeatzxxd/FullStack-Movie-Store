# Generated by Django 5.1.2 on 2024-10-25 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_movies_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('rank', models.IntegerField()),
                ('title', models.CharField(max_length=255)),
                ('thumbnail', models.URLField()),
                ('rating', models.CharField(max_length=4)),
                ('year', models.CharField(max_length=20)),
                ('image', models.URLField()),
                ('big_image', models.URLField()),
                ('description', models.TextField()),
                ('genre', models.JSONField()),
                ('imdbid', models.CharField(max_length=50)),
                ('imdb_link', models.URLField()),
            ],
            options={
                'verbose_name_plural': 'Series',
            },
        ),
    ]
