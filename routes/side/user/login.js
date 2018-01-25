var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dangky', function(req, res, next) {
    res.render('side/user/dangky');
});

/*Edit password*/
router.get('/edit', function(req, res, next) {
    res.render('side/user/edit');
});

module.exports = router;