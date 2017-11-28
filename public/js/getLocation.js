var map, infoWindow, myPosition;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.2001, lng: 29.9187},
        zoom: 11,
        gestureHandling: 'greedy' //Pan on mobile using 1 finger.

    });
    infoWindow = new google.maps.InfoWindow();


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            myPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            marker = new google.maps.Marker({
                position: myPosition,
                map: map
            });

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