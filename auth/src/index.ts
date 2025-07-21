import app from "./app";
import mongoose from "mongoose";

mongoose.connect('mongodb://auth-mongo-service:27017/auth').then(()=>{
  console.log("db connection successful")
})
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

