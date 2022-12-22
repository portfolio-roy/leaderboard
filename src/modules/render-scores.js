const renderScores = async (gameLink, scores) => {
  const response = await fetch(gameLink);
  await response.json().then((newData) => {
    scores.replaceChildren();
    newData.result.forEach((score) => {
      const singleScore = document.createElement('li');
      singleScore.classList.add('score');
      singleScore.innerHTML = `${score.user}: ${score.score}`;
      scores.appendChild(singleScore);
    });
  });
};

export default renderScores;
