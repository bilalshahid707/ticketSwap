import {Listener,Subjects,AppError,OrderCancelledEvent} from "@bilal009/common"
import { Message } from "node-nats-streaming"
import { queueGroupName } from "./queue-group-name"
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
    queueGroup: string = queueGroupName

    async onMessage(data:OrderCancelledEvent['data'], msg: Message): Promise<void> {
        msg.ack()
    }
}