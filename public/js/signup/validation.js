$(function() {

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function(element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function(element) {
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

    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element)
            || value.length >= 6
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, 'At least 6 characters and 1 digit are required.');

    $("#register-form").validate({
        rules: {
            email: {
                required: true,
                email: true,

            },
            password: {
                required: true,
                strongPassword: true
            },
            password2: {
                required: true,
                equalTo: '#password'
            },
            firstName: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            lastName: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            collegeId:{
                required: true,
                number: true,
                minlength:8,
                maxlength:8
            },
            mobileNum:{
                required:true,
                number:true,
                minlength:11,
                maxlength:11
            },
            // gender:{
            //     required:true
            // }

        },
        messages: {
            email: {
                required: 'An email address is required.',
                email: 'Invalid email address.',
            },
            mobileNum: {
                required: 'A mobile number is required.',
                number: 'Only numerical values are allowed (0-9).'
            },
            collegeId: {
                required: 'You must enter your college ID.',
                number: 'Only numerical values are allowed (0-9).'
            },
            firstName: {
                required: 'Please enter your first name.'
            },
            lastName: {
                required: 'Please enter your last name.'
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