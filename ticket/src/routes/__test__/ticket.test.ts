import request from 'supertest';
import mongoose from 'mongoose';
import app  from '../../app';
import Ticket from "../../models/ticket";
import jwt  from 'jsonwebtoken';
const createTicket = async () => {
  const ticket = Ticket.createDocument({
    name: 'Concert',
    price: 100,
    userId: new mongoose.Types.ObjectId()
  });
  await ticket.save();
  return ticket;
};

jest.mock("../../events/__mocks__/natsWrapper");

describe('Ticket Routes', () => {
  it('should not allow unauthenticated user to create ticket', async () => {
    await request(app)
      .post('/api/v1/tickets')
      .send({ name: 'Test', price: 10 }).expect(400);
  });

  it('should create a ticket with valid input and authenticated user', async () => {
    const token = await global.signin();
    const res = await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', token)
      .send({ name: 'Valid Ticket', price: 50, userId: new mongoose.Types.ObjectId() });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe('Valid Ticket');
  });

  it('should get all tickets', async () => {
    await createTicket();
    await createTicket();

    const res = await request(app).get('/api/v1/tickets');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('should return 404 if ticket not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/v1/tickets/${id}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return a specific ticket by ID', async () => {
    const ticket = await createTicket();

    const res = await request(app).get(`/api/v1/tickets/${ticket.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Concert');
  });

  it('should not allow unauthorized user to update ticket', async () => {
    const ticket = await createTicket();
    const token = await global.signin(); // Different user

    const res = await request(app)
      .patch(`/api/v1/tickets/${ticket.id}`)
      .set('Cookie', token)
      .send({ name: 'Updated', price: 999 });

    expect(res.statusCode).toBe(403);
  });

  it('should allow authorized user to update ticket', async () => {
    const userId = new mongoose.Types.ObjectId();
    const ticket = Ticket.createDocument({
      name: 'UpdateMe',
      price: 30,
      userId
    });
    await ticket.save();

    const token = await global.signin();

    const res = await request(app)
      .patch(`/api/v1/tickets/${ticket.id}`)
      .set('Cookie', token)
      .send({ name: 'Updated', price: 99 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Updated');
  });

  it('should delete ticket if user is authorized', async () => {
    const userId = new mongoose.Types.ObjectId();
    const ticket = Ticket.createDocument({
      name: 'DeleteMe',
      price: 20,
      userId
    });
    await ticket.save();

    const token = await global.signin();

    const res = await request(app)
      .delete(`/api/v1/tickets/${ticket.id}`)
      .set('Cookie', token);

    expect(res.statusCode).toBe(200);

    const found = await Ticket.findById(ticket.id);
    expect(found).toBeNull();
  });
});
