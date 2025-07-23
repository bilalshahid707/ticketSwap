import {Listener,Subjects} from "@bilal009/common"
import { Message } from "node-nats-streaming"
import Ticket from "../../models/ticket"
import { ObjectId } from "mongoose"
// import 
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

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated
    queueGroup: string = 'ticket-created'

    async onMessage(data:TicketCreatedEvent['data'], msg: Message): Promise<void> {
        const ticket = Ticket.createDocument(data)
        await ticket.save()
        msg.ack()
    }
}