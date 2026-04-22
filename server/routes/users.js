import express from "express";
import { getAllUsers, getUserById, updateProfile } from "../controller/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/get/:id", getUserById);
router.patch("/update/:id", auth, updateProfile);

export default router;
