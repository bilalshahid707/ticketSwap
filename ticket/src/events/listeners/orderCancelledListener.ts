import {Listener,Subjects,AppError,OrderCancelledEvent} from "@bilal009/common"
import { Message } from "node-nats-streaming"
import Ticket from "../../models/ticket"

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
    queueGroup: string = 'tickets-service'

    async onMessage(data:OrderCancelledEvent['data'], msg: Message): Promise<void> {
        const ticket = await Ticket.findByIdAndUpdate(data.ticketId,{status:"avaiable"})

        if (!ticket){
            throw new AppError("no ticket found",404)
        }

        console.log("ticket:updated")
        msg.ack()
    }
}