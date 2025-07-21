import express from "express";
import { signup,signin,signOut } from "../middlewares/authController";
import { protect, currentUser } from "@bilal009/common";
const Router = express.Router();

Router.post("/signup", signup);
Router.post("/signin", signin);
Router.get("/signout", signOut);
Router.get("/currentUser", protect, currentUser);

export default Router;
