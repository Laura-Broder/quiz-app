import React from "react";

const QuestionAndAnswer = ({ qAndA, index, onChange }) => {
  const renderQuestions = (answers) => {
    return answers.map((answer, answerIndex) => {
      return (
        <div key={answerIndex}>
          <input
            type="radio"
            name={`q${index}`}
            value={answer}
            id={`a${answerIndex + 1}`}
            onChange={(e) => {
              onChange({ qNum: e.target.name, aNum: e.target.id });
            }}
          />
          <label htmlFor={`a${answerIndex + 1}`} value={`a${answerIndex + 1}`}>
            {answer}
          </label>
        </div>
      );
    });
  };
  return (
    <div>
      <p>{qAndA[`q${index + 1}`]}</p>
      {renderQuestions(qAndA[`a${index + 1}`])}
    </div>
  );
};
export default QuestionAndAnswer;
