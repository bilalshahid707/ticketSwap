import {
  Listener,
  Subjects,
  AppError,
  OrderCreatedEvent,
} from "@bilal009/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroup: string = queueGroupName;

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const delay = new Date(data.expiresIn).getTime() - new Date().getTime()
    const job = await expirationQueue.add(
      {
        orderId: data.id,
        ticketId: data.ticketId
      },
      {
        delay: delay,
      }
    );
    msg.ack();
  }
}
