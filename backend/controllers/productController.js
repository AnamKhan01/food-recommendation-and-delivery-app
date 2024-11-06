import productModel from "../models/productModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};
const addProduct = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        // Upload image to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);
        
        const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
        
        const product = new productModel({
            id: uniqueId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            image: result.secure_url // Save Cloudinary URL
        });

        await product.save();
        res.json({ success: true, message: "Product added successfully", imageUrl: result.secure_url });
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ success: false, message: "Failed to add product" });
    }
};

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error in listProduct:", error);
        res.status(500).json({ success: false, message: "Failed to list products" });
    }
};

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Extract public ID from the Cloudinary URL to delete the image
        const publicId = product.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error in removeProduct:", error);
        res.status(500).json({ success: false, message: "Failed to remove product" });
    }
};

const searchProduct = async (req, res) => {
    try {
        const searchQuery = req.query.q;

        if (!searchQuery || typeof searchQuery !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid search query" });
        }

        const products = await productModel.find({
            name: { $regex: searchQuery, $options: 'i' }
        });

        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error in searchProduct:", error);
        res.status(500).json({ success: false, message: "Error while searching" });
    }
};

export { addProduct, listProduct, removeProduct, searchProduct };
