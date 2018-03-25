var express = require('express');
var router = express.Router();
var passport = require('passport');
var db_User = require('../../../model/user')
var db_model = require('../../../model/db_model')
var help = require('../../../help/helper')

/* GET home page. */
router.route('/dangky')
    .get(function(req, res, next) {
        var dataRes = req.query
        var message = null;
        if(dataRes.error == '404'){
            message = "No active found"
        }
        res.render('side/user/dangky',{ message: req.flash('exist'),error:message});
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/user/login',
        failureRedirect : '/user/dangky',
        failureFlash : true
    }))
;


/*Edit thong tin*/
router.route('/edit')
    .get(help.isLoggedIn, function(req, res, next) {
        res.render('side/user/edit',{user:req.user});
    })
    .post(function (req,res,next) {
        let data = req.body
        let Id_user = req.user.Id_user
        db_User.updateUser(Id_user,data).then(function (result) {
            res.redirect('home');
        }).catch(function (error) {

        })
    })
;

router.route('/login')
    .get(function(req, res, next) {
        res.render('side/user/login',{ message: req.flash('active') });
    })
    .post(passport.authenticate('local-login', {
        successRedirect : '/user/home',
        failureRedirect : '/user/login',
        failureFlash : true
    }))
;

router.route('/dangky/active/:id')
    .get(function (req,res,next) {
        var active = req.params.id
        db_User.searchUserActive(active).then(function (result) {
            console.log(result)
            if(result.length!=0){
                db_model.update('users',result[0].id,{active:1}).then(
                    res.redirect('/user/login')
                ).catch(function (error) {
                    res.redirect('/user/login')
                    console.log(error)
                })
            }else {
                req.flash('active', 'No user found.')
                res.redirect('/user/dangky?error=404')
            }
        })

    })


/*Edit password*/
router.route('/edit/password')
    .get(help.isLoggedIn, function(req, res, next) {
        var dataRes = req.query
        var message = null;
        if(dataRes.error == '404'){
            message = "No active found"
        }
        res.render('side/user/editPassword',{user:req.user,error:message});
    })
    .post(function (req,res,next) {
        let data = req.body
        let Id_user = req.user.Id_user
        if(data.newPassword==data.passwordVeri){
            data.password = help.generateHash(data.newPassword)
            delete data.passwordVeri
            delete data.newPassword
            db_User.searchUserID(Id_user).then(function (result) {
                if(result.password!= data.password){
                    db_User.updateUser(Id_user,data).then(function (result) {
                        res.redirect('/user/logout');
                    }).catch(function (error) {
                        res.redirect('/edit/password?error=true');
                    })
                }
            })
        }
    })
;

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/user/login');
});


module.exports = router;