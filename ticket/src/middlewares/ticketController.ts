import { TicketCreatedPublisher } from "./../events/publishers/ticketCreatedPublisher";
import { TicketUpdatedPublisher } from "../events/publishers/ticketUpdatedPublisher";
import { TicketDeletedPublisher } from "../events/publishers/ticketDeletedPublisher";

import { AppError, catchAsync } from "@bilal009/common";
import Ticket from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";


export const createTicket = catchAsync(
  async (req: any, res: any, next: any) => {

    const ticket = Ticket.createDocument({
      ...req.body,
      userId: req.currentUser.id,
    });
    await ticket.save();

    // Publishing event to nats
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      name: ticket.name,
      price: ticket.price,
      userId: ticket.userId.toString(),
      status: ticket.status,
    });

    res.status(201).json({
      status: "success",
      data: ticket,
    });
  }
);

export const getAllTickets = catchAsync(async (req: any, res: any) => {
  const tickets = await Ticket.find();
  res.status(200).json({
    status: "success",
    data: tickets,
  });
});

export const getTicket = catchAsync(async (req: any, res: any, next: any) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return next(new AppError("Ticket not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: ticket,
  });
});

export const updateTicket = catchAsync(
  async (req: any, res: any, next: any) => {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return next(new AppError("Ticket not found", 404));
    }
    if (String(ticket.userId) !== String(req.currentUser.id)) {
      return next(new AppError("You can't update this ticket", 403));
    }

    const {name,price}=req.body
    ticket.set({name,price});
    await ticket.save();

    // Publishing event to nats
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      name: ticket.name,
      price: ticket.price,
      userId: ticket.userId.toString(),
      status: ticket.status,
    });

    res.status(200).json({
      status: "success",
      data: ticket,
    });
  }
);

export const deleteTicket = catchAsync(
  async (req: any, res: any, next: any) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return next(new AppError("Ticket not found", 404));
    }
    if (String(ticket.userId) !== String(req.currentUser.id)) {
      return next(new AppError("You can't delete this ticket", 403));
    }
    await Ticket.findByIdAndDelete(req.params.id);

    // Publishing event to nats
    await new TicketDeletedPublisher(natsWrapper.client).publish({
      id: ticket.id,
    });

    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);
