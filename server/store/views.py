from django.shortcuts import render
import requests
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import Movies,Series
from .serializers import MovieSerializer,SeriesSerializer
from django.http import JsonResponse
from .models import Movies,Series
import json
# from .fetch_data_script import fetch_top_100_movies,fetch_top_100_series
# Create your views here.

@csrf_exempt
@require_GET
def AllMovies(req):
    genre = req.GET.get('genre')
    id = req.GET.get('id')
   
    if genre == "All":
        if id != "":
            movies = [Movies.objects.get(id=id)]     
        else:
            movies = Movies.objects.all()
    else:
        movies = Movies.objects.filter(genre__icontains=genre)
    serialized_movies = MovieSerializer(movies, many=True).data
    return JsonResponse({"top100movies": serialized_movies}, status=200)

@csrf_exempt
@require_GET
def AllSeries(req):

    genre = req.GET.get('genre')
    id = req.GET.get('id')

    if genre == "All":
        if id != "":
            series = [Series.objects.get(id=id)]
        else:
            series = Series.objects.all()
    else:
        series = Series.objects.filter(genre__icontains=genre)
    serialized_series = SeriesSerializer(series, many=True).data
    return JsonResponse({"top100series": serialized_series}, status=200)
    
