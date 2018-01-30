var home = require('./routes/side/home');
var index = require('./routes/index');
var users = require('./routes/users');
var content = require('./routes/side/content')
var login   = require('./routes/side/user/login')
var donhang   = require('./routes/side/user/donhang')
var user_home = require('./routes/side/user/home')

var array_index   = [index,home]
var array_user    = [users,login,donhang,user_home]
var array_content = [content]

module.exports.index    = array_index
module.exports.user     = array_user
module.exports.content  = array_content