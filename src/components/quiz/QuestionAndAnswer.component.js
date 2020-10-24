import React from "react";

const QuestionAndAnswer = ({ qAndA, index, onChange }) => {
  const renderQuestions = (answers) => {
    return answers.map((answer, answerIndex) => {
      return (
        <div key={answerIndex}>
          <input
            type="radio"
            name={`q${index}`}
            value={answerIndex}
            onChange={(e) => {
              onChange({ [e.target.name]: e.target.value });
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
      <p>{qAndA[`q${index}`]}</p>
      {renderQuestions(qAndA[`a${index}`])}
    </div>
  );
};
export default QuestionAndAnswer;
