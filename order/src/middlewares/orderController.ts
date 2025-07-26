import Order from "../models/order"
import { catchAsync,AppError,OrderStatus,TicketStatus} from "@bilal009/common"
import {OrderCreatedPublisher} from "../events/publishers/orderCreatedPublisher"
import { OrderCancelledPublisher } from './../events/publishers/orderCancelledPublisher';
import { natsWrapper } from "../nats-wrapper"
import Ticket from "../models/ticket" 

export const createOrder= catchAsync(async(req:any,res:any,next:any)=>{
    // 1) check if the ticket for which order is being created exists or not or is it reserved or not
    const {ticketId} = req.body
    const ticket = await Ticket.findById(ticketId)
    if (!ticket){
        return next(new AppError("No ticket found",404))
    }
    if (ticket.status===TicketStatus.Reserved){
        return next(new AppError("Ticket is already reserved",400))
    }

    // 2) Creating order and set ticket to reserve
    const order = Order.createDocument({...req.body,userId:req.currentUser.id})
    await order.save()
    ticket.set({status:TicketStatus.Reserved})
    await ticket.save()

    // 3) Publishing order created event
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id:order.id,
        ticketId:order.ticketId.toString(),
        ticketName:order.ticketName,
        userId:order.userId.toString(),
        ticketPrice:ticket.price,
        status:ticket.status,
        expiresIn:order.expiresIn
    })

    res.status(201).json({
        status:"success",
        data:order
    })
})

export const getOrder= catchAsync(async(req:any,res:any,next:any)=>{
    const order = await Order.findById(req.params.id)
    
    if(!order){
        return next (new AppError("no order found",404))
    }

    res.status(200).json({
        status:"success",
        data:order
    })
})

export const getAllOrders= catchAsync(async(req:any,res:any,next:any)=>{
    const orders = await Order.find()
    res.status(200).json({
        status:"success",
        data:orders
    })
})

export const deleteOrder = catchAsync(async(req:any,res:any,next:any)=>{
    // 1) Check if order exists or not and user is authourized or not to update
    const order = await Order.findById(req.params.id)
    if(!order){
        return next (new AppError("no order found",404))
    }
    if (order?.userId.toString() !== req.currentUser.id) {
        return next (new AppError("Unauthorized",403))
    }
    order.set({status:OrderStatus.Cancelled})
    await order.save()

    // 2) Updating ticket back to available
    const ticket = await Ticket.findByIdAndUpdate(order.ticketId,{status:TicketStatus.Available},{
        runValidators:true,
        new:true
    })
    if(!ticket){
        return next (new AppError("no ticket found",404))
    }

    // 3) Publishing Order Cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
        id:order.id,
        ticketId:ticket.id
    })

    res.status(200).json({
        status:"success",
        data:null
    })
})