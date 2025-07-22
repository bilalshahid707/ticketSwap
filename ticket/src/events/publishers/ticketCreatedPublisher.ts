import {Publisher,Subjects} from "@bilal009/common"
import { ObjectId } from "mongoose"

interface TicketCreatedEvent {
    subject:Subjects.TicketCreated,
    data:{
        id:string,
        name:string,
        price:number,
        userId:ObjectId,
        status:string
    }
}

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}