import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quizApi from "../../api/quizApi";

const MyAnswers = ({ user }) => {
  const [userAnswers, setUserAnswers] = useState();
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const getQuiz = async () => {
      const res = await quizApi.get("/quiz");
      setQuiz(res.data.quiz);
    };
    getQuiz();
  }, []);

  useEffect(() => {
    const getAnswers = async () => {
      const res = await quizApi.get(`/quiz/${user.name}`);
      setUserAnswers(res.data.quizAnswers);
    };
    getAnswers();
  }, [user]);

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
  // const renderUrl = () => {
  //   return (
  //     <div>
  //       <a
  //         href={`/quiz/${user.name}/answer/sign-in`}>{`/quiz/${user.name}/answer/sign-in`}</a>
  //     </div>
  //   );
  // };

  return (
    <div>
      {renderAnswers()}
      <Link
        to={`/quiz/${user.name}/answer/sign-in`}>{`/quiz/${user.name}/answer/sign-in`}</Link>

      {/* {renderUrl()} */}
    </div>
  );
};

export default MyAnswers;
