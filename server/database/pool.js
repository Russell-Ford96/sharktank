var mysql = require('mysql');
const DB_PASS = require('../database/env.js');

//Pooling allows a caching of database connections for reuse
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : DB_PASS,
    database : 'test',
    debug    :  false
});
