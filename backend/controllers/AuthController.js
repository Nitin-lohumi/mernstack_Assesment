import UserData from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const verifySignup = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        if (!email || !password || !name || !role) {
            return res.status(400).json({ message: "All fields (name, email, password, role) are required." });
        }
        const existingUser = await UserData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserData({
            name,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        const tokenPayload = {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        return res.status(201).json({
            message: "Signup successful",
            user: tokenPayload,
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password, and role are required." });
        }
        const user = await UserData.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });
        if (user.role !== role) {
            return res.status(403).json({ message: `This account is not registered as a ${role}.` });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }
        const tokenPayload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        return res.status(200).json({
            message: "Login successful",
            user: tokenPayload,
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
