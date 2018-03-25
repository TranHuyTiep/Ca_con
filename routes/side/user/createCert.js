var express = require('express');
var router = express.Router();
var fs = require('fs');
var db_model = require('../../../model/db_model');
var db_User = require('../../../model/user');
var ecc = require('../../../help/ECC/ECC');
var sendMail = require('../../../help/send_mail');
var CryptoJS = require("crypto-js");
var help = require('../../../help/helper')
var config = require('../../../config/config')

/*Edit Don Hang*/
router.route('/cert/dangky')
    .get(function(req, res, next) {
        let user = req.user
        res.render('side/user/dangky_cert',{user:user});
    })
    .post(function (req,res,next) {
        let data = req.body
        let email = data.email
        let passPhrase = data.passphrase;
        let date = new Date()
        let timeCreate = date.getTime()
        var private_key  = CryptoJS.AES.decrypt(fs.readFileSync(config.root_dir+config.jwt.private_key).toString(),config.jwt.password);
        var priva = private_key.toString(CryptoJS.enc.Utf8);
        var public_key  = CryptoJS.AES.decrypt(fs.readFileSync(config.root_dir+config.jwt.public_key).toString(),config.jwt.password);
        var public = private_key.toString(CryptoJS.enc.Utf8);
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
        let user = req.user
        res.render('side/user/private_key',{user:user})
    })
    .post(function (req,res,next) {

    });

module.exports = router;
