"use server";

import { connectToDB } from "../connectDb";
import { User } from "../models/user";

interface UserInterface {
  userId: string;
  name: string;
  username: string;
  profile_photo: string;
  bio: string;
  onboarded: boolean;
  threads: Object[];
}

export const updateUser: Promise<UserInterface> = async (
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

export const fetchUser: Promise<UserInterface> = async (userId: string) => {
    try {
        await connectToDB();
    const reqUser = await User.findOne({ userId: userId }).lean();
    const response = reqUser
      ? {
          userId: reqUser.userId,
          name: reqUser.name,
          username: reqUser.username,
          bio: reqUser.bio,
          onboarded: reqUser.onboarded,
          profile_photo: reqUser.profile_photo,
        }
        : null;
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
