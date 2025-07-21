import {Listener,Subjects} from "@bilal009/common"
import { Message } from "node-nats-streaming"

interface TicketCreatedEvent {
    subject:Subjects.TicketCreated,
    data:{
        id:string,
        title:string,
        price:number,
        userId:string
    }
}

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated
    queueGroup: string = 'ticket-created'

    onMessage(data: { id: string; title: string; price: number; userId: string; }, msg: Message): void {
        console.log(data)
        msg.ack()
    }
}