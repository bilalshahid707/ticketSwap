import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/authRoutes";
import { errorHandler } from "@bilal009/common";
export const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*"
}))

// Routes
app.use("/api/v1/users",authRouter);
app.use (errorHandler);

export default app