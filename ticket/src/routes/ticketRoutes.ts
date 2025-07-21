import express  from "express";
import { getAllTickets,getTicket,createTicket,updateTicket,deleteTicket } from "../middlewares/ticketController";
import { protect } from "@bilal009/common";
const Router = express.Router()

Router.get("/", getAllTickets);
Router.get("/:id", getTicket);
Router.patch("/:id", protect, updateTicket);
Router.post("/", protect, createTicket);
Router.delete("/:id", protect, deleteTicket);

export default Router;