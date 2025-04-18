const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer-app',
  brokers: ['kafka1:9092', 'kafka2:9093', 'kafka3:9094'],
});

const producer = kafka.producer();

const produceMessage = async () => {
  await producer.connect();
  console.log('Producer connected');

  setInterval(async () => {
    try {
      const message = {
        key: `key-${Date.now()}`,
        value: `new ss Message at ${new Date().toISOString()}`,
      };

      await producer.send({
        topic: 'test-topic',
        messages: [message],
      });

      console.log('All new 123 new Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, 5000); // Send message every 5 seconds
};

produceMessage();
