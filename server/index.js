import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

app.get("/", (req, res) => {
    res.send("Stackoverflow clone is running perfect");
});

const PORT = process.env.PORT || 8080;
const databaseurl = process.env.MONGODB_URL;

mongoose.connect(databaseurl)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err.message));
