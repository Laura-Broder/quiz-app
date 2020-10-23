import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Quiz from "./components/quiz/Quiz.component";
import SignIn from "./components/sign-in/SignIn.component";

function App() {
  const [user, setUser] = useState({});
  const startQuiz = (newUser) => {
    console.log(newUser);
    setUser(newUser);
  };
  return (
    <div className="App">
      <Router>
        <Link to="/quiz/sign-in">sign-in</Link>
        {/* <Link to="/quiz">Quiz</Link> */}

        <Route exact path="/quiz/sign-in">
          <SignIn onSubmit={startQuiz} />
        </Route>

        <Route exact path={`/quiz/${user.name}`}>
          <h3>Hi {user.name}</h3>
          <h1>How Well Do You Know Me Quiz</h1>
          <Quiz user={user} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
