const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'online-shopping-app-consumer',
  brokers: ['kafka1:29092', 'kafka2:29093', 'kafka3:29094'],
});

const consumer = kafka.consumer({ groupId: 'product-consumer-group-dev2' });

const run = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'product-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value.toString();
      console.log('🛒 New product created - event received:');
      console.log(JSON.parse(data)); // Optional: pretty print
    },
  });
};

run().catch(console.error);
