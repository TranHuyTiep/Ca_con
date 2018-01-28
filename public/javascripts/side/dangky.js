$(document).ready(function() {
    $('#inputEmail').on('input', function() {
        var input=$(this);
        var inputEmail=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    jQuery.validator.addMethod("checkPass", function(value, element) {
        // allow any non-whitespace characters as the host part
        return this.optional( element ) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test( value );
    }, 'Please enter a valid email address.');

    $('#form-post').validate({
        rules : {
            email : {
                required : true,
                email : true
            },
            password : {
                required : true,
                minlength : 8,
                checkPass : true
            },
            passwordVeri:{
                required:true,
                equalTo: "#inputPassword"
            },
            phone :{
                required    : true,
                minlength   :  17
            },
            firstName:{
                required:true
            },
            lastName:{
                required:true
            },
            gridCheck:{
                required:true
            }
        },
        messages : {
            email : {
                required : "Email không được để trống",
                email : "Email không đúng định dạng",
            },
            password : {
                required : "Mật khẩu không được để trống",
                minlength : "Mật khẩu phải có ít nhất 8 ký tự",
                strongPass : 'Mật khẩu tối thiểu 8 ký tự,1 chữ cái hoa,1 chữ cái thường,1 chữ số'
            },
            passwordVeri : {
                required : "Mật khẩu không được để trống",
                equalTo  : 'Mật khẩu không khớp'
            },
            phone : {

            },
            firstName : {
                required : "First Name không được để trống",
            },
            lastName : {
                required : "Last Name không được để trống",
            },
            gridCheck:{
                required : "Chấp nhân điều khoản của chúng tôi",
            }
        },
        // submitHandler : function (form) {
        //     //code in here
        // }
    })
});