import express from "express";
import {errorHandler} from "@bilal009/common"
import cookieParser from 'cookie-parser';
import ticketRouter from "./routes/ticketRoutes"
const cors = require('cors')
export const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*"
}))

// Routes
app.use("/api/v1/tickets",ticketRouter);
app.use (errorHandler);

export default app