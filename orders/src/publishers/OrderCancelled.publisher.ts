import {Publisher, OrderCancelledEvent, Subjects} from "@fawtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}