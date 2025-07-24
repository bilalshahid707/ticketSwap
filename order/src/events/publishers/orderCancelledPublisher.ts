import {Publisher,Subjects, OrderCancelledEvent} from "@bilal009/common"

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}