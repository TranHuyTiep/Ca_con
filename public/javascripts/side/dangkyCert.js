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
            },
            cert:{
                required:true
            },

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
            cert: {
                required : "Cert không được để trống",
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

    var textFile = null
    function makeTextFile(text) {
        var data = new Blob([text], {type: 'text/plain'});

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        var textFile = window.URL.createObjectURL(data);

        return textFile;
    }

    $('#save_button1').click(function () {
        let r = $('#r').val()
        let key = $('#inputPassphrase').val()
        var encrypted = CryptoJS.AES.encrypt(r, key)
        var url = makeTextFile(encrypted.toString())
        $('#save_button1').attr("href", url );
        $('#save_button1').click()
    })

    $('#save_button2').click(function () {
        let R = $('#R').val()
        var url = makeTextFile(R)
        $('#save_button2').attr("href", url );
        $('#save_button2').click()
    })


});