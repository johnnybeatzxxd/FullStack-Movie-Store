from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('get-top-100', views.fetch_100, name='fetch'),
    # path('signup', views.signup, name='signup'),
    
]