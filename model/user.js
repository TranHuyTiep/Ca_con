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

/**
 * Get all data in table
 * @param table : string
 * @returns {Promise}
 */
function searchUserID (Id_user) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            let query = "SELECT * FROM users WHERE Id_user = ? "
            connection.query(query,(Id_user),function (error,result) {
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

db_user.prototype.searchUserID = async function (Id_user) {
    try{
        let result = await searchUserID(Id_user);
        return result
    }catch(error) {
        console.log(error)
    }
}

/**
 * update thong tin user
 * @param table
 * @param user_id
 * @param data
 * @returns {Promise}
 */
function updateUser(user_id,data) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            var query = "UPDATE users SET ? WHERE Id_user = ?";
            connection.query(query,[data,user_id],function (error,result) {
                if (error){
                    reject(error)
                }else {
                    resolve(result)
                    connection.release();
                }
            })
        })
    })
}

db_user.prototype.updateUser = async function (user_id,data) {
    try{
        let result = await updateUser(user_id,data);
        return result
    }catch(error) {
        console.log(error)
    }
}



/**
 * update thong tin user
 * @param table
 * @param user_id
 * @param data
 * @returns {Promise}
 */
function getUser() {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            var query = "SELECT " +
                "Id_user,email,phone,firstName,lastName,company,country,states,content,webAddress,active " +
                "FROM users " +
                "ORDER BY active,timeCreate DESC ";
            connection.query(query,function (error,result) {
                if (error){
                    reject(error)
                }else {
                    resolve(result)
                    connection.release();
                }
            })
        })
    })
}

db_user.prototype.getUser = async function () {
    try{
        let result = await getUser();
        return result
    }catch(error) {
        console.log(error)
    }
}



/**
 * update thong tin user
 * @param table
 * @param user_id
 * @param data
 * @returns {Promise}
 */
function deleteUserById(IdUser) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            var query = "DELETE FROM users WHERE Id_user=?"
            connection.query(query,IdUser,function (error,result) {
                if (error){
                    reject(error)
                }else {
                    resolve(result)
                    connection.release();
                }
            })
        })
    })
}

db_user.prototype.deleteUserById = async function (IdUser) {
    try{
        let result = await deleteUserById(IdUser);
        return result
    }catch(error) {
        console.log(error)
    }
}


var model = new db_user()

// model.searchUser('tranhuytiep95@gmail.com').then(function (e) {
//     console.log(e)
// })
module.exports = model