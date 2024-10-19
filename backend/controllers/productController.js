import productModel from "../models/productModel.js";
import fs from 'fs';

const addProduct = async(req,res) => {
    let image_filename = `${req.file.filename}`;

    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

    const product = new productModel({
        id:uniqueId,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        category:req.body.category,
        image:image_filename
    })

    try{
        await product.save();
        res.json({success:true,message:"Product Added"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const listProduct = async(req,res) => {
    try{
        const products = await productModel.find({});
        res.json({success:true,data:products})    
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const removeProduct = async(req,res) => {
    try{
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`,()=>{});
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product removed"})    
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const searchProduct = async (req, res) => {
    try {
      const searchQuery = req.query.q;
  
      if (!searchQuery || typeof searchQuery !== 'string') {
        return res.json({ success: false, message: 'Invalid search query' });
      }
  
      const products = await productModel.find({
        name: { $regex: searchQuery, $options: 'i' } 
      });
  
      res.json({ success: true, data: products });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Error while searching' });
    }
  };
  


export {addProduct,listProduct,removeProduct, searchProduct}