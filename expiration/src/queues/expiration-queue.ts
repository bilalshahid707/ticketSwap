import Bull from "bull";
import { ExpirationCompletedPublisher } from "../events/publisher/expirationCompleted";
import { natsWrapper } from "../nats-wrapper";

export const expirationQueue = new Bull("expiration-queue",{
    redis:{
        host:"expiration-redis-service",
        port:6379
    }
});

expirationQueue.process(async(job)=>{
    await new ExpirationCompletedPublisher(natsWrapper.client).publish({
        orderId:job.data.orderId,
        ticketId:job.data.ticketId
    })
})


