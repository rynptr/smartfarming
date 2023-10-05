var mqtt = require("mqtt");

var mqttClient;

// Change this to point to your MQTT broker or DNS name
const mqttHost = "mqtt.manvis.com";
const protocol = "mqtt";
const port = "1883";



function connectToBroker() {
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
    const jsonData = JSON.parse(message.toString());
    // Now you can work with the JSON data
    //console.log('Received JSON data:', jsonData);

    parsingdata(jsonData)
    //console.log(
      //"Received Message: " + message.toString() + "\nOn topic: " + topic
    //);
  });
}

function subscribeToTopic(topic) {
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 1 });
}

function parsingdata(jsonData){
  console.log(jsonData);
  console.log(jsonData.TA)
  console.log(jsonData.RH)
  console.log(jsonData.DP)


}

connectToBroker();
subscribeToTopic("/SF/01/DAT");


