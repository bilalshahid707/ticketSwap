import { AppError, Listener, Subjects,TicketUpdatedEvent } from "@bilal009/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import Ticket from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroup: string = queueGroupName

  async onMessage(
    data: TicketUpdatedEvent["data"],
    msg: Message
  ): Promise<void> {

    const ticket = await Ticket.findById(data.id)

    if (!ticket){
        throw new AppError("no ticket found",404)
    }

    await Ticket.findByIdAndUpdate(data.id,data)

    console.log("ticket:updated");
    msg.ack();
  }
}
