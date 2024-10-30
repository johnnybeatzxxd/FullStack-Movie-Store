from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid  # Add this import

# Create your models here.
class Users(AbstractUser):
    id = models.UUIDField(unique=True, primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=250, unique=True, blank=False)
    email = models.EmailField(max_length=250, unique=True, blank=False)
    password = models.CharField(max_length=250, blank=False)

