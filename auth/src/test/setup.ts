import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app"; 

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