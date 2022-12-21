/* eslint-disable no-unused-vars */

import _ from 'lodash';
import './style.scss';
import scores from './modules/dummy-scores.js';

const scoreList = document.getElementById('scores');
scores.forEach((score) => {
  const singleScore = document.createElement('li');
  singleScore.classList.add('score');
  singleScore.innerHTML = `${score.name}: ${score.score}`;
  scoreList.appendChild(singleScore);
});
