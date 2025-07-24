import {Publisher, Subjects, TicketDeletedEvent} from "@bilal009/common";

export class TicketDeletedPublisher extends Publisher<TicketDeletedEvent> {
  subject: Subjects.TicketDeleted = Subjects.TicketDeleted;
}
