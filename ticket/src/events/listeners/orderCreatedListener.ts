import {Listener,Subjects,AppError,OrderCreatedEvent,TicketStatus} from "@bilal009/common"
import { Message } from "node-nats-streaming"
import { queueGroupName } from "./queue-group-name"
import Ticket from "../../models/ticket"

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroup: string = queueGroupName

    async onMessage(data:OrderCreatedEvent['data'], msg: Message): Promise<void> {
        const ticket = await Ticket.findByIdAndUpdate(data.ticketId,{status:TicketStatus.Reserved})

        if (!ticket){
            throw new AppError("no ticket found",404)
        }

        console.log("ticket:updated")
        msg.ack()
    }
}