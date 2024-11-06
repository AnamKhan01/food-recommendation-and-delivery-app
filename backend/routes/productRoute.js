import express from "express";
import { addProduct, listProduct, removeProduct, searchProduct } from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// Use memory storage instead of disk storage, as the image is uploaded directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a product, with image upload handling
productRouter.post("/add", upload.single("image"), async (req, res, next) => {
    try {
        // Ensure image file is provided
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is missing" });
        }

        // Call the addProduct controller function
        await addProduct(req, res);
    } catch (error) {
        console.error("Error in /add route:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Route for listing products
productRouter.get("/list", listProduct);

// Route to remove a product
productRouter.post("/remove", removeProduct);

// Route to search for products
productRouter.get("/search", searchProduct);

export default productRouter;
