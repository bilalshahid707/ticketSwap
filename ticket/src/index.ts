import app from "./app";
import mongoose from "mongoose";
import {natsWrapper} from "./nats-wrapper";

try{
  natsWrapper.connect('ticketing','ticket-publisher-1',"http://nats-service:4222")
  mongoose.connect('mongodb://ticket-mongo-service:27017/ticket').then(()=>{
    console.log("db connection successful")
  })
}catch(err){
  console.log(err)
}
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

