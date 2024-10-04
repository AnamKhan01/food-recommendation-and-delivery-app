import React, { useState } from 'react'
import upload from '../../assets/up-loading.png';
import './Add.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

    const url = 'http://localhost:3001';

    const [image, setimage] = useState(false);
    const [data, setdata] = useState({
        name: "",
        description: "",
        category: "Fruits and Vegetables",
        price: "",
        quantity: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("quantity", data.quantity);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/product/add, formData`);

        if (response.data.success) {
            setdata({
                name: "",
                description: "",
                category: "Fruits and Vegetables",
                price: "",
                quantity: "",
            })
            setimage(false);
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className='flex-col'>
                <div className="name-image">
                    <div className="add-product-name flex-col">
                        <p>Product Name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
                    </div>
                    <div className="add-image-upload flex-col">
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img className='upload-icon' src={image ? URL.createObjectURL(image) : upload} alt="" />
                        </label>
                        <input onChange={(e) => setimage(e.target.files[0])} type="file" id="image" hidden required />
                    </div>
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Type content here' />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
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
                    <div className="add-product-quantity flex-col">
                        <p>Product Quanity</p>
                        <input onChange={onChangeHandler} value={data.quantity} type="text" name="quantity" placeholder='Type here' />
                    </div>
                    <div className="add-product-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="text" name="price" placeholder='₹20' />
                    </div>
                </div>
                <button className='admin-add-button' type='submit'>Add</button>
            </form>

        </div>
    )
}

export default Add