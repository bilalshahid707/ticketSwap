import {Publisher,Subjects} from "@bilal009/common"

interface TicketUpdatedEvent {
    subject:Subjects.TicketUpdated,
    data:{
        id:string,
        title:string,
        price:number,
        userId:string
    }
}

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}