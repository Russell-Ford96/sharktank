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
    //sanitize input
    var email = req.body.email.toLowerCase();
    email = pool.escape(email);
    var password = pool.escape(req.body.password);
    var confirmPass = pool.escape(req.body.confirmPassword);
    if(password != confirmPass)
        res.status(400).send(JSON.stringify("Passwords do not match"));
    var fname = pool.escape(req.body.firstName);
    var lname = pool.escape(req.body.lastName);
    //check if passwords are the same
    //TODO
    //query the database for existing user
    pool.query('SELECT * FROM Users WHERE email=?', [email], function (error, results, fields) {
        if (error) throw error;
        //create user if not exists
        if(results == '') {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    pool.query('INSERT INTO Users VALUES(null,?,?,?,?,null)', [email, hash, fname, lname], function (error, results, fields) {
                        res.send(JSON.stringify("success"));
                        if (error) throw error;
                    });
                });
            });
        } else {
            res.send(JSON.stringify("User already exists"));
        }
    });
});
router.post('/login', (req, res) => {
    pool.getConnection(function(err, connection) {
        var email = req.body.email.toLowerCase();
        email = pool.escape(email);
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
router.post('/income', (req, res) => {
    const queryString = "INSERT INTO User_Income VALUES(?,?,?)";
    var decoded = jwt.verify(req.body.token, 'secret');
    pool.getConnection(function(err, connection) {
        var income_name = pool.escape(req.body.incomeCategory);
        var income_amount = pool.escape(req.body.incomeAmount);
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }

            if(error) throw error;
        });
        //select users stored incomes from db
        connection.query(queryString, [decoded.user_id, income_name, income_amount], function(error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify('success'));

        });
        connection.release();
    });
});
router.put('/income', (req, res) => {
    const queryString = "UPDATE User_Income SET income_name=?, income_amount=? WHERE user_id=? AND income_name=? AND income_amount=?";
    var decoded = jwt.verify(req.body.token, 'secret');
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }

            if(error) throw error;
        });
        var income_name = pool.escape(req.body.incomeCategory);
        var income_amount = pool.escape(req.body.incomeAmount);
        var old_income_name = pool.escape(req.body.oldName);
        var old_income_amount = pool.escape(req.body.oldAmount);
        connection.query(queryString, [income_name, income_amount, decoded.user_id, old_income_name, old_income_amount], function(error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify('success'));

        });
        connection.release();
    });
});
router.delete('/income', (req, res) => {
    const queryString = "DELETE FROM User_Income WHERE income_name=? AND income_amount=? AND user_id=?";
    var decoded = jwt.verify(req.body.token, 'secret');
    pool.getConnection(function(err, connection) {
        var income_name = pool.escape(req.body.income_name);
        var income_amount = pool.escape(req.body.income_amount);
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }

            if(error) throw error;
        });
        //select users stored incomes from db
        connection.query(queryString, [income_name, income_amount, decoded.user_id], function(error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify('success'));

        });
        connection.release();
    });
});
router.post('/expense', (req, res) => {
    const queryString = "INSERT INTO User_Expenses VALUES(?,?,?)";
    var decoded = jwt.verify(req.body.token, 'secret');
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }

            if(error) throw error;
        });
        var expense_name = pool.escape(req.body.expenseCategory);
        var expense_amount = pool.escape(req.body.expenseAmount);
        connection.query(queryString, [decoded.user_id, expense_name, expense_amount], function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify('success'));

            connection.release();

        });
    });
});
router.put('/expense', (req, res) => {
    const queryString = "UPDATE User_Expenses SET expense_name=?, expense_amount=? WHERE user_id=? AND expense_name=? AND expense_amount=?";
    var decoded = jwt.verify(req.body.token, 'secret');
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }

            if(error) throw error;
        });
        var expense_name = pool.escape(req.body.expenseCategory);
        var expense_amount = pool.escape(req.body.expenseAmount);
        var old_expense_name = pool.escape(req.body.oldName);
        var old_expense_amount = pool.escape(req.body.oldAmount);
        connection.query(queryString, [expense_name, expense_amount, decoded.user_id, old_expense_name, old_expense_amount], function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify('success'));

            connection.release();

        });
    });
});
router.delete('/expense', (req, res) => {
    const queryString = "DELETE FROM User_Expenses WHERE user_id=? AND expense_name=? AND expense_amount=?";
    var decoded = jwt.verify(req.body.token, 'secret');
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }

            if(error) throw error;
        });
        var expense_name = pool.escape(req.body.expense_name);
        var expense_amount = pool.escape(req.body.expense_amount);
        connection.query(queryString, [decoded.user_id, expense_name, expense_amount], function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify('success'));

            connection.release();

        });
    });
});
router.post('/profile', (req, res) => {
    const queryIncome = "SELECT * FROM User_Income WHERE user_id=?";
    const queryExpense = "SELECT * FROM User_Expenses WHERE user_id=?";
    if(req.body.token != null) {
        var decoded = jwt.verify(req.body.token, 'secret');
    } else {
        res.send(JSON.stringify(null));
        return 0;
    }
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }
            //select income and expenses (there's probably a more efficient way to do this with one query)
            connection.query(queryIncome, [decoded.user_id, decoded.user_id], function(error, resIncome, fields) {

                if(error) throw error;

                connection.query(queryExpense, [decoded.user_id, decoded.user_id], function(error2, resExpenses, fields2) {
                    var income = [];
                    var expenses = [];
                    for(row in resIncome) {
                        income.push(resIncome[row]);
                    }
                    for(row in resExpenses) {
                        expenses.push(resExpenses[row]);
                    }
                    res.send(JSON.stringify({
                        'firstName': results[0].first_name,
                        'lastName': results[0].last_name,
                        'email': results[0].email,
                        'savings': results[0].savings,
                        'income': income,
                        'expenses': expenses
                    }));

                    if(error) throw error;
                });
            });

            if(error) throw error;
        });
        connection.release();
    });
});
router.put('/profile', (req, res) => {
    const queryString = "UPDATE Users SET first_name=?, last_name=?, savings=? WHERE user_id=?";
    var decoded = jwt.verify(req.body.token, 'secret');
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM Users WHERE user_id=? AND password=?", [decoded.user_id, decoded.password], function(error, results, fields) {
            if(results.length == 0) {
                res.send('invalid token');
            }

            if(error) throw error;
        });
        var first_name = pool.escape(req.body.firstName);
        var last_name = pool.escape(req.body.lastName);
        var savings = pool.escape(req.body.savings);
        connection.query(queryString, [first_name, last_name, savings, decoded.user_id], function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify('success'));

            connection.release();

        });
    });
});

module.exports = router;
