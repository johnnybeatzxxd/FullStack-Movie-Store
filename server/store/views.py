from django.shortcuts import render
import requests
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import Movies,Series
from django.http import JsonResponse
import json
# Create your views here.
@csrf_exempt
@require_GET
def fetch_100(req):
    pass