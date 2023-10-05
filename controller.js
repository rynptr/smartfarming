'use strict';

var response = require('./res');
var connection = require('./conn');
var jwt = require('jsonwebtoken');
var mqtt = require('mqtt');

var mqttClient;

// Change this to point to your MQTT broker or DNS name
const mqttHost = "mqtt.manvis.com";
const protocol = "mqtt";
const port = "1883";


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



exports.add_sensor_npk = function(req, res) {
    
    var data_N = req.body.data_N;
    var data_P = req.body.data_P;
    var data_K = req.body.data_K;
    var data_datetime = req.body.data_datetime;
    var id_sensor = req.body.id_sensor;


    connection.query('INSERT INTO tb_npk (N, P, K, datetime, id_sensor) values (?,?,?,?,?)',
    [data_N, data_P, data_K, data_datetime, id_sensor],  
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan data sensor NPK!", res);
        }
    });
};

exports.add_sensor_humidity = function(req, res) {
    
    var data_TS = req.body.data_TS;
    var data_HU = req.body.data_HU;
    var data_EC = req.body.data_EC;
    var data_PH = req.body.data_PH;
    var data_datetime = req.body.data_datetime;
    var id_sensor = req.body.id_sensor;

    connection.query('INSERT INTO tb_humidity (HU, TS, EC, PH, datetime, id_sensor) values (?,?,?,?,?,?)',
    [data_TS, data_HU, data_EC, data_PH, data_datetime, id_sensor],  
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan data sensor Humidity!", res);
        }
    });
};

exports.add_sensor_weather = function(req, res) {

    var data_TDS = req.body.data_TDS;
    var data_TA = req.body.data_TA;
    var data_RH = req.body.data_RH;
    var data_DP = req.body.data_DP;
    var data_PR = req.body.data_PR;
    var data_TDev = req.body.data_TDev;
    var data_rlySts = req.body.data_rlySts;
    var data_id_sensor = req.body.data_id_sensor;
    var data_datetime = req.body.data_datetime;


    connection.query('INSERT INTO tb_weather (TDS, TA, RH, DP, PR, TDev, rlySts, datetime, id_sensor) values (?,?,?,?,?,?,?,?,?)',
    [data_TDS, data_TA, data_RH, data_DP, data_PR, data_TDev, data_rlySts, data_datetime, data_id_sensor],  
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan data sensor Weather!", res);
        }
    });
};



