const amqp = require("amqplib");

let channel = null;

/**
 * Connects to RabbitMQ with a retry mechanism.
 * Establishes a connection, creates a channel, and asserts the exchange.
 */
const connectRabbitMQ = async () => {
  try {
    // Connection URL format: amqp://user:password@service_name:port
    // the service name is 'rabbitmq'
    const connection = await amqp.connect("amqp://guest:guest@rabbitmq:5672");

    channel = await connection.createChannel();

    // Assert Exchange for Phase 3 (Pub/Sub pattern)
    await channel.assertExchange("app.events", "topic", { durable: true });

    console.log("✅ RabbitMQ connected successfully (Auth Service)");
    return channel;

  } catch (error) {
    console.error("❌ RabbitMQ connection error:", error.message);

    // Retry logic: Attempt to reconnect after 5 seconds
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(connectRabbitMQ, 5000);
  }
};

/**
 * Returns the active RabbitMQ channel.
 * @returns {object|null} The RabbitMQ channel or null if not connected.
 */
const getChannel = () => {
  return channel;
};

module.exports = {
  connectRabbitMQ,
  getChannel,
};