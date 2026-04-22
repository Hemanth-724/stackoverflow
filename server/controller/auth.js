import user from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    const { name, email, password } = req.body;

    // Server-side validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields (name, email, password) are required" });
    }
    if (name.trim().length < 3) {
        return res.status(400).json({ message: "Name must be at least 3 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email address" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one letter and one number" });
    }

    try {
        const exisitinguser = await user.findOne({ email });
        if (exisitinguser) {
            return res.status(404).json({ message: "User already exist" });
        }
        const hashpassword = await bcrypt.hash(password, 12);
        const newuser = await user.create({
            name,
            email,
            password: hashpassword,
        });

        // Generate token
        const token = jwt.sign({ email: newuser.email, id: newuser._id }, process.env.JWT_SECRET || "test", { expiresIn: "1h" });
        
        res.status(200).json({ data: newuser, token });
    } catch (error) {
        res.status(500).json("something went wrong..");
        return;
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exisitinguser = await user.findOne({ email });
        if (!exisitinguser) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const ispasswordcrct = await bcrypt.compare(
            password,
            exisitinguser.password
        );
        if (!ispasswordcrct) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign({ email: exisitinguser.email, id: exisitinguser._id }, process.env.JWT_SECRET || "test", { expiresIn: "1h" });

        res.status(200).json({ data: exisitinguser, token });
    } catch (error) {
        res.status(500).json("something went wrong..");
        return;
    }
};
