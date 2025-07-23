import mongoose from "mongoose";

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
    ticketId:string,
    ticketName:string,
    status:string,
    userId:string,
    expiresIn:Date
}

interface OrderModel extends mongoose.Model<OrderDocument>{
    createDocument(document:OrderType):OrderDocument
}

const orderSchema = new mongoose.Schema({
    ticketId:{
        type:String,
        required:[true,"Please provide ticket id to process"]
    },
    ticketName:{
        type:String,
        required:[true,"Please provide ticket name to buy"]
    },
    status:{
        type:String,
        default:'pending'
    },
    userId:{
        type:String,
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
