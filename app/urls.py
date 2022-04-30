from django.urls import path
from app import views

urlpatterns = [
    path(
        '',
        views.GetNearbyPlaces.as_view(),
        name="get_nearby_places"
    ),
]
