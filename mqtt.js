  var mqtt = require('mqtt');
  
  var mqttClient;

  // Change this to point to your MQTT broker or DNS name
  const mqttHost = "mqtt.manvis.com";
  const protocol = "mqtt";
  const port = "1883";


  var connection = require('./conn');


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



  // ID SENSOR SMART FARMING
  const sensor_npk = ["02","03","05","07","09","11","12","13","15","17","18"]
  const sensor_humidity = ["01","04","06","08","10","14","16"]

  

  // Koneksi MQTT
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
    const jsonData = JSON.parse(message.toString());
    //console.log("Received '" + message + "' on '" + topic + "'");
    //console.log(topic);


    if (topic === '/SF/01/DAT/00') {
      //const jsonData = JSON.parse(message.toString());
      console.log("Topic" + topic);
      console.log(jsonData)
      
      var data_TDS = jsonData.TDS;
      var data_TA = jsonData.TA;
      var data_RH = jsonData.RH;
      var data_DP = jsonData.DP;
      var data_PR = jsonData.PR;
      var data_TDev = jsonData.TDev;
      var data_rlySts = jsonData.rlySts;
      var datetime = jsonData.datetime;
      var id_sensor = jsonData.ID;
      connection.query('INSERT INTO tb_weather (TDS, TA, RH, DP, PR, TDev, rlySts, datetime, id_sensor) values (?,?,?,?,?,?,?,?,?)',
      [data_TDS, data_TA, data_RH, data_DP, data_PR, data_TDev, data_rlySts, datetime, id_sensor],);
    }

    
    let sLen = sensor_npk.length;
    for (let i = 0; i < sLen; i++) {
        //subscribe_npk(sensor_npk[i]); 
        //console.log(topic.includes('/SF/01/DAT/'+sensor_npk[i]));
        if (topic.includes('/SF/01/DAT/'+sensor_npk[i]) === true){
            //const jsonData = JSON.parse(message.toString());
            console.log("Topic" + topic);
            console.log(jsonData)
            var data_N = jsonData.N;
            var data_P = jsonData.P;
            var data_K = jsonData.K;
            var data_datetime = jsonData.datetime;
            var id_sensor = jsonData.ID;
            connection.query('INSERT INTO tb_npk (N, P, K, datetime, id_sensor) values (?,?,?,?,?)',
            [data_N, data_P, data_K, data_datetime, id_sensor],);
        }
    }

    let sLen_hu = sensor_humidity.length;
    for (let i = 0; i < sLen_hu; i++) {
        //subscribe_npk(sensor_npk[i]); 
        //console.log(topic.includes('/SF/01/DAT/'+sensor_npk[i]));
        if (topic.includes('/SF/01/DAT/'+sensor_humidity[i]) === true){
            //const jsonData = JSON.parse(message.toString());
            console.log("Topic" + topic);
            console.log(jsonData)
            var data_TS = jsonData.TS;
            var data_HU = jsonData.HU;
            var data_EC = jsonData.EC;
            var data_PH = jsonData.PH;
            var data_datetime = jsonData.datetime;
            var id_sensor = jsonData.ID;
            connection.query('INSERT INTO tb_humidity (HU, TS, EC, PH, datetime, id_sensor) values (?,?,?,?,?,?)',
            [data_TS, data_HU, data_EC, data_PH, data_datetime, id_sensor],);
        }
    }
  });


  //SUBSCIBE DATA SENSOR

  mqttClient.subscribe('/SF/01/DAT/00', { qos: 0 }); 

  let sLen = sensor_npk.length;
  for (let i = 0; i < sLen; i++) {
      mqttClient.subscribe('/SF/01/DAT/'+sensor_npk[i], { qos: 0 });
      //subscribe_npk(sensor_npk[i]);  
  }

  
  let sLen_hu = sensor_humidity.length;
  for (let i = 0; i < sLen_hu; i++) {
      mqttClient.subscribe('/SF/01/DAT/'+sensor_humidity[i], { qos: 0 }); 
      //subscribe_humidity(sensor_humidity[i]);  
  }