exports.data_npk = function(req, res) {
    var id_polybag = req.params.id_polybag; 

     if(id_polybag =='1'){
        var id_sensor_npk = '5'
    } else 
    if (id_polybag =='2'){
        var id_sensor_npk = '2'    
    } else 
    if (id_polybag =='3'){
        var id_sensor_npk = '7'    
    } else 
    if (id_polybag =='4'){
        var id_sensor_npk = '11'    
    } else 
    if (id_polybag =='5'){
        var id_sensor_npk = '12'    
    } else 
    if (id_polybag =='6'){
        var id_sensor_npk = '3'    
    } else 
    if (id_polybag =='7'){
        var id_sensor_npk = '13'    
    } else 
    if (id_polybag =='8'){
        var id_sensor_npk = '15'    
    } else 
    if (id_polybag =='9'){
        var id_sensor_npk = '17'    
    } else 
    if (id_polybag =='10'){
        var id_sensor_npk = '9'    
    }


    connection.query('SELECT * FROM tb_npk WHERE id_sensor = ?',
    [ id_sensor_npk ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.data_humidity = function(req, res) {

    var id_polybag = req.params.id_polybag; 
    
    if(id_polybag =='1'){
        var id_sensor_hu = '1'
    } else 
    if (id_polybag =='2'){
        var id_sensor_hu = '0'    
    } else 
    if (id_polybag =='3'){
        var id_sensor_hu = '6'    
    } else 
    if (id_polybag =='4'){
        var id_sensor_hu = '8'    
    } else 
    if (id_polybag =='5'){
        var id_sensor_hu = '4'    
    } else 
    if (id_polybag =='6'){
        var id_sensor_hu = '0'    
    }  else 
    if (id_polybag =='7'){
        var id_sensor_hu = '14'    
    } else 
    if (id_polybag =='8'){
        var id_sensor_hu = '16'    
    } else 
    if (id_polybag =='9'){
        var id_sensor_hu = '0'    
    } else 
    if (id_polybag =='10'){
        var id_sensor_hu = '0'    
    }
    
            connection.query('SELECT * FROM tb_humidity WHERE id_sensor = ?', 
            [ id_sensor_hu ],
            function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    response.ok(rows, res)
                }
            }); 
};

exports.last_data_npk = function(req, res) {

    var id_polybag = req.params.id_polybag; 
    
    if(id_polybag =='1'){
        var id_sensor_npk = '5'
    } else 
    if (id_polybag =='2'){
        var id_sensor_npk = '2'    
    } else 
    if (id_polybag =='3'){
        var id_sensor_npk = '7'    
    } else 
    if (id_polybag =='4'){
        var id_sensor_npk = '11'    
    } else 
    if (id_polybag =='5'){
        var id_sensor_npk = '12'    
    } else 
    if (id_polybag =='6'){
        var id_sensor_npk = '3'    
    } else 
    if (id_polybag =='7'){
        var id_sensor_npk = '13'    
    } else 
    if (id_polybag =='8'){
        var id_sensor_npk = '15'    
    } else 
    if (id_polybag =='9'){
        var id_sensor_npk = '17'    
    } else 
    if (id_polybag =='10'){
        var id_sensor_npk = '9'    
    }

    console.log("-----------Polybag = "+id_polybag);
    console.log("sensor NPK = "+id_sensor_npk);
    connection.query('SELECT * FROM tb_npk WHERE id_sensor = ? ORDER BY id DESC LIMIT 1',
    [ id_sensor_npk ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};


exports.last_data_humidity = function(req, res) {

    var id_polybag = req.params.id_polybag; 
    
    if(id_polybag =='1'){
        var id_sensor_hu = '1'
    } else 
    if (id_polybag =='2'){
        var id_sensor_hu = '0'    
    } else 
    if (id_polybag =='3'){
        var id_sensor_hu = '6'    
    } else 
    if (id_polybag =='4'){
        var id_sensor_hu = '8'    
    } else 
    if (id_polybag =='5'){
        var id_sensor_hu = '4'    
    } else 
    if (id_polybag =='6'){
        var id_sensor_hu = '0'    
    }  else 
    if (id_polybag =='7'){
        var id_sensor_hu = '14'    
    } else 
    if (id_polybag =='8'){
        var id_sensor_hu = '16'    
    } else 
    if (id_polybag =='9'){
        var id_sensor_hu = '0'    
    } else 
    if (id_polybag =='10'){
        var id_sensor_hu = '0'    
    }
    
    console.log("sensor Humidity = "+id_sensor_hu);
    connection.query('SELECT * FROM tb_humidity WHERE id_sensor = ? ORDER BY id DESC LIMIT 1',
    [ id_sensor_hu ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.data_weather = function(req, res) {
    
            connection.query('SELECT * FROM tb_weather ORDER BY id DESC LIMIT 1', function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    response.ok(rows, res)
                }
            }); 
};



exports.mqtt_data = function(req, res) {

        //var url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
        //var topic_ = url.searchParams.get("topic");

        var get_topic = req.params.get_topic;
        let topic_ = get_topic.replace(/-/g,'/');
        console.log(topic_);

        const clientId = "client" + Math.random().toString(36).substring(7);

        // Change this to point to your MQTT broker
        const hostURL = `${protocol}://${mqttHost}:${port}`;
        const options = {
            keepalive: 60,
            clientId: clientId,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
        };

        
        mqttClient = mqtt.connect(hostURL, options);

         mqttClient.on("error", (err) => {
            console.log("Error: ", err);
            mqttClient.end();
          });

          mqttClient.on("reconnect", () => {
            console.log("Reconnecting...");
          });

          mqttClient.on("connect", () => {
            console.log("Client connected:" + clientId);
          });

          // Received Message
          mqttClient.on("message", (topic, message, packet) => {
            console.log(
              "Received Message: " + message.toString() + "\nOn topic: " + topic
            );
          });
        

        mqttClient.subscribe('/SF/01/DAT/02', { qos: 0 });
        mqttClient.subscribe('/SF/01/DAT/03', { qos: 0 });
        mqttClient.subscribe('/SF/01/DAT/05', { qos: 0 });


       /* mqttClient.on('connect', function() {
            mqttClient.subscribe(topic_, function() {
                // when a message arrives, do something with it
                var count =0;
                mqttClient.on('message', function(topic, message, packet) {
                  
                  //const jsonData = JSON.parse(message.toString());
                  if (mqttClient.connected == true){
                    console.log("Received '" + message + "' on '" + topic + "'");
                    const jsonData = JSON.parse(message.toString());
                    //res.send(jsonData);
                    //data_TA.push(jsonData.TA);


                    var data_N = jsonData.N;
                    var data_P = jsonData.P;
                    var data_K = jsonData.K;
                    var datetime = jsonData.datetime;
                    var id_sensor = jsonData.ID;
                    connection.query('INSERT INTO tb_npk (N, P, K, datetime, id_sensor) values (?,?,?,?,?)',
                    [data_N, data_P, data_K, datetime, id_sensor],);

                  }

                  //count+=1;
                  //console.log(count)
                  //if (count==1){
                    //mqttClient.end();
                  //}
                  
                });
              });
        });
    
};*/

}
