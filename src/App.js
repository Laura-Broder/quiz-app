import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import FriendSummery from "./components/quiz/FriendSummery.component";
import MyAnswers from "./components/quiz/MyAnswers.component";
import Quiz from "./components/quiz/Quiz.component";
import SignIn from "./components/sign-in/SignIn.component";

function App() {
  const [user, setUser] = useState({});
  const [friend, setFriend] = useState({});

  return (
    <div className="App">
      <Router>
        <Link to="/quiz/sign-in">sign-in</Link>

        <Route exact path="/quiz/sign-in">
          <SignIn
            mode="user"
            onSubmit={(newUser) => {
              console.log(newUser);
              setUser(newUser);
            }}
          />
        </Route>

        <Route exact path={`/quiz/:username`}>
          <h3>Hi {user.name}</h3>
          <h1>How Well Do You Know Me Quiz</h1>
          <Quiz mode="user" user={user} />
        </Route>

        <Route exact path={`/quiz/:username/my-answers`}>
          <h3>Hi {user.name}</h3>
          <h1>This Is What You Answered:</h1>
          <MyAnswers user={user} />
        </Route>

        <Route exact path={`/quiz/:username/answer/sign-in`}>
          <SignIn
            user={user}
            mode="friend"
            onSubmit={(newFriend) => {
              setFriend(newFriend);
            }}
          />
        </Route>

        <Route exact path={`/quiz/:username/answer/:answerUsername`}>
          <h3>Hi {friend.name}</h3>
          <h1>How Well Do You Know {user.name} Quiz</h1>
          <Quiz mode="friend" user={user} friend={friend} />
        </Route>

        <Route exact path={`/quiz/:username/answer/:answerUsername/get-score`}>
          <h3>Hi {friend.name}</h3>
          <h1>Your Score for {user.name}'s Quiz is:</h1>
          <FriendSummery user={user} friend={friend} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
