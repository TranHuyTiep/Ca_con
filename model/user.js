var pool = require('../config/database')

function db_user() {}
/**
 * Get all data in table
 * @param table : string
 * @returns {Promise}
 */
function searchUser (email) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            let query = "SELECT * FROM users WHERE email = ? "
            connection.query(query,(email),function (error,result) {
                if (error){
                    reject(error)
                }else {
                    resolve(result)
                    connection.release();
                }
            })
        });
    })
}

db_user.prototype.searchUser = async function (email) {
    try{
        let result = await searchUser(email);
        return result
    }catch(error) {
        console.log(error)
    }
}

/**
 * search user active
 * @param active
 * @returns {Promise}
 */
function searchUserActive (active) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            let query = "SELECT * FROM users WHERE active = ? "
            connection.query(query,(active),function (error,result) {
                if (error){
                    reject(error)
                }else {
                    resolve(result)
                    connection.release();
                }
            })
        });
    })
}

db_user.prototype.searchUserActive = async function (active) {
    try{
        let result = await searchUserActive(active);
        return result
    }catch(error) {
        console.log(error)
    }
}



var model = new db_user()

// model.searchUser('tranhuytiep95@gmail.com').then(function (e) {
//     console.log(e.length)
// })
module.exports = model