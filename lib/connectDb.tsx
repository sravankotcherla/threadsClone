'use server'
import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URL;

export const connectToDB = async () => {
    let isConnected=false
    if (!connectionString) {
        console.log("Could not find MONGODB_URL");
        return
    }
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(connectionString);
        console.log("Connected To DB");
        isConnected = true;
    } catch (err) {
        console.log("Connection to DB failed")
        console.log(err);
    }
}