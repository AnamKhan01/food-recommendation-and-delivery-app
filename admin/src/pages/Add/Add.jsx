import React, { useState } from 'react';
import upload from '../../assets/up-loading.png';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const url = 'https://flashfeast-backend.vercel.app';

    const [image, setImage] = useState(null); // Changed initial state to null
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "fruits and vegetables",
        price: "",
        quantity: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Creating FormData object to hold the data for submission
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("quantity", data.quantity);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image); // Add image file

        try {
            // Sending POST request to backend
            const response = await axios.post(`${url}/api/product/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                // Reset form after successful upload
                setData({
                    name: "",
                    description: "",
                    category: "fruits and vegetables",
                    price: "",
                    quantity: ""
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error uploading product:", error);
            toast.error("Failed to add product. Please try again.");
        }
    };

    return (
        <div className='add'>
            <h2 className='form-heading'>Add Product Details</h2>
            <form onSubmit={onSubmitHandler} className='flex-col'>
                <div className="name-image">
                    <div className="add-product-name flex-col">
                        <p>Product Name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
                    </div>
                    <div className="add-image-upload flex-col">
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img className='upload-icon' src={image ? URL.createObjectURL(image) : upload} alt="Product" />
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                    </div>
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Type content here' />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="fruits and vegetables">Fruits and Vegetables</option>
                            <option value="pantry staples">Pantry Staples</option>
                            <option value="meat">Chicken, Meat and Fish</option>
                            <option value="dairy">Dairy Products</option>
                            <option value="breads">Snacks and Breads</option>
                            <option value="masala and oil">Masala and Oil</option>
                            <option value="sauces">Sauces and Spreads</option>
                            <option value="beverages">Beverages</option>
                        </select>
                    </div>
                    <div className='add-quantity-price'>
                        <div className="add-product-quantity flex-col">
                            <p>Product Quantity</p>
                            <input onChange={onChangeHandler} value={data.quantity} type="text" name="quantity" placeholder='Type here' />
                        </div>
                        <div className="add-product-price flex-col">
                            <p>Product Price</p>
                            <input onChange={onChangeHandler} value={data.price} type="text" name="price" placeholder='₹20' />
                        </div>
                    </div>
                </div>
                <button className='admin-add-button' type='submit'>Add</button>
            </form>
        </div>
    );
};

export default Add;
