var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/dangky')
    .get(function(req, res, next) {
        res.render('side/user/dangky');
    })
    .post(function (req,res,next) {
        var data_req = req.body

    })
;


/*Edit password*/
router.get('/edit', function(req, res, next) {
    res.render('side/user/edit');
});

module.exports = router;