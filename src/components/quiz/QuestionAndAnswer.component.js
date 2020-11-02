import React from "react";

const QuestionAndAnswer = ({ qAndA, onChange }) => {
  const renderAnswers = (answers) => {
    return answers.map((answer, answerIndex) => {
      return (
        <div key={answerIndex}>
          <input
            type="radio"
            name={`q${qAndA.qNum}`}
            value={answerIndex}
            onChange={(e) => {
              onChange({ qNum: qAndA.qNum, aNum: e.target.value });
            }}
          />
          <label htmlFor={`a${answerIndex}`} value={`a${answerIndex}`}>
            {answer}
          </label>
        </div>
      );
    });
  };
  return (
    <div>
      <p>{qAndA.q}</p>
      {renderAnswers(qAndA.a)}
    </div>
  );
};
export default QuestionAndAnswer;
