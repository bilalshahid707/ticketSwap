import app from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";

import { TicketCreatedListener } from "./events/listeners/ticketCreatedListener";
import { TicketDeletedListener } from './events/listeners/ticketDeletedListener';
import { TicketUpdatedListener } from './events/listeners/ticketUpdatedListener';
import { ExpirationCompletedListener } from "./events/listeners/expirationCompletedListener"

const start = async () => {
  try {
    await natsWrapper.connect(
      "ticketing",
      "order-publisher-1",
      "http://nats-service:4222"
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());


    await mongoose.connect("mongodb://order-mongo-service:27017/order");
    console.log("db connection successful");

    new TicketCreatedListener(natsWrapper.client).subscribe();
    new TicketUpdatedListener(natsWrapper.client).subscribe();
    new TicketDeletedListener(natsWrapper.client).subscribe();
    new ExpirationCompletedListener(natsWrapper.client).subscribe();

    app.listen(3000, () => {
      console.log("Server is running on port 3000!!");
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
};

start();
