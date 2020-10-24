import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import quizApi from "../../api/quizApi";

const FriendSummery = () => {
  const [score, setScore] = useState();
  const { username, answerUsername } = useParams();
  const history = useHistory();
  const basePath = window.location.origin;

  useEffect(() => {
    const getScore = async () => {
      const res = await quizApi.put(
        `/quiz/${username}/answer/${answerUsername}/get-score`,
      );
      setScore(res.data);
    };
    getScore();
  }, [username, answerUsername]);

  const renderScore = () => {
    if (score) {
      const { correctAnswers, total } = score;
      return (
        <div>
          <h3>
            {correctAnswers}/{total}
          </h3>
        </div>
      );
    }
  };
  const showResults = () => {
    history.push(`/quiz/${username}/results`);
  };
  return (
    <div>
      <h3>Hi {answerUsername}</h3>
      <h1>Your Score for {username}'s Quiz is:</h1>
      {renderScore()}
      <button type="button" onClick={showResults}>
        See All Friends Rank!
      </button>
    </div>
  );
};

export default FriendSummery;
