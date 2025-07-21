import {Publisher,Subjects} from "@bilal009/common"

interface TicketCreatedEvent {
    subject:Subjects.TicketCreated,
    data:{
        id:string,
        title:string,
        price:number,
        userId:string
    }
}

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}