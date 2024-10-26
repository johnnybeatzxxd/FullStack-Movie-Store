import requests
import json
from .models import Movies,Series


def fetch_top_100_movies():
    url = "https://imdb-top-100-movies.p.rapidapi.com/"

    headers = {
        "x-rapidapi-key": "9201c692d2msh4e7fcb8b17c2fdap1abee8jsnc6cf54ed3c2b",
        "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    movies_data = response.json()

    for movie in movies_data:
        movie_obj = Movies(
            rank=movie.get('rank'),
            title=movie.get('title'),
            description=movie.get('description'),
            image=movie.get('image'),
            big_image=movie.get('big_image'),
            genre=movie.get('genre'),
            thumbnail=movie.get('thumbnail'),
            rating=movie.get('rating'),
            id=movie.get('id'),
            year=movie.get('year'),
            imdbid=movie.get('imdbid'),
            imdb_link=movie.get('imdb_link')
        )
        movie_obj.save()
def fetch_top_100_series():
    url = "https://imdb-top-100-movies.p.rapidapi.com/series/"

    headers = {
        "x-rapidapi-key": "9201c692d2msh4e7fcb8b17c2fdap1abee8jsnc6cf54ed3c2b",
        "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    series_data = response.json()

    for series in series_data:
        series_obj = Series(
            rank=series.get('rank'),
            title=series.get('title'),
            description=series.get('description'),
            image=series.get('image'),
            big_image=series.get('big_image'),
            genre=series.get('genre'),
            thumbnail=series.get('thumbnail'),
            rating=series.get('rating'),
            id=series.get('id'),
            year=series.get('year'),
            imdbid=series.get('imdbid'),
            imdb_link=series.get('imdb_link')
        )
        series_obj.save()
fetch_top_100_series()