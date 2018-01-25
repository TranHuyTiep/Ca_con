var express = require('express');
var router = express.Router();

/*Edit Don Hang*/
router.get('/donhang', function(req, res, next) {
    res.render('side/user/donhang');
});

module.exports = router;