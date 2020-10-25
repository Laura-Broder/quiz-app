import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import quizApi from "../../api/quizApi";

const MyAnswers = () => {
  const [userAnswers, setUserAnswers] = useState();
  const [quiz, setQuiz] = useState([]);
  const { username } = useParams();
  const basePath = window.location.origin;

  useEffect(() => {
    const getQuiz = async () => {
      const res = await quizApi.get("/quiz");
      setQuiz(res.data.quiz);
    };
    getQuiz();
  }, []);

  useEffect(() => {
    const getAnswers = async () => {
      const res = await quizApi.get(`/quiz/${username}`);
      setUserAnswers(res.data.quizAnswers);
    };
    getAnswers();
  }, [username]);

  const renderAnswers = () => {
    if (userAnswers) {
      let renderedAnswers = [];
      let i = 0;
      for (const q in userAnswers) {
        const question = quiz[i][q];
        const answer = quiz[i][`a${i}`][userAnswers[q]];
        i++;
        renderedAnswers.push(
          <div key={i}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>,
        );
      }
      return renderedAnswers;
    }
  };

  return (
    <div>
      <h3>Hi {username}</h3>
      <h1>This Is What You Answered:</h1>
      {renderAnswers()}
      <Link to={`/quiz/${username}/new-answer/sign-in`}>Link</Link>
    </div>
  );
};

export default MyAnswers;
