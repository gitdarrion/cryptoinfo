const express = require('express')
const router = express.Router() 
const mysql = require('mysql')
const config = require('../configs/sqlconfig')
const coinmetrics = require('coinmetrics')
const util = require('../util/date')
const btctable = require('../models/databases/tables/bitcoin').table
const databaseName = require('../macros/variables').databaseName
const connect = require('../services/connect').connect
const jsoncsv = require('json-csv')
const filesystem = require('fs')
const jsonexport = require('jsonexport')
const translateDate = require('../util/date').translateDate

router.get('/', (request, response, error) => {
    const connection = connect()
    query = "SELECT * FROM ethereum" 
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT * FROM ethereum WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            var data = []
            for (var i=0; i<results.length; i++) {
                results[i]['date'] = translateDate(results[i]['date'])
                data.push(results[i])
            }
            jsonexport(data, (error, csv)=>{
                console.log(csv)
                filesystem.writeFile("./views/pages/data/coin.csv", csv, (error)=>{
                    console.log(error)
                })
            })
            
            response.render("pages/index", {
                coin: btctable._name.toUpperCase()
            })
            return  
        })
    
    } else {
        connection.query(query, (error, results, field)=>{
            var data = []
            for (var i=0; i<results.length; i++) {
                results[i]['date'] = translateDate(results[i]['date'])
                data.push(results[i])
            }
            jsonexport(data, (error, csv)=>{
                console.log(csv)
                filesystem.writeFile("./views/pages/data/coin.csv", csv, (error)=>{
                    console.log(error)
                })
            })
            
            response.render("pages/index", {
                coin: btctable._name.toUpperCase()
            })
            return
        })
    }
})

router.get('/price', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, price FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            if (error) {
                response.send([])
                return
            } else {
                //response.send(results)
                return
            }
            
        })
    
    } else {
        query = "SELECT date, price FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
            if (error) {
                response.send([])
            } else {
                response.send(results)
            }
        })
    }
})

router.get('/activeaddresses', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, activeaddresses FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
            
        })
    
    } else {
        query = "SELECT date, activeaddresses FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/averagedifficulty', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, averagedifficulty FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, averagedifficulty FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/blockcount', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, blockcount FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, blockcount FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/blocksize', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, blocksize FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, blocksize FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/exchangevolume', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, exchangevolume FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
            
        })
    
    } else {
        query = "SELECT date, exchangevolume FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/fees', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, fees FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
            
        })
    
    } else {
        query = "SELECT date, fees FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/generatedcoins', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, generatedcoins FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } 
    query = "SELECT date, generatedcoins FROM bitcoin" 
    connection.query(query, (error, results, field)=>{
        response.send(results)
    })
})

router.get('/marketcap', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, marketcap FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
          
        })
    
    } else {
        query = "SELECT date, marketcap FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
    
})

router.get('/medianfee', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, medianfee FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
            
        })
    
    } else {
        query = "SELECT date, medianfee FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/mediantxvalue', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, mediantxvalue FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, mediantxvalue FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/paymentcount', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, paymentcount FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, paymentcount FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
    
})

router.get('/realizedcap', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, realizedcap FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, realizedcap FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/txcount', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, txcount FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, txcount FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})

router.get('/txvolume', (request, response, error) => {
    // validation
    const connection = connect()
    if (request.query.startdate && request.query.enddate) {
        // TODO: convert to unix in serverparsedate
        begin_timestamp = util.parse(request.query.startdate)
        end_timestamp = util.parse(request.query.enddate) 
        query = "SELECT date, txvolume FROM bitcoin WHERE date >= " + begin_timestamp + " AND date <= " + end_timestamp
        connection.query(query, (error, results, field)=>{
            
            if (error) {
                response.send([])
                return
            } else {
                response.send(results)
                return
            }
        })
    
    } else {
        query = "SELECT date, txvolume FROM bitcoin" 
        connection.query(query, (error, results, field)=>{
        response.send(results)
    })
    }
})


// YYYYMMDD
    // TODO: Parse out correct format with regex.
    // TODO: Limit length of input.
    //console.log("Bitcoin Symbol: " + assetTickers['bitcoin'])
    /*
    
    */
    // Return JSON
    //response.send(serverParseDate(request.query.startdate).year.toString())

module.exports = router 