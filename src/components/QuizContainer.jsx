import React, { useState } from 'react';
import {
  categories,
  difficulties,
  noOfQuestions,
} from '../constants/quizChoices';
import '../css/quiz.css';
import Quiz from './Quiz';
import DropDown from './UtilComponents/DropDown';

const QuizContainer = () => {
  const [toggleQuiz, setToggleQuiz] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [allAnswers, setAllAnswers] = useState(null);
  const [userGivenOptions, setUserGivenOptions] = useState({});
  const [errMessage, setErrMessage] = useState('');
  const [quizFormDetails, setQuizFormDetails] = useState({
    totalQuestions: 10,
    topic: '',
    difficulty: '',
  });
  const handleChange = (e) => {
    setQuizFormDetails({ ...quizFormDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const { totalQuestions, topic, difficulty } = quizFormDetails;
    if (
      totalQuestions === null ||
      totalQuestions === undefined ||
      totalQuestions <= 0
    ) {
      setErrMessage('Please choose number of questions');
      return;
    }
    if (topic === null || topic === undefined || topic === '') {
      setErrMessage('Please choose a category');
      return;
    }
    if (difficulty === null || difficulty === undefined || difficulty <= 0) {
      setErrMessage('Please choose difficulty');
      return;
    }
    setToggleQuiz(true);
  };
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  };
  const { totalQuestions, topic, difficulty } = quizFormDetails;
  return (
    <>
      <div style={toggleQuiz ? { display: 'none' } : containerStyle}>
        <h3>
          Test your knowledge with these handpicked questions. The most
          frequently asked ones in job interviews and head hunting. If you can
          score above 80% on this quiz, you'll be ready for your next job!
        </h3>
        <br />
        <div className="dropdown-list">
          <DropDown
            title="Category"
            valuesArray={categories}
            formData={quizFormDetails}
            formName="topic"
            handleChange={handleChange}
            defaultOption="Select a difficulty"
          />
          <DropDown
            title="Difficulty"
            valuesArray={difficulties}
            formData={quizFormDetails}
            formName="difficulty"
            handleChange={handleChange}
            defaultOption="Select a category"
          />
          <DropDown
            title="Number of questions"
            valuesArray={noOfQuestions}
            formData={quizFormDetails}
            formName="totalQuestions"
            handleChange={handleChange}
            defaultOption=""
          />
        </div>
        {errMessage ? (
          <p
            style={{ color: 'red', textAlign: 'center', marginBottom: '0.5em' }}
          >
            {errMessage}
          </p>
        ) : (
          ''
        )}
        <button className="cta-btn center" onClick={handleSubmit}>
          Start Quiz
        </button>
      </div>
      {toggleQuiz && (
        <Quiz
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          totalQuestions={totalQuestions}
          topic={topic}
          difficulty={difficulty}
          allAnswers={allAnswers}
          setAllAnswers={setAllAnswers}
          userGivenOptions={userGivenOptions}
          setUserGivenOptions={setUserGivenOptions}
        />
      )}
    </>
  );
};

export default QuizContainer;
