'use strict';

var response = require('./res');
var connection = require('./conn');
//var jwt = require('jsonwebtoken');

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password

    //console.log(email)
    //console.log(password)

    if (email && password) {
        // check if user exists
                connection.query('SELECT * FROM table_users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
                    
                    if (results.length > 0) {
                        
                        const user = {
                            //id:1,
                            email:email,
                            password:password
                        }
                 
                        jwt.sign({user:user}, 'secretkey', (err,token) => {
                            res.json({
                                token:token
                            });
                        });   


                        //request.session.loggedin = true;
                        //request.session.username = username;
                        //response.redirect('/listpegawai');
                    } else {
                        res.send('Incorrect Email and/or Password!');
                        
                    }           
                    //res.end();
                });
            } else {
                res.send('Please enter Email and Password!');
                //res.end();
            }
};