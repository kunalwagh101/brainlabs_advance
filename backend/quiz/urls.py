from django.urls import path
from .views import get_country, check_answer

urlpatterns = [
    path('country/', get_country, name='get-country'),
    path('check/',   check_answer, name='check-answer'),
]
