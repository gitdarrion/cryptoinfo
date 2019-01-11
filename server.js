const express = require('express')
const path = require('path')
const app = express()
const router = express.Router() 

const mysql = require('mysql')
const sql = require('sql')
const config = require('./configs/sqlconfig')
const util = require('./util/util')
const date = require('./util/date')

const bitcoin = require('./controllers/bitcoin')
const bitcoincash = require('./controllers/bitcoincash')
const ethereum = require('./controllers/ethereum')
const ethereumclassic = require('./controllers/ethereumclassic')
const litecoin = require('./controllers/litecoin')
const coinmetrics = require('coinmetrics')

const currencySymbols = require('./macros/mappings').symbols
const currencyNames = require('./macros/mappings').currencies
const connect = require('./services/connect').connect
const btctable = require('./models/databases/tables/bitcoin').table 
const bchtable = require('./models/databases/tables/bitcoincash').table
const ethtable = require('./models/databases/tables/ethereum').table 
const etctable = require('./models/databases/tables/ethereumclassic').table 
const ltctable = require('./models/databases/tables/litecoin').table 
const tables = [btctable, bchtable, ethtable, etctable, ltctable]

var port = 3000
var startDate = 20180101
var endDate = 20181231

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'views/pages')))
app.use("/", router) 
app.use("/bitcoin", bitcoin)
app.use("/bitcoincash", bitcoincash)
app.use("/ethereum", ethereum)
app.use("/ethereumclassic", ethereumclassic)
app.use("/litecoin", litecoin) 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization")
    next()
})
app.listen(port, () => {
    console.log("Server running on port " + port)
})

router.get("/", (request, response)=>{
    response.redirect("/bitcoin")
})

function getAssetDataForTimeRange(asset, dataTypes, sd, ed, table) {
    // TODO: Get full date ranges for assets.
    const connection = connect()
    for (var i=0; i<dataTypes.length; i++) {
        const type = dataTypes[i]
        coinmetrics.getAssetDataForTimeRange(asset, type, sd, ed).then((results)=>{
            const currentResult = results['result']
            var query = getAssetDataForTimeRangeCallbackSupport(currentResult, asset, type)
            connection.query(query)
        })
    }
}

function getAssetDataForTimeRangeCallbackSupport(currentResult, asset, type) {
        if (type.slice(type.length-5) == '(usd)') {
            type = type.slice(0,type.length-5)
        }
        var currentResult1 = []
        var currentResult2 = []
        for(var j=0; j<currentResult.length; j++) {
            currentResult1.push("(" + currentResult[j][0] + ", " + currentResult[j][1] + ")")
            
        }
        var query1 = "INSERT INTO " + currencyNames[asset] + " (" + "date" + ", " + type + ") " + "VALUES" + " " + currentResult1.toString() + " ON DUPLICATE KEY UPDATE date=values(date), " + type + "=values(" + type + ")"
        return query1
}

function createTable(tableToCreate) {
    const connection = connect()
    var query = tableToCreate.create().toQuery().text // TODO: Library needs an "if not exists" option.
    query = query.slice(0,12) + " IF NOT EXISTS " + query.slice(13)
    query = query.slice(0,query.length-1) + ",\n PRIMARY KEY (date))"
    connection.query(query)
}

function exec(tablesToUpdate) {
    const connection = connect()
    for (var j=0; j<tablesToUpdate.length; j++) {
        table = tablesToUpdate[j]
        var todaysDateUnix = Math.round((new Date()).getTime() / 1000)
        var queryMaxDate = "SELECT * FROM " + table._name + " WHERE date=(SELECT max(date) FROM " + table._name + ")"
        connection.query(queryMaxDate)
    }
}

function init() {
    const connection = connect()
    for (var i=0; i<tables.length; i++) {
        var queryIfTableExists = "SELECT count(*)" + " FROM " + tables[i]._name
        var table = tables[i]
        var tablesToUpdate = tables
        connection.query(queryIfTableExists, (error, results, fields)=>{
            if (!error) {
                exec(tablesToUpdate)
                return
            }
        })
        
        const asset = currencySymbols[table._name]
        var sd = date.parse(startDate)
        var ed = date.parse(endDate)
        var dataTypes = []
        createTable(table)
        
        coinmetrics.getAvailableDataTypesForAsset(asset, (results)=>{
            dataTypes = results['result']
            getAssetDataForTimeRange(asset, dataTypes, sd, ed, table) 
            return
        })
    }   
}

init()
