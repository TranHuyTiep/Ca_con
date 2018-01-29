var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.route('/dangky')
    .get(function(req, res, next) {
        res.render('side/user/dangky');
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }))
;


/*Edit password*/
router.get('/edit', function(req, res, next) {
    res.render('side/user/edit');
});

module.exports = router;