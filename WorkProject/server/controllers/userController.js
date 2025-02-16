import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import mongoose from "mongoose";

const signupUser = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        generateTokenAndSetCookie(savedUser._id, res);

        res.status(201).json({
            _id: savedUser._id,
            displayName: savedUser.displayName,
            email: savedUser.email,
        });
    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            displayName: user.displayName,
            email: user.email,
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ error: "User not authenticated" });
        }
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in logoutUser: ", err.message);
    }
};



export  {
    signupUser,
    loginUser,
    logoutUser,
}
