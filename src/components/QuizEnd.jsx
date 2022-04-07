import React, { useEffect, useState } from 'react';

const QuizEnd = ({
  quizData,
  totalScore,
  setTotalScore,
  totalQuestions,
  allAnswers,
  userGivenOptions,
}) => {
  console.log(`all Answers: ${JSON.stringify(allAnswers)}`);
  console.log(`User given options: ${JSON.stringify(userGivenOptions)}`);
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
  useEffect(() => {
    setCorrectAnswers(getCorrectAnswers(quizData));
  }, [])
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
          <h4>Correct Answer:</h4>
          <ul style={{ listStyle: 'none', margin: '1em' }}>
            {Object.keys(individualQuizData.answers).map(
              (answer, idx) =>
                individualQuizData.answers[answer] !== null && (
                  <li key={`${index}_${idx}`}>
                    <input
                      type="checkbox"
                      name={answer}
                      value={answer}
                      defaultChecked={
                        allAnswers[individualQuizData.id][idx] === 'true'
                          ? true
                          : false
                      }
                      onClick={() => false}
                      onKeyDown={() => false}
                      className="quiz-answer-options check"
                    />
                    {individualQuizData.answers[answer]}
                  </li>
                )
            )}
          </ul>
          <h4>Your Answer:</h4>
          <ul style={{ listStyle: 'none', margin: '1em' }}>
            {Object.keys(individualQuizData.answers).map(
              (answer, idx) =>
                individualQuizData.answers[answer] !== null && (
                  <li key={`${index}-${idx}`}>
                    <input
                      type="checkbox"
                      name={answer}
                      value={answer}
                      defaultChecked={
                        userGivenOptions[individualQuizData.id][idx]
                      }
                      onClick={() => false}
                      onKeyDown={() => false}
                      className="quiz-answer-options check"
                    />
                    {individualQuizData.answers[answer]}
                  </li>
                )
            )}
          </ul>
        </div>
      ))}
    </>
  );
};

export default QuizEnd;
