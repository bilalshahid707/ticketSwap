import {Publisher,Subjects} from "@bilal009/common"
import mongoose from "mongoose"
interface TicketUpdatedEvent {
    subject:Subjects.TicketUpdated,
    data:{
        id:string,
        name:string,
        price:number,
        userId:mongoose.Types.ObjectId,
        status?:string
    }
}

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}