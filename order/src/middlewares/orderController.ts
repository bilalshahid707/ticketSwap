import Order from "../models/order"
import { catchAsync,AppError } from "@bilal009/common"
import {OrderCreatedPublisher} from "../events/publishers/orderCreatedPublisher"
import { natsWrapper } from "../nats-wrapper"
export const createOrder= catchAsync(async(req:any,res:any,next:any)=>{
    const order = Order.createDocument({...req.body,userId:req.currentUser.id})
    await order.save()

    new OrderCreatedPublisher(natsWrapper.client).publish({
        id:order.id,
        ticketId:order.ticketId,
        ticketName:order.ticketName,
        userId:order.userId,
        status:order.status
    })

    res.status(201).json({
        status:"success",
        data:order
    })
})