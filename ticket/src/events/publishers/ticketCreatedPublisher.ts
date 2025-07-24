import {Publisher,Subjects,TicketCreatedEvent} from "@bilal009/common"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}