import {Listener,Subjects,AppError,OrderCreatedEvent} from "@bilal009/common"
import { Message } from "node-nats-streaming"
import Ticket from "../../models/ticket"

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroup: string = 'tickets-service'

    async onMessage(data:OrderCreatedEvent['data'], msg: Message): Promise<void> {
        const ticket = await Ticket.findByIdAndUpdate(data.ticketId,{status:"reserved"})

        if (!ticket){
            throw new AppError("no ticket found",404)
        }

        console.log("ticket:updated")
        msg.ack()
    }
}