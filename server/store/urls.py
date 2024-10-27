from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('movies/top100', views.AllMovies, name='fetch'),
    # path('signup', views.signup, name='signup'),
    
]