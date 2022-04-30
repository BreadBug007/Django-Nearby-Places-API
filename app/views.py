from django.shortcuts import render
from django.views import View


class GetNearbyPlaces(View):

    def get(self, request):
        return render(request, 'recommendations_base.html', {})
