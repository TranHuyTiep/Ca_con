var pool = require('../config/database')

function db_listCA() {}
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

db_listCA.prototype.getCertUser = async function (userId) {
    try{
        let result = await getCertUser(userId);
        return result
    }catch(error) {
        console.log(error)
    }
}

var model = new db_listCA()

// model.getCertUser('d17325feb227cfa7').then(function (e) {
//     console.log(e)
// })
// var date = new Date()
// date.setTime(1517655569838)
// console.log(date.toLocaleString())
module.exports = model