import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import FriendSummery from "./components/quiz/FriendSummery.component";
import MyAnswers from "./components/quiz/MyAnswers.component";
import Quiz from "./components/quiz/Quiz.component";
import Results from "./components/quiz/Results.component";
import SignIn from "./components/sign-in/SignIn.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/new-quiz/sign-in">sign-in</Link>

        <Route
          exact
          path="/new-quiz/sign-in"
          children={<SignIn mode="user" />}></Route>

        <Route
          exact
          path={`/quiz/:username`}
          children={<Quiz mode="user" />}></Route>

        <Route
          exact
          path={`/quiz/:username/my-answers`}
          children={<MyAnswers />}></Route>

        <Route
          exact
          path={`/quiz/:username/new-answer/sign-in`}
          children={<SignIn mode="friend" />}></Route>

        <Route
          exact
          path={`/quiz/:username/answer/:answerUsername`}
          children={<Quiz mode="friend" />}></Route>

        <Route
          exact
          path={`/quiz/:username/answer/:answerUsername/get-score`}
          children={<FriendSummery />}></Route>

        <Route
          exact
          path={`/quiz/:username/results`}
          children={<Results />}></Route>
      </Router>
    </div>
  );
}

export default App;
