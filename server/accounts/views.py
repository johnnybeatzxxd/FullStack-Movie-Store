from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .serializers import UserSerializer
from .models import Users
import json

@csrf_exempt
@require_POST
def signin(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(request, username=username, password=password)

    if user:
        user_data = UserSerializer(user).data
        token = AccessToken.for_user(user)
        print(token)
        response =  JsonResponse({"message": "user authenticated", 'user': user_data}, status=200)
        response['Access-Control-Allow-Headers'] = 'http://localhost:5173'
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Expose-Headers'] = 'False'
        response.set_cookie(
            'token', 
            token,            
            httponly=True,
            secure=True,
            max_age=3600,  
            samesite='None',
        )
        return response
    return JsonResponse({"message": "invalid username or password", "user": None}, status=401)

@csrf_exempt
@require_POST
def signup(request):
    data = json.loads(request.body)
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    user = Users(email=email, username=username); 
    user.set_password(password);
    user.save()
    token = AccessToken.for_user(user)
    serialized = UserSerializer(user).data
    response =  JsonResponse({'message': 'User signed up successfully','user': serialized})
    response['Access-Control-Allow-Headers'] = 'http://localhost:5173'
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Expose-Headers'] = 'False'
    response.set_cookie(
        'token', 
        token,            
        httponly=True,
        secure=True,
        max_age=3600,  
        samesite='None',
    )


@csrf_exempt
@require_GET
def signout(request):
    print(request.is_authenticated)
    if request.is_authenticated:
        response = JsonResponse({'message': 'User signed out successfully'}) 
        response.delete_cookie('token')
        return response
    else:
        return JsonResponse({'message': 'User already signed out!'},status=200)

@csrf_exempt
@require_GET
def aboutme(request):
    if request.is_authenticated:
        user = request.user_data
        serialized_user = UserSerializer(user).data
        return JsonResponse(serialized_user)
    return HttpResponse("Unauthorized request.",status=401)
