import mongoose from "mongoose";
import User from "../models/auth.js";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = [];
        allUsers.forEach((user) => {
            allUserDetails.push({
                _id: user._id,
                name: user.name,
                about: user.about,
                tags: user.tags,
                joinDate: user.joinDate,
            });
        });
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User unavailable...");
    }

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            about: user.about,
            tags: user.tags,
            joinDate: user.joinDate,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User unavailable...");
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate(
            _id,
            { $set: { name: name, about: about, tags: tags } },
            { new: true }
        );
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
};
