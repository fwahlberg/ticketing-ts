import { Publisher, Subjects, TicketCreatedEvent } from "@fawtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}