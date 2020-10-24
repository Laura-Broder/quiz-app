import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import quizApi from "../../api/quizApi";

const SignIn = ({ onSubmit, mode, user }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [answerUsername, setAnswerUsername] = useState("");
  const [msg, setMsg] = useState();

  const createUser = async () => {
    let res = {};
    if (mode === "user") {
      res = await quizApi.post(`/quiz/${username}/create`);
    } else {
      // setUsername(user.name);
      res = await quizApi.post(
        `/quiz/${user.name}/answer/${answerUsername}/create`,
      );
    }
    onSubmit(res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "user") {
      if (!username) {
        return setMsg("Please Enter Your Name");
      }
      history.push(`/quiz/${username}`);
    } else {
      if (!answerUsername) {
        return setMsg("Please Enter Your Name");
      }
      history.push(`/quiz/${user.name}/answer/${answerUsername}`);
    }
    createUser();
  };
  const handleChange = (e) => {
    const term = e.target.value;
    if (mode === "user") {
      console.log(term);
      setUsername(term);
    } else {
      setAnswerUsername(term);
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
