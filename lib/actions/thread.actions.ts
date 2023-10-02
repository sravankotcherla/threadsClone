"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../connectDb";
import { Thread } from "../models/thread";

import { User } from "../models/user";

interface Params {
  text: string;
  author: string;
  community?: string | null;
  path?: string;
}

export async function createThread(thread: Params) {
  const { text, author, community, path } = thread;
  await connectToDB();
  debugger;
  console.log(Thread);
  const newThread = await Thread.create({
    text,
    author,
    community: null,
  });
  console.log(newThread);
  await User.findOneAndUpdate(
    { _id: author },
    { $push: { threads: newThread._id } }
  );
  return newThread;
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  await connectToDB();
  const skipAmount = (pageNumber - 1) * pageSize;
  try {
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const threads = await Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ created: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: "users",
        select: "userId name parentId profile_photo",
      })
      .populate({
        path: "children",
        model: "threads",
        populate: {
          path: "author",
          model: "users",
          select: "userId name parentId profile_photo",
        },
      });
    const isLastPage = totalPostsCount <= skipAmount + threads.length;
    return { threads, isLastPage };
  } catch (error) {
    return error;
  }
}

export async function fetchThread(threadId: string) {
  try {
    connectToDB();
    const reqThread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: "users",
        select: "userId name profile_photo",
      })
      .populate({
        path: "children",
        model: "threads",
        populate: {
          path: "author",
          model: "users",
          select: "userId name profile_photo",
        },
      })
      .exec();
    return reqThread;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();
  console.log(threadId, commentText, userId);
  try {
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("Thread Not Found");
    }
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });
    const savedCommentThread = await commentThread.save();

    await Thread.findOneAndUpdate(
      { _id: threadId },
      { $push: { children: savedCommentThread._id } }
    );
    revalidatePath(path);
    return savedCommentThread;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchUserThreads(userId: string) {
  try {
      connectToDB();
      console.log("h1",userId);
    const threads = await User.findOne({ userId: userId }).populate({
      path: "threads",
      model: "threads",
      populate: {
        path: "children",
        model: "threads",
        populate: {
          path: "author",
          model: "users",
          select: "userId name profile_photo",
        },
      },
    });
      return threads;
  } catch (error) {
    console.log(error);
    return error;
  }
}
