import React, { useEffect } from 'react';
import QuizSummary from './UtilComponents/QuizSummary';

const QuizEnd = ({
  quizData,
  totalScore,
  setTotalScore,
  totalQuestions,
  allAnswers,
  userGivenOptions,
}) => {
  const checkScore = (actualAnswers, userGivenOptions) =>
    Object.keys(actualAnswers).reduce((acc, questionId) => {
      let isSame = true;
      for (let i = 0; i < actualAnswers[questionId].length; i++) {
        if (
          actualAnswers[questionId][i] !==
          userGivenOptions[questionId][i].toString()
        ) {
          isSame = false;
          break;
        }
      }
      isSame && acc++;
      return acc;
    }, 0);
  useEffect(() => {
    setTotalScore(checkScore(allAnswers, userGivenOptions));
  }, []);
  const listStyle = { listStyle: 'none', margin: '1em' };
  return (
    <>
      <h2>
        Correct: {totalScore}/{totalQuestions}
      </h2>
      <div>Thank you for taking the quiz</div>
      <h2 style={{ margin: '0.75em 0' }}>Quiz Summary: </h2>
      {quizData.map((individualQuizData, index) => (
        <div key={index}>
          <h3 className="quizQuestion center">Question {index + 1}</h3>
          <h3 style={{ margin: '1em' }}>{individualQuizData.question}</h3>
          <QuizSummary
            headingText="Correct Answer:"
            listStyle={listStyle}
            quizObj={individualQuizData}
            iteratorIdx={index}
            chosenOptionsArr={allAnswers}
          />
          <QuizSummary
            headingText="Your Answer:"
            listStyle={listStyle}
            quizObj={individualQuizData}
            iteratorIdx={index}
            chosenOptionsArr={userGivenOptions}
          />
          {individualQuizData.explanation !== null && (
            <>
              <p>
                <strong>Explanation:</strong>
                {individualQuizData.explanation}
              </p>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default QuizEnd;
