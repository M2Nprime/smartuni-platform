const amqp = require("amqplib");

let channel = null;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://guest:guest@rabbitmq:5672");
    channel = await connection.createChannel();

    await channel.assertExchange("app.events", "topic", { durable: true });

    console.log("RabbitMQ connected (auth-service)");
  } catch (error) {
    console.error("RabbitMQ connection error:", error.message);
  }
}

function getChannel() {
  return channel;
}

module.exports = {
  connectRabbitMQ,
  getChannel,
};
