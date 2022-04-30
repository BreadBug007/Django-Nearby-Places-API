from django.shortcuts import render
from django.views import View

from MapSearch.settings import MAPS_API_KEY


class GetNearbyPlaces(View):

    def get(self, request):

        return render(request, 'nearby_places_base.html', {
            'api_key': MAPS_API_KEY
        })
