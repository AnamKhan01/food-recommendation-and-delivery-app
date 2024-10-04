import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://flashfeast:6394170602@cluster0.is52t.mongodb.net/flash-feast').then(()=>{
        console.log("DB connected");
    })
}