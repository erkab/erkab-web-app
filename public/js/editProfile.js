$(document).ready(function () {
    $("#save-cancel-btn-group").hide();
    $(".profileInput").prop("readonly", true);
    $(".profileInput").addClass("readonly-input");
    $("#passwordField").hide();
    $("#nameField").hide();

    $("#editBtn").click(function () {
        $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        $(".profileInput").prop("readonly", false);
        $("#editBtn").hide();
        $("#save-cancel-btn-group").show();
        $("#profileH3").html("<i class=\"fa fa-pencil-square-o\"></i> Edit Profile");
        $(".profileInput").removeClass("readonly-input");
        $("#passwordField").show();
        $("#nameField").show();
        $("#fullNameField").hide();
    })

    $("#saveBtn").click(function () {
        $(".profileInput").prop("readonly", true);
        $("#save-cancel-btn-group").hide();
        $("#editBtn").show();
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $(".profileInput").addClass("readonly-input");
        $("#passwordField").hide();
        $("#nameField").hide();
        $("#fullNameField").show();
    })

    $("#cancelBtn").click(function () {
        $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        $(".profileInput").prop("readonly", true);
        $("#save-cancel-btn-group").hide();
        $("#editBtn").show();
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $(".profileInput").addClass("readonly-input");
        $("#passwordField").hide();
        $("#nameField").hide();
        $("#fullNameField").show();
    })
})