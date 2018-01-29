var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.route('/dangky')
    .get(function(req, res, next) {
        res.render('side/user/dangky');
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))
;


/*Edit password*/
router.get('/edit', function(req, res, next) {
    res.render('side/user/edit');
});

module.exports = router;