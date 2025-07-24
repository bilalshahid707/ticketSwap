import { Listener, Subjects, TicketCreatedEvent } from "@bilal009/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import Ticket from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroup: string = queueGroupName;

  //   Replicating ticket in orders service
  async onMessage(
    data: TicketCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const ticket = Ticket.createDocument({
      _id: data.id,
      name: data.name,
      price: data.price,
      userId: data.userId,
    });

    await ticket.save();
    console.log("ticket:created");
    msg.ack();
  }
}
