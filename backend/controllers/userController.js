import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from "validator";
import nodemailer from 'nodemailer';

// Helper function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login using email and password
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not registered" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect username or password" });
        }

        const token = createToken(user._id);
        const username = user.name;
        res.json({ success: true, token, username, message: "Login successful" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

// Google authentication
const googleAuth = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            user = new userModel({
                name,
                email,
                password, 
                contactNo: ''  
            });
            await user.save();
        }

        const token = createToken(user._id);
        const username = user.name;
        res.json({ success: true, token, username, message: "Google login successful" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

// Register user manually
const registerUser = async (req, res) => {
    const { name, email, password, contactNo } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format. Please enter a valid email." });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            contactNo
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        const username = user.name;
        res.json({ success: true, token, username, message: "Your account has been successfully created." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

// Forgot password functionality
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const resetLink = `https://flashfeast-bay.vercel.app/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        res.json({ success: true, message: "Reset link sent to your email." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

// Reset password after user clicks on the reset link
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.json({ success: false, message: "Invalid token" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

const sendFeedback = async (req, res) => {
    const { name, email, feedback } = req.body;

    if (!email || !feedback) {
        return res.json({ success: false, message: "All fields are required." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        await transporter.sendMail({
            from: email,
            to: 'flashfeast007@gmail.com',
            subject: `Customer Feedback from ${name}`,
            replyTo: email,
            html: `<p><b>Greetings!!</b><br/><br/>
            You have received a feedback from :<br/> <br/>
            <b>Name: </b>${name}<br/>
            <b>Email: </b>${email}<br/>
            <b>Feedback: </b>${feedback}<br/>
            Thank You!</p>`,
        });

        res.json({ success: true, message: "Your feedback has been submitted." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
};


export { loginUser, registerUser, googleAuth, forgotPassword, resetPassword, sendFeedback};
