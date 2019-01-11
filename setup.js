const mysql = require('mysql')
const databaseName = "crypto"

function createDatabase() {
    initcon = mysql.createConnection({
        host: "localhost",
        dialect: "mysql", 
        port: 3306,
        user: "root",
        password: "password"
    })
    queryCreateDatabase = "CREATE DATABASE IF NOT EXISTS " + databaseName
    initcon.query(queryCreateDatabase, (error, results, fields)=>{
        if (error) {
            console.log("FAILED TO CREATE DATABASE " + databaseName)
            process.exit(1)
        }
        process.exit(0)
    })
}

createDatabase()