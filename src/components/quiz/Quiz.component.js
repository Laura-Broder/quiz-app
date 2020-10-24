import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import quizApi from "../../api/quizApi";
import QuestionAndAnswer from "./QuestionAndAnswer.component";

const Quiz = ({ mode }) => {
  const history = useHistory();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({
    q0: "0",
    q1: "0",
    q2: "0",
    q3: "0",
  });
  const { username, answerUsername } = useParams();

  const getQuiz = async () => {
    const res = await quizApi.get("/quiz");
    setQuiz(res.data.quiz);
    return res.data.quiz;
  };
  const handleAnswerChange = (answer) => {
    const qNum = Object.keys(answer);
    const oldAnswers = answers;
    oldAnswers[qNum] = answer[qNum];
    setAnswers({ ...oldAnswers });
  };
  const saveAnswers = async () => {
    if (mode === "user") {
      await quizApi.put(`/quiz/${username}/update`, answers);
      history.push(`/quiz/${username}/my-answers`);
    } else {
      await quizApi.put(
        `/quiz/${username}/answer/${answerUsername}/update`,
        answers,
      );
      history.push(`/quiz/${username}/answer/${answerUsername}/get-score`);
    }
  };

  const renderQuiz = () => {
    if (quiz.length) {
      return quiz.map((qAndA, index) => {
        return (
          <QuestionAndAnswer
            qAndA={qAndA}
            key={index}
            index={index}
            onChange={handleAnswerChange}
          />
        );
      });
    }
  };
  const renderWelcomeMsg = () => {
    if (mode === "user") {
      return (
        <div>
          <h3>Hi {username}</h3>
          <h1>How Well Do You Know Me Quiz</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Hi {answerUsername}</h3>
          <h1>How Well Do You Know {username} Quiz</h1>
        </div>
      );
    }
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const onQuizSubmit = (e) => {
    e.preventDefault();
    saveAnswers();
    console.log("submitted");
  };
  return (
    <form onSubmit={onQuizSubmit}>
      {renderWelcomeMsg()}

      {renderQuiz()}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Quiz;
