const mysql = require('mysql')
const config = require('../configs/sqlconfig')
function connect() {
    connection = mysql.createConnection(config)
    connection.connect(function(error){
        if (error) {
            console.error(error.stack)
            return
        }
        console.log("Connected database 'crypto' on port " + config.port)  
    })
    return connection
}

module.exports = {
    connect: connect
}