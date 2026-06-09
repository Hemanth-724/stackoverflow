import express from "express";
import { getAllUsers, getUserById, updateProfile, deleteUser } from "../controller/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/get/:id", getUserById);
router.patch("/update/:id", auth, updateProfile);
router.delete("/delete/:id", auth, deleteUser);

export default router;
