import axios from "axios";

const quizApi = axios.create({
  // baseURL: "http://localhost:3005",
  baseURL: "https://broder-quiz-api.herokuapp.com",
});

export default quizApi;
