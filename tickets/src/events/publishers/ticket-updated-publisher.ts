import { Publisher, Subjects, TicketUpdatedEvent } from "@fawtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}