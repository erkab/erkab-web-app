$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: '/profile/ride-history',
        async: true,
        dataType: 'json',
        success: function (rides) {
            rides = JSON.parse(rides);
            rides.forEach(function (ride, index) {
                var html =
                    "<tr class='clickable-row'" + ' data-toggle="modal" data-target="#myModal" data-backdrop="true"style="cursor:pointer">'
                    + '<th scope="row" class="text-center">' + (index + 1) + '</th>'
                    + '<td class="text-center">' + ride.userType + '</td>'
                    + '<td class="text-center">' + ride.meetingPoint + '</td>'
                    + '<td class="text-center">' + ride.date + '</td>'
                    + '<td class="text-center">' + ride.time + '</td>'
                    + '</tr>';
                $('#rideTable').append(html);
            });
            if (!rides.length) {
                var html = '<td colspan="5" class="text-center"><i class="fa fa-exclamation-circle"></i> No ride data available. </td>';
                $('#rideTable').append(html);
            }
        }
    });
});


function updateRideTable() {
    $.ajax({
        type: 'POST',
        url: '/profile/ride-history',
        async: true,
        dataType: 'json',
        success: function (rides) {
            var rowCount = $('#rideTable tr').length - 1;
            rides = JSON.parse(rides);
            if(!rowCount && rides.length) {
                $("#rideTable td").remove();
            }
            $('#rideCounter').text(rides.length);
            rides.slice(rowCount, rides.length).forEach(function (ride, index) {
                var html =
                    "<tr class='clickable-row'" + ' data-toggle="modal" data-target="#myModal" data-backdrop="true"style="cursor:pointer">'
                    + '<th scope="row" class="text-center">' + (rowCount + index + 1) + '</th>'
                    + '<td class="text-center">' + ride.userType + '</td>'
                    + '<td class="text-center">' + ride.meetingPoint + '</td>'
                    + '<td class="text-center">' + ride.date + '</td>'
                    + '<td class="text-center">' + ride.time + '</td>'
                    + '</tr>';
                $('#rideTable').append(html);
            });
        }
    });
}
setInterval(updateRideTable, 10 * 1000);