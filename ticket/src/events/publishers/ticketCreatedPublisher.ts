import {Publisher,Subjects} from "@bilal009/common"
import { ObjectId } from "mongoose"
import mongoose from "mongoose"

interface TicketCreatedEvent {
    subject:Subjects.TicketCreated,
    data:{
        id:string,
        name:string,
        price:number,
        userId:mongoose.Types.ObjectId,
        status?:string
    }
}

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}