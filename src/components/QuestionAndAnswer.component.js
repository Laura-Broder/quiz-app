import React from "react";

const QuestionAndAnswer = ({ qAndA, index, onChange }) => {
  const renderQuestions = (answers) => {
    return answers.map((answer, answerIndex) => {
      return (
        <div key={answerIndex}>
          <input type="radio" name={`a${index}`} value={answer} />
          <label htmlFor={`a${answerIndex + 1}`} value={answer}>
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
