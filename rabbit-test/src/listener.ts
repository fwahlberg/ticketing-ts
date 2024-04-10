import * as amqp from "amqplib";

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'task_queue';

  await channel.assertQueue(queue, {
    durable: true
  });

  channel.prefetch(1);
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  channel.consume(queue, (msg) => {
    const secs = msg!.content.toString().split('.').length - 1;

    console.log(" [x] Received %s", msg!.content.toString());
    setTimeout(() => {
      console.log(" [x] Got it");
      channel.ack(msg!);
    }, secs * 1000);
  }, {
    noAck: false
  });
}

main().catch(console.error);