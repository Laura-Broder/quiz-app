import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import quizApi from "../../api/quizApi";
import QuestionAndAnswer from "./QuestionAndAnswer.component";

const Quiz = ({ user, mode, friend }) => {
  const history = useHistory();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({
    q0: 0,
    q1: 0,
    q2: 0,
    q3: 0,
  });

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
      await quizApi.put(`/quiz/${user.name}/update`, answers);
      history.push(`/quiz/${user.name}/my-answers`);
    } else {
      // /quiz/:username/answer/:answerUsername/update
      await quizApi.put(
        `/quiz/${user.name}/answer/${friend.name}/update`,
        answers,
      );
      // quiz/results/:username/summary/:answerUsername
      history.push(`/quiz/${user.name}/answer/${friend.name}/get-score`);
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
      {renderQuiz()}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Quiz;
