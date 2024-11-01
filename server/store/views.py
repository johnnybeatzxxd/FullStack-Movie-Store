from django.shortcuts import render
import requests
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import Movies,Series
from .serializers import MovieSerializer,SeriesSerializer
from django.http import JsonResponse
from .models import Movies,Series
from dotenv import load_dotenv
import os
import json
# from .fetch_data_script import fetch_top_100_movies,fetch_top_100_series
# Create your views here.
load_dotenv()
frontend_url = os.getenv('DATABASE_NAME')


@csrf_exempt
@require_GET
def AllMovies(req):
    genre = req.GET.get('genre')
    id = req.GET.get('id')
    keyword = req.GET.get('keyword')
   
    if genre == "All":
        if id != "":
            movies = [Movies.objects.get(id=id)]     
        else:
            if keyword != "":
                movies = Movies.objects.filter(title__icontains=keyword)
            else:
                movies = Movies.objects.all()
    else:
        if keyword != "":
                movies = Movies.objects.filter(title__icontains=keyword,genre__icontains=genre)
        else:
            movies = Movies.objects.filter(genre__icontains=genre)
    serialized_movies = MovieSerializer(movies, many=True).data
    response = JsonResponse({"top100movies": serialized_movies}, status=200)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"

    return response

@csrf_exempt
@require_GET
def AllSeries(req):

    genre = req.GET.get('genre')
    id = req.GET.get('id')
    keyword = req.GET.get('keyword')
    if genre == "All":
        if id != "":
            series = [Series.objects.get(id=id)]
        else:
            if keyword != "":
                series = Series.objects.filter(title__icontains=keyword,)
            else:
                series = Series.objects.all()
    else:
        if keyword != "":
            series = Series.objects.filter(title__icontains=keyword,genre__icontains=genre)
        else:
            series = Series.objects.filter(genre__icontains=genre)
    serialized_series = SeriesSerializer(series, many=True).data
    response = JsonResponse({"top100series": serialized_series}, status=200)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"

    return response
    
@csrf_exempt
@require_GET
def query(req):
    return