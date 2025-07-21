import User from "../models/user";
import {catchAsync}  from "@bilal009/common";
import {AppError} from "@bilal009/common";
import jwt from "jsonwebtoken";

const signToken = (userId: string, userName: string, userEmail: string): string => {
  return jwt.sign({ id: userId, name: userName, email: userEmail }, "jwt-secret");
};


const createSendToken = (user: any, statusCode: number, res: any) => {
  const token = signToken(user._id, user.name, user.email);
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    data: user,
    token: token,
  });
};

export const signup = catchAsync(async (req: any, res: any, next: any) => {
  const newUser = User.createDocument(req.body);
  await newUser.save();
  createSendToken(newUser, 201, res);
});

export const signin = catchAsync(async (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new AppError("user does not exist", 404));
  }

  if (user && (await user.correctPassword(password, user.password))) {
    createSendToken(user, 200, res);
  } else {
    return next(new AppError("Invalid email or password", 400));
  }
});

export const signOut = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  };
  res.cookie("jwt", "loggedOut", cookieOptions);
  res.status(200).json({ status: "success" });
});
