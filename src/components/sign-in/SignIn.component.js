import React, { useState } from "react";
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";
import quizApi from "../../api/quizApi";

const SignIn = ({ onSubmit }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState();

  const createUser = async () => {
    const res = await quizApi.post(`/quiz/${username}/create`);
    onSubmit(res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      return setMsg("Please Enter Your Name");
    }
    createUser(username);
    history.push(`/quiz/${username}`);
  };
  const handleChange = (e) => {
    const term = e.target.value;
    setUsername(term);
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
