import {Publisher, OrderCreatedEvent, Subjects} from "@fawtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}