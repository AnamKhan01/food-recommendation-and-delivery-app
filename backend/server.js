import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import "dotenv/config"

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: '*', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

cloudinary.config({
    cloud_name: "dannnuwsh",
    api_key: "423856495978955",
    api_secret: "SVDXAmPhExyB6d9rA2HKexnaxu0"
});

app.use(express.json())

connectDB();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use("/api/product", upload.single('image'), productRouter); 
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
