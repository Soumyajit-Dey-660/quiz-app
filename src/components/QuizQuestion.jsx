import React, { useEffect, useState } from 'react';
import { getAnswerOptionsLength } from '../util';

const QuizQuestion = ({
  quizData,
  questionNumber,
  totalQuestions,
  setQuestionNumber,
  totalScore,
  setTotalScore,
  userGivenOptions,
  setUserGivenOptions
}) => {
  console.log(questionNumber, totalQuestions);
  const defaultChosenOptions = new Array(
    getAnswerOptionsLength(quizData.answers)
  ).fill(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState(defaultChosenOptions);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const getCorrectAnswers = (quizData) => {
    let answers = [];
    for (let answer of Object.keys(quizData.answers)) {
      if (quizData.answers[answer] !== null) {
        answers.push(quizData.correct_answers[`${answer}_correct`]);
      }
    }
    return answers;
  };
  const checkAnswers = (userGivenOptions, correctOptions) => {
    for (let i = 0; i < correctOptions.length; i++) {
      if (`${userGivenOptions[i]}` !== correctOptions[i]) return false;
    }
    return true;
  };
  const handleChange = (position) => {
    const updatedCheckedState = selectedAnswers.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedAnswers(updatedCheckedState);
  };
  const goToNextQuestion = () => {
    if (selectedAnswers.filter((answer) => answer !== false).length === 0) {
      setWarningMessage('Please select at least one option');
      return;
    }
    if (checkAnswers(selectedAnswers, correctAnswers)) {
      setTotalScore(totalScore + 1);
    }
    setQuestionNumber(questionNumber + 1);
    setWarningMessage('');
    // didn't know this, to compute data.something you have to wrap it in a []
    setUserGivenOptions({...userGivenOptions, [quizData.id]: selectedAnswers })
  };
  useEffect(() => {
    setSelectedAnswers(defaultChosenOptions);
    setCorrectAnswers(getCorrectAnswers(quizData));
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
      {warningMessage && <p style={{ color: 'red', margin: '1em' }}>{warningMessage}</p>}
      <button className="cta-btn center" onClick={goToNextQuestion}>
        {questionNumber === Number(totalQuestions) ? 'Submit' : 'Next Question'}
      </button>
    </div>
  );
};

export default QuizQuestion;
