import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...");
    }

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
            $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
        });
        
        const question = await Questions.findById(_id);
        question.noOfAnswers = question.answer.length;
        await question.save();

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json("Error in updating");
    }
};

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...");
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer unavailable...");
    }

    try {
        await Questions.updateOne(
            { _id },
            { $pull: { answer: { _id: answerId } } }
        );
        
        const question = await Questions.findById(_id);
        question.noOfAnswers = question.answer.length;
        await question.save();
        
        res.status(200).json({ message: "Successfully deleted..." });
    } catch (error) {
        res.status(405).json(error);
    }
};
