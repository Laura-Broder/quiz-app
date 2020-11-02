import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import quizApi from "../../api/quizApi";
import QuestionAndAnswer from "./QuestionAndAnswer.component";

const Quiz = ({ mode }) => {
  const history = useHistory();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { username, userId, answerUsername, friendId } = useParams();

  const handleAnswerChange = (answer) => {
    console.log(answer);
    const newAnswers = [...answers];
    newAnswers[answer.qNum] = answer;

    setAnswers([...newAnswers]);
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
    console.log(answers);
    if (quiz.length) {
      return quiz.map((qAndA, index) => {
        return (
          <QuestionAndAnswer
            qAndA={qAndA}
            key={index}
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
          <h1>How Well Do They Know You Quiz</h1>
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
    const getQuiz = async () => {
      const res = await quizApi.get("/quiz-api/5f9c4a8c728fc14a0c0b239b");
      setQuiz(res.data.quiz);
    };
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
