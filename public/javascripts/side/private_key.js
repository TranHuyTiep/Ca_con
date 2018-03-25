$(document).ready(function () {
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
        let privateKey = $('#Key').val()
        let key = $('#inputPassphrase').val()
        var encrypted = CryptoJS.AES.encrypt(privateKey, key)
        var url = makeTextFile(encrypted.toString())
        $('#save_button1').attr("href", url );
        $('#save_button1').click()
    })

})