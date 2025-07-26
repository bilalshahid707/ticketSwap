import mongoose from "mongoose";
import { OrderStatus } from "@bilal009/common";
interface OrderType{
    id:string,
    ticketId:string,
    ticketName:string,
    status:string,
    userId:string,
    expiresIn:Date | any
}

interface OrderDocument extends mongoose.Document{
    id:string,
    ticketId:mongoose.Types.ObjectId,
    ticketName:string,
    status:string,
    userId:mongoose.Types.ObjectId,
    expiresIn:Date
}

interface OrderModel extends mongoose.Model<OrderDocument>{
    createDocument(document:OrderType):OrderDocument
}

const orderSchema = new mongoose.Schema({
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tickets",
      required: true,
    },
    ticketName:{
        type:String,
        required:[true,"Please provide ticket name to buy"]
    },
    status:{
        type:String,
        default:OrderStatus.Pending,
        enum:[OrderStatus.Pending,OrderStatus.Completed,OrderStatus.Cancelled]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    expiresIn:{
        type:Date,
        default:new Date(Date.now()+(15*60000))
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})


orderSchema.statics.createDocument=function(document:OrderType){
    return new Order(document)
}

const Order = mongoose.model<OrderDocument,OrderModel>('orders',orderSchema)
export default Order
