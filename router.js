var home = require('./routes/side/home');
var index = require('./routes/index');
var users = require('./routes/users');
var content = require('./routes/side/content')
var login   = require('./routes/side/user/login')
var donhang   = require('./routes/side/user/donhang')
var user_home = require('./routes/side/user/home')
var createCert   = require('./routes/side/user/createCert')
var admin_home   = require('./routes/admin/home')
var admin_cert_detail = require('./routes/admin/cert')
var admin_cert_user = require('./routes/admin/user')

var array_index   = [home]
var array_user    = [login,donhang,user_home,createCert]
var array_content = [content]
var array_admin = [admin_home,admin_cert_detail,admin_cert_user]

module.exports.index    = array_index
module.exports.user     = array_user
module.exports.content  = array_content
module.exports.admin  = array_admin