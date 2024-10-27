from django.shortcuts import render
import requests
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import Movies,Series
from .serializers import MovieSerializer,SeriesSerializer
from django.http import JsonResponse
from .models import Movies
import json
# Create your views here.

@csrf_exempt
@require_GET
def AllMovies(req):
    print("sending movies!!!")
    movies = Movies.objects.all()
    serialized_movies = MovieSerializer(movies, many=True).data
    return JsonResponse({"top100movies": serialized_movies}, status=200)
    