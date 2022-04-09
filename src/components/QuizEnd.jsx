import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import QuizSummary from './UtilComponents/QuizSummary';

const QuizEnd = ({
  quizData,
  totalScore,
  setTotalScore,
  totalQuestions,
  allAnswers,
  userGivenOptions,
}) => {
  /**
   * Calculates the accumulative score by checking the original option/options for a question
   * against the user chosen option/options.
   *
   * @param {object} actualAnswers - Actual answers of all the questions.
   * @param {object} userGivenOptions - User chosen answers of all the questions.
   * @return {number} Total number of answers user has chosen correctly.
   */
  const calculateScore = (actualAnswers, userGivenOptions) =>
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
    setTotalScore(calculateScore(allAnswers, userGivenOptions));
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

QuizEnd.propTypes = {
  quizData: PropTypes.object.isRequired,
  totalScore: PropTypes.number.isRequired,
  setTotalScore: PropTypes.func.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  allAnswers: PropTypes.object.isRequired,
  userGivenOptions: PropTypes.object.isRequired
};
