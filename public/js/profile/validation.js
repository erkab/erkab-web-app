
$(function () {
    $("#profileForm" ).validate({
        rules: {
            email: {
                required: true,
                email: true,
                remote: {
                    url: "check-email.php",
                    type: "post",
                    data: {
                        username: function() {
                            return $("#username").val();
                        }
                    }
                }
            },
            newPassword: {
            }
        }
    });
});

$("#profileForm").validate({
    rules: {
        email: {
            required: true,
            email: true,
            remote: {
                url: "check-email.php",
                type: "post",
                data: {
                    username: function() {
                        return $( "#username" ).val();
                    }
                }
            }
        },
        newPassword: {
        }
    }
});