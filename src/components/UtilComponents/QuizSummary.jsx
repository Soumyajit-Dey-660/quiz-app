import React from 'react';

const QuizSummary = ({
  headingText,
  listStyle,
  quizObj,
  iteratorIdx,
  chosenOptionsArr,
}) => {
  return (
      <>
        <h4>{headingText}</h4>
        <ul style={listStyle}>
        {Object.keys(quizObj.answers).map(
              (answer, idx) =>
                quizObj.answers[answer] !== null && (
                  <li key={`${iteratorIdx}_${idx}`}>
                    <input
                      type="checkbox"
                      name={answer}
                      value={answer}
                      defaultChecked={
                        chosenOptionsArr[quizObj.id][idx].toString() === 'true'
                          ? true
                          : false
                      }
                      onClick={() => false}
                      onKeyDown={() => false}
                      className="quiz-answer-options check"
                    />
                    {quizObj.answers[answer]}
                  </li>
                )
            )}
        </ul>
      </>
  )
};

export default QuizSummary;
