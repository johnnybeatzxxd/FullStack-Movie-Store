from django.urls import path
from . import views



urlpatterns = [
    path('movies/top100', views.AllMovies, name='movies'),
    path('series/top100', views.AllSeries, name='series'),
    path('query/top100', views.query, name='query'),

    
]

