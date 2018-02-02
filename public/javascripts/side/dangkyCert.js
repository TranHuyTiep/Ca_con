$(document).ready(function() {
    jQuery.validator.addMethod("checkPass", function(value, element) {
        // allow any non-whitespace characters as the host part
        return this.optional( element ) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test( value );
    }, 'Please enter a valid password.');

    $('#form-post').validate({
        rules : {
            passphrase : {
                required : true,
                minlength : 8,
                checkPass : true
            },
            verifyPassphrase:{
                required:true,
                equalTo: "#inputPassphrase"
            },
            r:{
                required:true
            },
            R:{
                required:true
            },
            identity:{
                required : true
            }

        },
        messages : {

            passphrase : {
                required : "Mật khẩu không được để trống",
                minlength : "Mật khẩu phải có ít nhất 8 ký tự",
                strongPass : 'Mật khẩu tối thiểu 8 ký tự,1 chữ cái hoa,1 chữ cái thường,1 chữ số'
            },
            verifyPassphrase : {
                required : "Mật khẩu không được để trống",
                equalTo  : 'Mật khẩu không khớp'
            },
            r : {
                required : "r chưa được khởi tạo.",
            },
            R : {
                required : "R chưa được khởi tạo.Error.",
            },

        },
        submitHandler: function(form) {
            // do other things for a valid form
            $('.send button').attr('data-toggle','modal')
            $('.send button').click()
            $('.send button').removeAttr( "data-toggle" )
        },
        invalidHandler: function(event, validator) {
            //code in here
            var errors = validator.numberOfInvalids();
            if(errors){
                $('.send button').removeAttr( "data-toggle" )
            }else {
                $('.send button').attr('data-toggle','modal')
            }
        }

    })

});