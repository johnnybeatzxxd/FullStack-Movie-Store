from django.urls import path, include
from .models import Users
from rest_framework import routers, serializers, viewsets

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','email','username','first_name','last_name']

