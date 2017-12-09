//
// $(function () {
//     $("#profileForm" ).validate({
//         rules: {
//             email: {
//                 required: true,
//                 email: true,
//                 remote: {
//                     url: "check-email.php",
//                     type: "post",
//                     data: {
//                         username: function() {
//                             return $("#username").val();
//                         }
//                     }
//                 }
//             },
//             newPassword: {
//             }
//         }
//     });
// });
//
// $("#profileForm").validate({
//     rules: {
//         email: {
//             required: true,
//             email: true,
//             remote: {
//                 url: "check-email.php",
//                 type: "post",
//                 data: {
//                     username: function() {
//                         return $( "#username" ).val();
//                     }
//                 }
//             }
//         },
//         newPassword: {
//         }
//     }
// });

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

    $("#edit-form").validate({
        rules: {
            email: {
                required: true,
                email: true,

            },
            newPassword: {
                required: true,
                strongPassword: true
            },
            confirmPassword: {
                required: true,
                equalTo: '#newPassword',
                strongPassword: true
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
            mobileNum: {
                required: true,
                number: true,
                minlength: 11,
                maxlength: 11
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
            newPassword: {
                required: 'A password is required.'
            },

            confirmPassword: {
                required: 'A password is required.',
                equalTo: 'Passwords do not match.'
            }
        }
    });
});