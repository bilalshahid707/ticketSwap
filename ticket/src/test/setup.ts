import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';

beforeAll(async() => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri())
})

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (!collections) return; 
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// src/test/setup.ts


declare global {
  var signin: () => Promise<string[]>;
}

global.signin = async () => {
  const jwtPayload = {
    id: new mongoose.Types.ObjectId(),
    name: "testName",
    email: "test@test.com"
  }
  
  const token = jwt.sign(jwtPayload, "jwt-secret");
  return token? [ `jwt=${token}` ] : [];
};
