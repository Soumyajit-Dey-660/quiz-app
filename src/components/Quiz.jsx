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
        // console.log(responseData);
        setQuizData(responseData);
        setErrMessage('');
        setIsLoading(false);
      })
      .catch((err) => {
        setErrMessage(err);
        setQuizData([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <div>
      {isLoading ? <Rings color="#00BFFF" height={80} width={80} /> : ''}
      {errMessage ? <p style={{ color: 'red' }}>Something Went Wrong</p> : ''}
      {questionNumber > totalQuestions ? (
        <QuizEnd totalScore={totalScore} totalQuestions={totalQuestions} />
      ) : quizData !== null ? (
        <>
          <div className="quiz-info">
            <h3>Total Questions: {totalQuestions}</h3>
            <h3 className="capitial-letter center">Topic: {topic}</h3>
            <h3 className="capitial-letter">Difficulty: {difficulty}</h3>
          </div>
          <h3 className="quizQuestion center">Question {questionNumber}</h3>
          <QuizQuestion
            quizData={quizData[questionNumber - 1]}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            totalScore={totalScore}
            setTotalScore={setTotalScore}
            totalQuestions={totalQuestions}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Quiz;
