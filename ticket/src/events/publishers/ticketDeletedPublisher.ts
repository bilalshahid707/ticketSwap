import {Publisher, Subjects} from "@bilal009/common";

interface TicketDeletedEvent {
  subject: Subjects.TicketDeleted;
  data: {
    id: string;
  };
}

export class TicketDeletedPublisher extends Publisher<TicketDeletedEvent> {
  subject: Subjects.TicketDeleted = Subjects.TicketDeleted;
}
