// import request from 'supertest';
// import mongoose from 'mongoose';
// import app  from '../../app';
// import Ticket from "../../models/ticket";
// import jwt  from 'jsonwebtoken';

// jest.mock("../../nats-wrapper.ts");


// // const createTicket = async () => {
// //   const ticket = Ticket.createDocument({
// //     _id:"dummy id",
// //     name: 'Concert',
// //     price: 100,
// //     userId: new mongoose.Types.ObjectId()
// //   });
// //   await ticket.save();
// //   return ticket;
// // };

// it("should return 201 on ticket created",async()=>{
//     const token = await global.signin()
//     const ticket = await createTicket()
//     const response = await request(app).post("/api/v1/orders").set('Cookie',token).send({
//         ticketId:ticket.id,
//         ticketName:ticket.name,
//         userId:new mongoose.Types.ObjectId
//     })

//   expect(response.status).toBe(201);
//   expect(response.body.data).toHaveProperty('_id');
//   expect(response.body.data.ticketId).toBe(ticket.id.toString());
//   expect(response.body.data.ticketName).toBe(ticket.name);
//   expect(response.body.data.status).toBe('pending');
// })

// it("should return 404 on no ticket found",async()=>{
//     const token = await global.signin()
//     const response = await request(app).post("/api/v1/orders").set('Cookie',token).send({
//         ticketId:new mongoose.Types.ObjectId(),
//         ticketName:"Not valid ticket",
//         userId:new mongoose.Types.ObjectId()
//     })

//     expect(response.status).toBe(404);
//     expect(response.body.message).toBe("No ticket found");
// })

