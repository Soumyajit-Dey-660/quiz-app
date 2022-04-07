import React, { useState, useEffect } from 'react';
import BASEURL from '../constants/apiConstants';
import '../css/quiz.css';
import QuizQuestion from './QuizQuestion';
import { constructUrl } from '../util';
import { Rings } from 'react-loader-spinner';
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
  const getQuizData = () => {
    const quizApiUrl = constructUrl(BASEURL, topic, difficulty, totalQuestions);
    setIsLoading(true);
    fetch(quizApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(getAllAnswers(responseData));
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
          <h3 className="quizQuestion center-text">Question {questionNumber}</h3>
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
