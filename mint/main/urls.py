from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('store', views.store, name='store')
]
