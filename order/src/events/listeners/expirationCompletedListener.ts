import {
  Listener,
  Subjects,
  ExpirationCompletedEvent,
  AppError,OrderStatus
} from "@bilal009/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import Order from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/orderCancelledPublisher";
import { natsWrapper } from "../../nats-wrapper";

export class ExpirationCompletedListener extends Listener<ExpirationCompletedEvent> {
  subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
  queueGroup: string = queueGroupName;

  async onMessage(
    data: ExpirationCompletedEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new AppError("No order found", 404);
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    // Publishing order cancelled event on expiration to make the respective ticket available
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: data.orderId,
      ticketId: data.ticketId,
    });

    msg.ack();
  }
}
