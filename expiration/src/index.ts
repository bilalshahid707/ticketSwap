import { natsWrapper } from "./nats-wrapper";
import {OrderCancelledListener} from "./events/listeners/orderCancelledListener"
import { OrderCreatedListener } from "./events/listeners/orderCreatedListener";
const start = async () => {
  try {
    await natsWrapper.connect(
      "ticketing",
      "expiration-publisher-1",
      "http://nats-service:4222"
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).subscribe()
    new OrderCancelledListener(natsWrapper.client).subscribe()

  } catch (err) {
    console.error("Startup error:", err);
  }
};

start();
