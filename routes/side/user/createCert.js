var express = require('express');
var router = express.Router();
var fs = require('fs');
var db_model = require('../../../model/db_model');
var db_User = require('../../../model/user');
var ecc = require('../../../help/ECC/ECC');
var sendMail = require('../../../help/send_mail');
var CryptoJS = require("crypto-js");
var help = require('../../../help/helper')

/*Edit Don Hang*/
router.route('/cert/dangky')
    .get(function(req, res, next) {
        let Id_user = req.user
        db_User.searchUserID(Id_user).then(function (result) {
            res.render('side/user/dangky_cert',{Id_user:result[0].Id_user,email:result[0].email});
        })
        // res.render('side/user/dangky_cert')
    })
    .post(function (req,res,next) {
        let data = req.body
        let email = data.email
        let passPhrase = data.passphrase;
        let date = new Date()
        let timeCreate = date.getTime()
        var priva = '24759591462846120382401544067961915304144449666759304319461423667541017549863'
        var public ='483660952981732867406743740858667548923206169871659386247570893174275333083890'
        let cert = ecc.create_cert(data.Identity,data.R,priva,public)
        data.cert = JSON.stringify(cert)
        data.timeCreate = timeCreate
        delete data.email;
        delete data.passphrase;
        cert.time = data.timeValid;

        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(cert), passPhrase);

        db_model.insert('list_ca',data).then(function (result) {
            try {
                fs.writeFile(data.Identity+'.text',ciphertext,function (error,result) {
                    if(error==null){
                        var text =  'Cert ECC';
                        sendMail.send_file(email,'Cert ECC',data.Identity+'.text',text,function (error,response) {
                            if (response){
                                fs.unlink(data.Identity+'.text', function (error,result) {
                                })
                            }else {
                                console.log(error)
                            }
                        });
                        res.json(true)
                    }else {
                        console.log(error)
                    }

                })
            }catch(err) {
                console.log(error)
            }

        }).catch(function (error) {
            res.json(false)
        })
    });


router.route('/privateKey')
    .get(help.isLoggedIn,function(req, res, next) {
        res.render('side/user/private_key')
    })
    .post(function (req,res,next) {

    });

module.exports = router;

//
// //
// //
// // // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', '1Aa23456');
//
// // Decrypt
// var r  = CryptoJS.AES.decrypt('U2FsdGVkX19UKp44TK1ndKz9CQGh2Uwwd0WBkLkdUxhFs6yjGjOakflIq64rNOb5LXfThEDxbwgab6uN5yWmJppCU2Tn8O9cZ+zyVhJH5iQ81/yF6zhypFxosF7mIlnI', 'Aa123456');
// var plaintext = r.toString(CryptoJS.enc.Utf8);
// var cert  = CryptoJS.AES.decrypt('U2FsdGVkX1/FwwG/qNIxdnLhkBBQiPoSiGKgtY/zdf6vz1YeLWfBTg6iTKCPpah0G+1EqT9n3hxBsxEJB3sLQ1dHA7TDtyIUaZlqDAUlMYvYmobrAlQzo+0fbCbP0E9IRmLmnzPWsMqCiRVXW3K9MTXbzOzcj/I9R0zkqUOpM98huB7NbV0Cj+kj3irWep7baSUD4KGWWl0WKzF8aIjOjpxc92+1uUKs+iayy+JDlNwdH8+aho5J/JTvNsgYR5wD07r+73KPrt6H2uvYVmBi5biR1K0Rwnoroc43zp//uIM3yi5c3EORUyPR6TO/SwvSP0D8JrasZkQ2Rzrv+bXpe8/dldZSgCgB3FFLqcD9JbI4veyByUc0Z6sCWoPv+rk3HEKG3sUUO67wsrv4oyPkGWBRCs1tmFhw6e6RYZtRsIU=', 'Aa123456');
// var plaintext_cert = cert.toString(CryptoJS.enc.Utf8);
//
// var key = ecc.create_key_to_cert(plaintext,JSON.parse(plaintext_cert))
// console.log(key);