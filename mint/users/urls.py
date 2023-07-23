from django.urls import path, include
from . import views
from users.views import Register, personal_account

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('register/', Register.as_view(), name='register'),
    path('', personal_account, name='personal_account'),
    path('report/', views.report, name='report'),
]