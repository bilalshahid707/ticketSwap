import express from "express"
import { createOrder } from "../middlewares/orderController"
import {protect} from "@bilal009/common"

const Router = express.Router()

Router.post("/",protect,createOrder)

export default Router