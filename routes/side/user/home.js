var express = require('express');
var router = express.Router();
var passport = require('passport');
var db_User = require('../../../model/listCert')
var db_model = require('../../../model/db_model')
var help = require('../../../help/helper')

/*Edit password*/
router.get('/home',help.isLoggedIn, function(req, res, next) {
    res.render('side/user/home',{user:req.user});
});

module.exports = router;