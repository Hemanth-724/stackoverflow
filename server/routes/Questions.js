import express from "express";

import { AskQuestion, getAllQuestions, getQuestionById, deleteQuestion, voteQuestion } from "../controller/Questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/Ask", auth, AskQuestion);
router.get("/get", getAllQuestions);
router.get("/get/:id", getQuestionById);
router.delete("/delete/:id", auth, deleteQuestion);
router.patch("/vote/:id", auth, voteQuestion);

export default router;
