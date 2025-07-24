import { Listener, Subjects, TicketDeletedEvent } from "@bilal009/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import Ticket from "../../models/ticket";


export class TicketDeletedListener extends Listener<TicketDeletedEvent> {
  subject: Subjects.TicketDeleted = Subjects.TicketDeleted;
  queueGroup: string = queueGroupName

  async onMessage(
    data: TicketDeletedEvent["data"],
    msg: Message
  ): Promise<void> {

    const ticket = await Ticket.findByIdAndDelete(data.id)
    console.log("ticket:deleted");
    msg.ack();
  }
}
