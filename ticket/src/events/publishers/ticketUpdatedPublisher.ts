import {Publisher,Subjects} from "@bilal009/common"
import {ObjectId} from "mongoose"
interface TicketUpdatedEvent {
    subject:Subjects.TicketUpdated,
    data:{
        id:string,
        name:string,
        price:number,
        userId:ObjectId,
        status:string
    }
}

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}