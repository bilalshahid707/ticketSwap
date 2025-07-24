import {Publisher,Subjects, TicketUpdatedEvent} from "@bilal009/common"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}