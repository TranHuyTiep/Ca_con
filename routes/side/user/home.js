var express = require('express');
var router = express.Router();
var passport = require('passport');
var db_User = require('../../../model/user')
var db_model = require('../../../model/db_model')
var help = require('../../../help/helper')

/*Edit password*/
router.get('/home', function(req, res, next) {
    let Id_user = req.user
    db_User.searchUserID(Id_user).then(function (result) {
        delete result[0].password
        delete result[0].active
        delete result[0].Id_user
        delete result[0].id
        delete result[0].content
        res.render('side/user/home',{data:result[0]});
    })
});

module.exports = router;