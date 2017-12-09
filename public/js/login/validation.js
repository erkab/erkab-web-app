$(function () {

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function (element) {
            $(element)
                .closest('.form-group')
                .removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            if (element.prop('type') === 'radio') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod('strongPassword', function (value, element) {
        return this.optional(element)
            || value.length >= 6
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, 'At least 6 characters and 1 digit are required.');

    $("#login-form").validate({
        rules: {
            email: {
                required: true,
                email: true,

            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'An email address is required.',
                email: 'Invalid email address.',
            },
            password: {
                required: 'A password is required.'
            }
        }
        // submitHandler: function (form) { // for demo
        //     alert('valid form submitted'); // for demo
        //     return false; // for demo
        // }
    });
});