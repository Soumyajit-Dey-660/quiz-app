import React, { useEffect, useState } from 'react';
import { getAnswerOptionsLength } from '../util';
import PropTypes from 'prop-types';
import '../css/quiz.css';

const QuizQuestion = ({
  quizData,
  questionNumber,
  totalQuestions,
  setQuestionNumber,
  userGivenOptions,
  setUserGivenOptions,
}) => {
  const buttonStyle =
    questionNumber === 1 ? 'cta-btn-disabled center' : 'cta-btn center';
  const defaultChosenOptions = new Array(
    getAnswerOptionsLength(quizData.answers)
  ).fill(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState(defaultChosenOptions);
  /**
   * Sets the state variable selectedAnswers with the array which holds the information
   * of which options has the user selected.
   *
   * @param {number} position - Rank of the option in the input based on the array index (starts with 0)
   * @return {void}
   */
  const handleChange = (position) => {
    const updatedCheckedState = selectedAnswers.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedAnswers(updatedCheckedState);
  };
  /**
   * Checks if the user has selected any answers for the current question or not.
   * If not then sets an appropriate error message.
   * Otherwise stores the user chosen option/options for the current question and
   * then navigates back to the previous question.
   *
   * @return {void}
   */
  const goToPreviousQuestion = () => {
    if (selectedAnswers.filter((answer) => answer !== false).length === 0) {
      setWarningMessage('Please select at least one option');
      return;
    }
    setQuestionNumber(questionNumber - 1);
    setWarningMessage('');
    setUserGivenOptions({
      ...userGivenOptions,
      [quizData.id]: selectedAnswers,
    });
  };
  /**
   * Checks if the user has selected any answers for the current question or not.
   * If not then sets an appropriate error message.
   * Otherwise stores the user chosen option/options for the current question and
   * then navigates to the next question.
   *
   * @return {void}
   */
  const goToNextQuestion = () => {
    if (selectedAnswers.filter((answer) => answer !== false).length === 0) {
      setWarningMessage('Please select at least one option');
      return;
    }
    setQuestionNumber(questionNumber + 1);
    setWarningMessage('');
    setUserGivenOptions({
      ...userGivenOptions,
      [quizData.id]: selectedAnswers,
    });
  };
  useEffect(() => {
    if (
      userGivenOptions[quizData.id] === null ||
      userGivenOptions[quizData.id] === undefined
    ) {
      setSelectedAnswers(defaultChosenOptions);
    } else {
      setSelectedAnswers(userGivenOptions[quizData.id]);
    }
  }, [quizData, questionNumber]);
  return (
    <div className="quiz-question">
      <p style={{ margin: '1em' }}>{quizData.question}</p>
      <ul style={{ listStyle: 'none', margin: '1em' }}>
        {Object.keys(quizData.answers).map(
          (answer, idx) =>
            quizData.answers[answer] !== null && (
              <li key={idx}>
                <input
                  type="checkbox"
                  name={answer}
                  value={answer}
                  checked={selectedAnswers[idx]}
                  onChange={() => handleChange(idx)}
                  className="quiz-answer-options"
                />
                {quizData.answers[answer]}
              </li>
            )
        )}
      </ul>
      {warningMessage && (
        <p style={{ color: 'red', margin: '1em' }}>{warningMessage}</p>
      )}
      <button
        className={buttonStyle}
        onClick={goToPreviousQuestion}
        disabled={questionNumber === 1}
      >
        Previous Question
      </button>
      <button
        className="cta-btn center"
        style={{ margin: '1em 1.5em' }}
        onClick={goToNextQuestion}
      >
        {questionNumber === Number(totalQuestions) ? 'Submit' : 'Next Question'}
      </button>
    </div>
  );
};

export default QuizQuestion;

QuizQuestion.propTypes = {
  quizData: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  setQuestionNumber: PropTypes.func.isRequired,
  userGivenOptions: PropTypes.object.isRequired,
  setUserGivenOptions: PropTypes.func.isRequired,
};
