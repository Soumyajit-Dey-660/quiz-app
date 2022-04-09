import React, { useState, useEffect } from 'react';
import BASEURL from '../constants/apiConstants';
import '../css/quiz.css';
import PropTypes from 'prop-types';
import { Rings } from 'react-loader-spinner';
import QuizQuestion from './QuizQuestion';
import { constructUrl } from '../util';
import QuizEnd from './QuizEnd';

const Quiz = ({
  totalScore,
  setTotalScore,
  totalQuestions,
  topic,
  difficulty,
  allAnswers,
  setAllAnswers,
  userGivenOptions,
  setUserGivenOptions
}) => {
  const [quizData, setQuizData] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [errMessage, setErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  /**
   * Calls the quiz api endpoint, gets the response and sets it to a state variable. 
   * If any error occurs then sets the appropriate error message.
   *
   * @return {void} 
   */
  const getQuizData = () => {
    const quizApiUrl = constructUrl(BASEURL, topic, difficulty, totalQuestions);
    setIsLoading(true);
    fetch(quizApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setQuizData(responseData);
        setAllAnswers(getAllAnswers(responseData));
        setErrMessage('');
        setIsLoading(false);
      })
      .catch((err) => {
        setErrMessage(err);
        setQuizData([]);
        setIsLoading(false);
      });
  };
  /**
   * Gets all the correct answers of the questions to be asked in the quiz.
   *
   * @param {object} responseObj - Response object received after sending a GET request to the quiz API endpoint
   * @return {object} Object with keys as the question id and values as the correct answers to that question.
   */
  const getAllAnswers = (responseObj) => {
    const allAnswers = {};
    responseObj.forEach((quizObj) => {
      const individualQuizAnswerObj = [];
      Object.keys(quizObj.answers).forEach((answer) => {
        quizObj.answers[answer] !== null &&
          individualQuizAnswerObj.push(
            quizObj.correct_answers[`${answer}_correct`]
          );
      });
      allAnswers[quizObj.id] = individualQuizAnswerObj;
    });
    return allAnswers;
  };

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <div>
      {isLoading ? <Rings color="#00BFFF" height={80} width={80} /> : ''}
      {errMessage ? <p style={{ color: 'red' }}>Something Went Wrong</p> : ''}
      {questionNumber > totalQuestions ? (
        <QuizEnd
          quizData={quizData}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          totalQuestions={totalQuestions}
          allAnswers={allAnswers}
          userGivenOptions={userGivenOptions}
        />
      ) : quizData !== null ? (
        <>
          <div className="quiz-info">
            <h3>Total Questions: {totalQuestions}</h3>
            <h3 className="capitial-letter center-text">Topic: {topic}</h3>
            <h3 className="capitial-letter">Difficulty: {difficulty}</h3>
          </div>
          <h3 className="quizQuestion center-text">
            Question {questionNumber}
          </h3>
          <QuizQuestion
            quizData={quizData[questionNumber - 1]}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            totalQuestions={totalQuestions}
            userGivenOptions={userGivenOptions}
            setUserGivenOptions={setUserGivenOptions}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Quiz;

Quiz.propTypes = {
  totalScore: PropTypes.number.isRequired,
  setTotalScore: PropTypes.func.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  topic: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  allAnswers: PropTypes.object.isRequired,
  setAllAnswers: PropTypes.func.isRequired,
  userGivenOptions: PropTypes.object.isRequired,
  setUserGivenOptions: PropTypes.func.isRequired
};
