const axios = require('axios');
const CircuitBreaker = require('opossum');

// Circuit Breaker settings
const options = {
  timeout: 3000,                // 3s timeout
  errorThresholdPercentage: 50, // 50% failure => OPEN
  resetTimeout: 5000            // 5s to HALF-OPEN
};

// Call Notification service
async function callNotificationService() {
  const response = await axios.get(
    'http://notification-service:3000/notify'
  );
  return response.data;
}

// Create Circuit Breaker
const notificationBreaker = new CircuitBreaker(
  callNotificationService,
  options
);

// Logs
notificationBreaker.on('open', () =>
  console.log('⚠️ Circuit Breaker OPENED')
);

notificationBreaker.on('halfOpen', () =>
  console.log('⚠️ Circuit Breaker HALF-OPEN')
);

notificationBreaker.on('close', () =>
  console.log('✅ Circuit Breaker CLOSED')
);

// Fallback
notificationBreaker.fallback(() => {
  return 'Notification service unavailable (fallback response)';
});

module.exports = notificationBreaker;
