var express = require('express');
var router = express.Router();
var db_listUser= require('../../model/user')
var crypto = require("crypto");
var db_model = require('../../model/db_model')
var help = require('../../help/helper')
var sendMail = require('../../help/send_mail')

/* GET admin user page. */
router.route('/user')
    .get(function(req, res, next) {
        db_listUser.getUser()
            .then(function (listUser) {
                res.render('admin/user/listUser',{listUser:listUser});
            })
            .catch(function (error) {

            })
    })


/* GET admin create user page. */
router.route('/user/create')
    .get(function(req, res, next) {
        res.render('admin/user/addUser')
    })
    .post(function (req, res, next) {
        let data  =  req.body;
        let active = crypto.randomBytes(32).toString('hex');
        let date = new Date();
        let password = crypto.randomBytes(6).toString('hex');
        let Id_user = crypto.randomBytes(8).toString('hex');

        data.active  = active
        data.timeCreate = date.getTime()
        data.Id_user  = Id_user
        data.password = help.generateHash(password)

        db_listUser.searchUser(data.email).then(function (result) {
            if(result.length==0){
                db_model.insert('users',data).then(function (result) {
                    let link = help.fullUrl(req,'user/dangky/active/'+active)
                    let connent = "Password : " + password + "\n" +
                                  "Link Kich Hoạt Tài Khoản : " + link
                    let subject = "Email Kich Hoat Tai Khoan"

                    sendMail.send_Mail(data.email,connent,subject,function (error,result) {
                        console.log(error)
                    })
                    res.json({'active':'Email kích hoạt tài khoản đã được gửi.'});
                }).catch(function (error) {
                    res.json({'error':false});
                })
            }else {
                res.json({'error':'User đã tồn tại.'});
            }

        }).catch(function (error) {
            console.log(error)
            res.json({'active':false});
        })
    })


/* GET admin user detail page. */
router.route('/user/:id')
    .get( function(req, res, next) {
        let idUser = req.params.id
        db_listUser.searchUserID(idUser)
            .then(function (user) {
                delete user[0].password
                res.render('admin/user/userDetail',{user:user[0]});
            })
            .catch(function (error) {

            })
    })
    .delete(function (req, res, next) {
        let idUser = req.params.id
        db_listUser.searchUserID(idUser)
            .then(function (user) {
                db_listUser.deleteUserById(idUser)
                    .then(function (result) {
                        res.json(true)
                    })
                    .catch(function (error) {
                        res.json(false)
                    })
            })
            .catch(function (error) {
                res.json(false)
            })
    })
;
module.exports = router;
