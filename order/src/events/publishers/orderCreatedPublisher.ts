import {Publisher,Subjects,OrderCreatedEvent} from "@bilal009/common"

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}