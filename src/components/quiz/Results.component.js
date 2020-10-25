import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import quizApi from "../../api/quizApi";

const Results = () => {
  const [friendsRank, setFriendsRank] = useState();
  const { username } = useParams();

  useEffect(() => {
    const getResults = async () => {
      const res = await quizApi.get(`/quiz/${username}/results`);
      setFriendsRank(res.data);
    };
    getResults();
  }, [username]);

  const renderResults = () => {
    if (friendsRank) {
      let renderedAnswers = friendsRank.friendsScore.map(
        (friendScore, index) => {
          return (
            <h3 key={index}>
              {friendScore.friendName} was correct in {friendScore.score} of{" "}
              {friendsRank.total} questions{" "}
            </h3>
          );
        },
      );

      return renderedAnswers;
    }
  };

  return (
    <div>
      <h3>Hi {username}</h3>
      <h1>Here are your friends results:</h1>
      {renderResults()}
      <Link to={`/quiz/${username}/new-answer/sign-in`}>Link</Link>
    </div>
  );
};

export default Results;
