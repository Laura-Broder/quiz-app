import React, { useEffect, useState } from "react";
import quizApi from "../../api/quizApi";

const FriendSummery = ({ user, friend }) => {
  const [score, setScore] = useState();

  useEffect(() => {
    const getScore = async () => {
      const res = await quizApi.put(
        `/quiz/${user.name}/answer/${friend.name}/get-score`,
      );
      setScore(res.data);
    };
    getScore();
  }, [user, friend]);

  const renderScore = () => {
    console.log(score);
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

  return <div>{renderScore()}</div>;
};

export default FriendSummery;
