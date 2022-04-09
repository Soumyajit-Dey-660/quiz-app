/**
 * Constructs the quizApi URL with all the query parameters
 *
 * @param {string} BASEURL - Base URL of the Quiz API
 * @param {string} topic - Topic on which the user wants to be quizzed on
 * @param {string} difficulty - Difficulty level of the quiz
 * @param {string} totalQuestions - Number of questions to be asked in the quiz
 * @return {string} Api endpoint with all the query parameters
 */
const constructUrl = (BASEURL, topic, difficulty, totalQuestions) =>
  `${BASEURL}?apiKey=${process.env.REACT_APP_API_TOKEN}&category=${topic}&difficulty=${difficulty}&limit=${totalQuestions}`;

/**
 * Gets the number of options a particular quiz question has
 *
 * @param {object} optionsObj - Options of a particular MCQ question
 * @return {number} Total number of options of a particular quiz question
 */
const getAnswerOptionsLength = (optionsObj) =>
  Object.keys(optionsObj).reduce((acc, item) => {
    optionsObj[item] !== null && acc++;
    return acc;
  }, 0);

export { constructUrl, getAnswerOptionsLength };
