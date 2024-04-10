import { Listener, OrderCreatedEvent, Subjects } from "@fawtickets/common";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: any) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(`Waiting ${delay} milliseconds to process the job`);
    await expirationQueue.add({
      orderId: data.id,
    }, {
      delay
    });

    msg.ack();
  }
}
