import axiosInstance from "./axiosinstance";

export const logIn = (authData) => axiosInstance.post("/auth/login", authData);
export const signUp = (authData) => axiosInstance.post("/auth/signup", authData);

export const postQuestion = (questionData) => axiosInstance.post("/questions/Ask", questionData);
export const getAllQuestions = () => axiosInstance.get("/questions/get");
export const getQuestionById = (id) => axiosInstance.get(`/questions/get/${id}`);
export const deleteQuestion = (id) => axiosInstance.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => axiosInstance.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => 
    axiosInstance.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswers) => 
    axiosInstance.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => axiosInstance.get("/user/getAllUsers");
export const getUserById = (id) => axiosInstance.get(`/user/get/${id}`);
export const updateProfile = (id, updateData) => axiosInstance.patch(`/user/update/${id}`, updateData);
export const deleteUser = (id) => axiosInstance.delete(`/user/delete/${id}`);
