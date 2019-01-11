const sql = require('sql')
sql.setDialect('mysql')
var table = sql.define({
    name: 'bitcoin',
    columns: [
        {
                name: "date",
                dataType: "BIGINT"
        },
        {
                name: "activeaddresses",
                dataType: "BIGINT"
        },
        {
                name: "adjustedtxvolume",
                dataType: "BIGINT"
        },
        {
                name: "averagedifficulty",
                dataType: "BIGINT"
        },
        {
                name: "blockcount",
                dataType: "BIGINT"
        },
        {
                name: "blocksize",
                dataType: "BIGINT"
        },
        {
                name: "exchangevolume",
                dataType: "BIGINT"
        },
        {
                name: "fees",
                dataType: "BIGINT"
        },
        {
                name: "generatedcoins",
                dataType: "BIGINT"
        },
        {
                name: "marketcap", 
                dataType: "BIGINT"
        },
        {
                name: "medianfee",
                dataType: "BIGINT"
        },
        {
                name: "mediantxvalue",
                dataType: "BIGINT"
        },
        {
                name: "paymentcount",
                dataType: "BIGINT"
        },
        {
                name: "price",
                dataType: "BIGINT"
        },
        {
                name: "realizedcap",
                dataType: "BIGINT"
        },
        {
                name: "txcount",
                dataType: "BIGINT"
        },
        {
                name: "txvolume", 
                dataType: "BIGINT"
        }]
})

columns = table.columns
columnNames = []
for (var i=0; i<columns.length; i++) {
        columnNames.push(columns[i])
}

module.exports = {
        table: table,
        columns: columnNames
}