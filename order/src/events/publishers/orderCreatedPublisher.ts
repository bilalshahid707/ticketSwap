import {Publisher,Subjects} from "@bilal009/common"

interface OrderCreatedEvent {
    subject:Subjects.OrderCreated,
    data:{
        id:string,
        ticketId:string,
        ticketName:string,
        userId:string,
        status:string,
    }
}

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}