import express from "express";
import { addProduct, listProduct, removeProduct, searchProduct } from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// Use memory storage instead of disk storage, as the image is uploaded directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

productRouter.post("/add", upload.single("image"), addProduct);

// Route for listing products
productRouter.get("/list", listProduct);

// Route to remove a product
productRouter.post("/remove", removeProduct);

// Route to search for products
productRouter.get("/search", searchProduct);

export default productRouter;
