from django.db import models

# Create your models here.
class Movies(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    rank = models.IntegerField()
    title = models.CharField(max_length=255)
    thumbnail = models.URLField()
    rating = models.CharField(max_length=4)
    year = models.CharField(max_length=20)
    image = models.URLField()
    big_image = models.URLField()
    description = models.TextField()
    genre = models.JSONField()
    imdbid = models.CharField(max_length=50)
    imdb_link = models.URLField()

    class Meta:
        verbose_name_plural = "Movies"
    def __str__(self) -> str:
        return self.title
    
class Series(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    rank = models.IntegerField()
    title = models.CharField(max_length=255)
    thumbnail = models.URLField()
    rating = models.CharField(max_length=4)
    year = models.CharField(max_length=20)  # Changed to CharField to accommodate the year range
    image = models.URLField()
    big_image = models.URLField()
    description = models.TextField()
    genre = models.JSONField()
    imdbid = models.CharField(max_length=50)
    imdb_link = models.URLField()

    class Meta:
        verbose_name_plural = "Series"
    
    def __str__(self) -> str:
        return self.title
