import express from "express"
import { createOrder , deleteOrder, getAllOrders,getOrder} from "../middlewares/orderController"
import {protect} from "@bilal009/common"

const Router = express.Router()

Router.post("/",protect,createOrder)
Router.delete("/:id",protect,deleteOrder)
Router.get("/",protect,getAllOrders)
Router.get("/:id",protect,getOrder)

export default Router