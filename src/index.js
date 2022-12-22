/* eslint-disable no-unused-vars */

import _ from 'lodash';
import './style.scss';
import addScore from './modules/add-score.js';
import renderScores from './modules/render-scores.js';
import {
  scoreList,
  refreshBtn,
  userName,
  userScore,
  submitBtn,
  theForm,
  gameName,
  gameHading,
} from './modules/globals.js';
import { errorMsg, successMsg } from './modules/messages.js';
import showGameName from './modules/show-game-name.js';

let gameURL = '';
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
  .then((game) => {
    const response = game.result;
    const gameId = response.substring(14, response.lastIndexOf(' '));
    gameURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;
  });

refreshBtn.addEventListener('click', () => {
  renderScores(gameURL, scoreList);
});
const msg = document.getElementById('msg-box');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (userName.value !== '' && userScore.value !== '') {
    addScore(gameURL, userName.value, userScore.value);
    theForm.reset();
    successMsg(msg);
  } else {
    errorMsg(msg);
  }
});
window.onload = () => {
  if (scoreList.childNodes.length === 0) {
    // scoreList.style.border = "none";
    scoreList.innerHTML = '<p class="empty-message">The leaderboard is empty</p>';
  }
  showGameName(gameHading, gameName);
};
