const mqtt = require("mqtt");
const client = mqtt.connect(process.env.MQTT_BROKER);

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("garden/+/sensors");
  client.subscribe("garden/+/keep_alive");
});

client.on("message", (topic, message) => {
  const deviceId = topic.split("/")[1];
  const data = JSON.parse(message.toString());

  if (topic.includes("sensors")) {
    require("./sensor.service").save(deviceId, data);
    require("./alert.service").check(deviceId, data);
  }
  if (topic.includes("keep_alive")) {
    require("./device.service").updateStatus(deviceId);
  }
});

module.exports = {
  publish(topic, payload) {
    client.publish(topic, JSON.stringify(payload));
  }
};
