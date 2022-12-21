/* eslint-disable no-unused-vars */

import _ from 'lodash';
import './style.scss';

// const gameId = "UGoHBGgZ60k4fkNyRsl5";
let gameIdentity = '';
fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    name: 'The game is on',
  }),
})
  .then((res) => res.json())
  .then((gameID) => {
    const response = gameID.result;
    gameIdentity = response.substring(14, response.lastIndexOf(' '));
  });
const gameScores = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameIdentity}/scores`;

const scoreList = document.getElementById('scores');
const buildScoreList = async (gameLink) => {
  const response = await fetch(gameLink);
  await response.json().then((newData) => {
    scoreList.replaceChildren();
    newData.result.forEach((score) => {
      const singleScore = document.createElement('li');
      singleScore.classList.add('score');
      singleScore.innerHTML = `${score.user}: ${score.score}`;
      scoreList.appendChild(singleScore);
    });
  });
};
const addScore = async (gameLink, user, score) => {
  await fetch(gameLink, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      user,
      score,
    }),
  });
};

const refreshBtn = document.getElementById('refresh-btn');
refreshBtn.addEventListener('click', () => {
  buildScoreList(gameScores);
});

const userName = document.getElementById('user-name');
const userScore = document.getElementById('user-score');
const submitBtn = document.getElementById('submit-btn');
const theForm = document.getElementById('add-score');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (userName.value !== '' && userScore.value !== '') {
    addScore(gameScores, userName.value, userScore.value);
    buildScoreList(gameScores);
    theForm.reset();
  }
});
window.onload;
// const scoreList = document.getElementById('scores');
// scores.forEach((score) => {
//   const singleScore = document.createElement('li');
//   singleScore.classList.add('score');
//   singleScore.innerHTML = `${score.name}: ${score.score}`;
//   scoreList.appendChild(singleScore);
// });
