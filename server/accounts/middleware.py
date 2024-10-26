from rest_framework_simplejwt.tokens import AccessToken
from .models import Users

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        

    def __call__(self, request):
        print("authenticating...")
        token = request.COOKIES.get('token') 
        if token:
            try:
                access_token = AccessToken(token)
                user_id = access_token.get("user_id")
                user = Users.objects.get(id=user_id)
                if user is not None:
                    request.user_data = user
                    request.is_authenticated = True 
                else:
                    request.is_authenticated = False
            except Exception as e:
                # Handle authentication errors (e.g., invalid token)
                request.is_authenticated = False
            
                pass
        else:
            request.is_authenticated = False
            
                        
        response = self.get_response(request)
        return response 