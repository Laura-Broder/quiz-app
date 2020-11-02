import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import quizApi from "../../api/quizApi";

const SignIn = ({ mode }) => {
  const history = useHistory();
  const { username, userId } = useParams();

  const [newName, setNewName] = useState("");

  const [newUser, setNewUser] = useState("");

  const [msg, setMsg] = useState();

  const createUser = async () => {
    let res = {};
    if (mode === "user") {
      res = await quizApi.post(`/quiz-api/${newName}/create`);
    } else {
      res = await quizApi.post(
        `/quiz-api/${username}/answer/${newName}/create/${userId}`,
      );
    }
    const data = res.data;
    setNewUser(data);
  };

  const goToQuiz = () => {
    if (newUser) {
      if (mode === "user") {
        history.push(`/quiz/${newUser.name}/${newUser._id}`);
      } else {
        history.push(
          `/quiz/${username}/answer/${newName}/${userId}/${newUser._id}`,
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName) {
      return setMsg("Please Enter Your Name");
    }
    createUser();
  };

  useEffect(goToQuiz, [newUser]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">What's Your Name?</label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={(e) => {
            setNewName(e.target.value.toLowerCase());
          }}
        />
        <button type="submit">Start The Quiz</button>
      </form>
      {msg ? <h3>{msg}</h3> : null}
    </div>
  );
};

export default SignIn;
