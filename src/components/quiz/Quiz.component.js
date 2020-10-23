import React, { useEffect, useState } from "react";
import quizApi from "../../api/quizApi";
import QuestionAndAnswer from "./QuestionAndAnswer.component";

const Quiz = ({ user }) => {
  const [quiz, setQuiz] = useState([]);
  // const [answers, setAnswers] = useState({});

  const getQuiz = async () => {
    const res = await quizApi.get("/quiz");
    setQuiz(res.data.quiz);
    return res.data.quiz;
  };

  const renderQuiz = () => {
    if (quiz.length) {
      return quiz.map((qAndA, index) => {
        return (
          <QuestionAndAnswer
            qAndA={qAndA}
            key={index}
            index={index}
            onChange={(e) => {
              console.log(e);
            }}
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
