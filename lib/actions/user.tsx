"use server";

import { connectToDB } from "../connectDb";
import UserInterface from "../interfaces";
import { User } from "../models/user";



export const updateUser = async (
  userInfo: UserInterface
) => {
  try {
    await connectToDB();
    const newUser = await User.findOneAndUpdate(
      { userId: userInfo.userId },
      { ...userInfo, onboarded: true },
      { upsert: true }
    ).lean();
    return newUser;
  } catch (err) {
    console.log("Failed to update/create user", err);
  }
};

export const fetchUser = async (userId: string) => {
    try {
        await connectToDB();
    return await User.findOne({ userId: userId }).lean();
  } catch (err) {
    console.log(err);
    return err;
  }
};
