$(document).ready(function () {
    $("#save-cancel-btn-group").hide();
    $(".profileInput").prop("readonly", true).addClass("readonly-input");
    $("#passwordField").hide();
    $("#changePass-btn-group").hide();
    $("#nameField").hide();

    $("#editBtn").click(function () {
        $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        $("#editBtn").hide();
        $("#save-cancel-btn-group").show();
        $("#profileH3").html("<i class=\"fa fa-pencil-square-o\"></i> Edit Profile");
        $("#fullNameField").hide();
        $("#nameField").show();
        $(".profileInput").prop("readonly", false).removeClass("readonly-input");
        $("#changePassLink").hide();
    });

    $("#saveBtn").click(function () {
        $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        $(".profileInput").prop("readonly", true).addClass("readonly-input");
        $("#save-cancel-btn-group").hide();
        $("#editBtn").show();
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $("#passwordField").hide();
        $("#nameField").hide();
        $("#fullNameField").show();
        $("#changePassLink").show();
    });

    $("#cancelBtn").click(function () {
        $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        $(".profileInput").prop("readonly", true).addClass("readonly-input");
        $("#save-cancel-btn-group").hide();
        $("#editBtn").show();
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $("#passwordField").hide();
        $("#nameField").hide();
        $("#fullNameField").show();
        $("#changePassLink").show();
        $('.help-block').hide();
    });

    $("#changePassLink").click(function () {
        $("#mainForm").hide(function () {
            $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        });
        $("#profileH3").html("<i class=\"fa fa-lock\"></i> Change Password");
        $("#passwordField").show();
        $("#changePass-btn-group").show();
    });

    $("#confirmPassBtn").click(function () {
        $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $("#mainForm").show();
        $("#passwordField").hide();
        $("#changePass-btn-group").hide();
    });

    $("#cancelPassBtn").click(function () {
        $("html, body").animate({scrollTop: $("#profileH3").offset().top - 86}, "slow");
        $("#profileH3").html("<i class=\"fa fa-user-circle-o\"></i> Profile");
        $("#mainForm").show();
        $("#passwordField").hide();
        $("#changePass-btn-group").hide();
        $('.help-block').hide();
    })

})