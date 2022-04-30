var map;
var service;

$(document).ready(function () {
    initMap();
});

$(document).on("click", "#searchBtn", function () {
    GetLatlong();
});

function initMap() {
    var newDelhi = new google.maps.LatLng(28.6139, 77.209);

    map = new google.maps.Map(document.getElementById("map"), {
        center: newDelhi,
        zoom: 11,
    });

    var input = document.getElementById("searchBar");
    new google.maps.places.Autocomplete(input);
}

function GetLatlong() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("searchBar").value;

    geocoder.geocode(
        {
            address: address,
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();

                searchNearby(latitude, longitude);
            }
        }
    );
}

function searchNearby(latitude, longitude) {
    var userInputLoc = new google.maps.LatLng(latitude, longitude);

    map = new google.maps.Map(document.getElementById("map"), {
        center: userInputLoc,
        zoom: 15,
    });

    // create a request for coffee shops within a radius of 1000m around input location
    var request = {
        location: userInputLoc,
        radius: "1000",
        query: "coffee shop",
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, searchNearbyCallback);
}

function createMarker(place) {
    new google.maps.Marker({
        position: place.geometry.location,
        map: map,
    });
}

function searchNearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}
