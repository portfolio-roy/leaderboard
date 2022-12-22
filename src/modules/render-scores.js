import { emptyMsg } from './messages.js';

const renderScores = async (gameLink, scores) => {
  const response = await fetch(gameLink);
  await response.json().then((newData) => {
    scores.replaceChildren();
    if (newData.result.length === 0) {
      emptyMsg(scores);
    } else {
      newData.result.forEach((score) => {
        const singleScore = document.createElement('li');
        singleScore.classList.add('score');
        singleScore.innerHTML = `<i class="fa-solid fa-trophy"></i> ${score.user}: ${score.score}`;
        scores.appendChild(singleScore);
      });
    }
  });
};

export default renderScores;
