import React from 'react';

const QuizEnd = ({ totalScore,totalQuestions }) => {
  return (
    <>
      <h2>Correct: {totalScore}/{totalQuestions}</h2>
      <div>Thank you for taking the quiz</div>
    </>
  );
};

export default QuizEnd;
