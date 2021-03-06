var pool = require('../config/database')

function db_listCert() {}
/**
 * Get all data in table
 * @param table : string
 * @returns {Promise}
 */
function getCertUser (userId) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            let query = "SELECT * FROM listCert WHERE Id_user = ? "
            connection.query(query,(userId),function (error,result) {
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

db_listCert.prototype.getCertUser = async function (userId) {
    try{
        let result = await getCertUser(userId);
        return result
    }catch(error) {
        console.log(error)
    }
}

/**
 * Get cert Popular
 * @param table : string
 * @returns {Promise}
 */
function getListPopularCert () {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            let query = "SELECT * FROM listCert ORDER BY timeCreate DESC"
            connection.query(query,function (error,result) {
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

db_listCert.prototype.getListPopularCert = async function () {
    try{
        let result = await getListPopularCert();
        return result
    }catch(error) {
        console.log(error)
    }
}


/**
 * get cert for id
 * @param Id
 * @returns {Promise}
 */
function getCertById (id) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            let query = "SELECT * FROM listCert WHERE Identity = ? "
            connection.query(query,(id),function (error,result) {
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

db_listCert.prototype.getCertById = async function (id) {
    try{
        let result = await getCertById(id);
        return result
    }catch(error) {
        console.log(error)
    }
}


/**
 * update thong tin Cert
 * @param table
 * @param user_id
 * @param data
 * @returns {Promise}
 */
function updateCert(Identity,data) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            var query = "UPDATE listCert SET ? WHERE Identity = ?";
            connection.query(query,[data,Identity],function (error,result) {
                if (error){
                    reject(error)
                }else {
                    resolve(error,result)
                    connection.release();
                }
            })
        })
    })
}

db_listCert.prototype.updateCert = async function (Identity,data) {
    try{
        let result = await updateCert(Identity,data);
        return result
    }catch(error) {
        console.log(error)
    }
}


var model = new db_listCert()

// model.getCertById('192.168.109.25').then(function (e) {
//     console.log(e)
// })
module.exports = model