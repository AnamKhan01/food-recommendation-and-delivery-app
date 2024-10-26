import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to database
connectDB();

// Define routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve images from /tmp directory
const imagesPath = path.join("/tmp");
app.use("/images", express.static(imagesPath));
console.log("Serving images from:", imagesPath); // Debugging log

// Test API endpoint
app.get("/", (req, res) => {
    res.send("API working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// MongoDB URI (make sure credentials are safe for production)
