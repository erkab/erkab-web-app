$(document).ready(function() {
    $("#save-cancel-btn-group").hide();
    $(".profileInput").prop("readonly",true);
    $(".profileInput").addClass("readonly-input");
    $("#passwordField").hide();

    $("#editBtn").click(function() {
        $(".profileInput").prop("readonly",false);
        $("#editBtn").hide();
        $("#save-cancel-btn-group").show();
        $("#profileH3").html("<i class=\"fa fa-pencil-square-o\"></i> Edit Profile");
        $(".profileInput").removeClass("readonly-input");
        $("#passwordField").show();
    })

    $("#saveBtn").click(function() {
        $(".profileInput").prop("readonly",true);
        $("#save-cancel-btn-group").hide();
        $("#editBtn").show();
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $(".profileInput").addClass("readonly-input");
        $("#passwordField").hide();
    })

    $("#cancelBtn").click(function() {
        $(".profileInput").prop("readonly",true);
        $("#save-cancel-btn-group").hide();
        $("#editBtn").show();
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $(".profileInput").addClass("readonly-input");
        $("#passwordField").hide();
    })
})