import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import quizApi from "../../api/quizApi";

const SignIn = ({ mode }) => {
  const history = useHistory();
  const { username } = useParams();
  const [newUsername, setNewUsername] = useState("");
  const [newAnswerUsername, setNewAnswerUsername] = useState("");
  const [msg, setMsg] = useState();

  const createUser = async () => {
    if (mode === "user") {
      await quizApi.post(`/quiz/${newUsername}/create`);
    } else {
      await quizApi.post(
        `/quiz/${username}/answer/${newAnswerUsername}/create`,
      );
    }
  };
  // const checkUser = async (name) => {
  //   if (await quizApi.get(`/quiz/${name}`)) {
  //     return true;
  //   }
  //   return false;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "user") {
      if (!newUsername) {
        return setMsg("Please Enter Your Name");
      }
      // const isNew = checkUser(newUsername);
      // console.log(isNew);
      history.push(`/quiz/${newUsername}`);
    } else {
      if (!newAnswerUsername) {
        return setMsg("Please Enter Your Name");
      }
      // const isNew = checkUser(newAnswerUsername);
      // console.log(isNew);

      history.push(`/quiz/${username}/answer/${newAnswerUsername}`);
    }
    createUser();
  };

  const handleChange = (e) => {
    const term = e.target.value;
    if (mode === "user") {
      setNewUsername(term);
    } else {
      setNewAnswerUsername(term);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">What's Your Name?</label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={handleChange}
        />
        <button type="submit">Start The Quiz</button>
      </form>
      {msg ? <h3>{msg}</h3> : null}
    </div>
  );
};

export default SignIn;
