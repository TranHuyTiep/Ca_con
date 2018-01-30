var express = require('express');
var router = express.Router();
var passport = require('passport');
var db_User = require('../../../model/user')
var db_model = require('../../../model/db_model')
var help = require('../../../help/helper')

/* GET home page. */
router.route('/dangky')
    .get(help.check_login,function(req, res, next) {
        res.render('side/user/dangky');
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/user/login',
        failureRedirect : '/user/dangky',
        failureFlash : true
    }))
;


/*Edit password*/
router.get('/edit', function(req, res, next) {
    res.render('side/user/edit');
});

router.route('/login')
    .get(function(req, res, next) {
        res.render('side/user/login');
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/user/login',
        failureRedirect : '/user/dangky',
        failureFlash : true
    }))
;

router.route('/dangky/active/:id')
    .get(function (req,res,next) {
        var active = req.params.id
        db_User.searchUserActive(active).then(function (result) {
            if(result.length!=0){
                db_model.update('users',result[0].id,{active:1}).then(
                    res.redirect('/user/login')
                ).catch(function (error) {
                    res.redirect('/user/login')
                    console.log(error)
                })
            }else {
                res.redirect('/user/login')
            }
        })

    })

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('user/login');
});


module.exports = router;