
var map, infoWindow, currentPosition, markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.2001, lng: 29.9187},
        zoom: 11,
        gestureHandling: 'greedy' //Pan on mobile using 1 finger.

    });

    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            window.currentPositionMarker = new google.maps.Marker({
                position: new google.maps.LatLng(currentPosition),
                map: window.location.pathname === '/request' ? null : map
            });
            map.setCenter(currentPosition);
            map.setZoom(14);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function clearMarkers() {
    markers.forEach(function (marker) {
        marker.setMap(null);
    });
    markers = [];
}


function addMarker (coords) {
    markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(coords[1], coords[0]),
        map: null
    }));
}

function setMarker (index, map) {
    if(index != null) {
        markers[index].setMap(map);
    }
}