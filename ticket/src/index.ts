import app from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/orderCreatedListener";
import { OrderCancelledListener } from './events/listeners/orderCancelledListener';


const start = async () => {
  try {
    await natsWrapper.connect(
      "ticketing",
      "ticket-publisher-1",
      "http://nats-service:4222"
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());


    await mongoose.connect("mongodb://ticket-mongo-service:27017/ticket");
    console.log("db connection successful");

    new OrderCreatedListener(natsWrapper.client).subscribe();
    new OrderCancelledListener(natsWrapper.client).subscribe()
    
    app.listen(3000, () => {
      console.log("Server is running on port 3000!!");
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
};

start();
