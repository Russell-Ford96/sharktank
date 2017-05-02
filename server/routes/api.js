const express = require('express');
const router = express.Router();
const DB_PASS = require('../database/env.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var mysql = require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : DB_PASS,
    database : 'budget',
    debug    :  false
});



/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});
router.post('/register', (req, res) => {
    console.log("register route fired");
    //sanitize input
    var email = pool.escape(req.body.email);
    var password = pool.escape(req.body.password);
    var confirmPass = pool.escape(req.body.confirmPassword);
    var fname = pool.escape(req.body.firstName);
    var lname = pool.escape(req.body.lastName);
    console.log("escaped values: ", email, password, confirmPass, fname, lname);
    //check if passwords are the same
    //query the database for existing user
    //create user if not exists
    pool.query('SELECT * FROM Users WHERE email=' + email, function (error, results, fields) {
        if (error) throw error;
        if(results == '') {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    pool.query('INSERT INTO Users VALUES(null,?,?,?,?,null,null)', [email, hash, fname, lname], function (error, results, fields) {
                        console.log(results, fields);
                        if (error) throw error;
                    });
                });
            });
        }
    });
});
router.post('/login', (req, res) => {
    pool.getConnection(function(err, connection) {
        var email = pool.escape(req.body.email);
        var password = pool.escape(req.body.password);
        connection.query("SELECT * FROM Users WHERE email=?", [email], function (error, results, fields) {
            bcrypt.compare(password, results[0].password, function(err, result) {
                if(result) {
                    var token = jwt.sign(results[0], 'secret');
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(token));
                } else {
                    res.send(JSON.stringify(""));
                }
            });

        connection.release();

        if (error) throw error;
        });
    });
});
router.get('/budget', (req, res) => {
    //receives user_id
    //SELECT * FROM User_Expenses WHERE user_id=user_id JOIN Expenses ON User_Expenses.expense_id=Expenses.expense_id
});

module.exports = router;
