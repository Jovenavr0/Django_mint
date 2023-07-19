from django.urls import path, include
from . import views
from users.views import Register

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('register/', Register.as_view(), name='register'),
    path('', views.personal_account, name='personal_account'),
]