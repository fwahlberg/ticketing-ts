import { Subjects, Publisher, ExpirationCompleteEvent } from "@fawtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}