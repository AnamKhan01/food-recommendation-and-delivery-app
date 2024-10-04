import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";

const app = express();
const port = 3001;

app.use(express.json())
app.use(cors())

connectDB();

app.use("/api/product",productRouter);
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API working");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


//mongodb+srv://flashfeast:6394170602@cluster0.is52t.mongodb.net/?