const sql = require('sql')
sql.setDialect('mysql')
var table = sql.define({
    name: 'ethereumclassic',
    columns: [
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
            name: "txcount",
            dataType: "BIGINT"
        },
        {
            name: "txvolume",
            dataType: "BIGINT"
        },
        { name: 'date', dataType: 'BIGINT'}
    ]
})

module.exports = {
    table: table
}