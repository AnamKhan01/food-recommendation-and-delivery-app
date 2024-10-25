import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config"

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: ["https://flashfeast-bay.vercel.app", "https://flashfeast-admin.vercel.app/"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json())

connectDB();

app.use("/api/product",productRouter);
app.use("/images", express.static('/tmp'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API working");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


//mongodb+srv://flashfeast:6394170602@cluster0.is52t.mongodb.net/?
