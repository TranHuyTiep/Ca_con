var express = require('express');
var router = express.Router();
var ecc = require('../../../help/ECC/ECC')
/*Edit Don Hang*/
router.get('/donhang', function(req, res, next) {
    res.render('side/user/donhang');
});
module.exports = router;