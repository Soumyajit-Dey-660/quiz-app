const constructUrl = (BASEURL, topic, difficulty, totalQuestions) =>
  `${BASEURL}?apiKey=${process.env.REACT_APP_API_TOKEN}&category=${topic}&difficulty=${difficulty}&limit=${totalQuestions}`;

const getAnswerOptionsLength = (optionsObj) =>
  Object.keys(optionsObj).reduce((acc, item) => {
    optionsObj[item] !== null && acc++;
    return acc;
  }, 0);

export { constructUrl, getAnswerOptionsLength };
