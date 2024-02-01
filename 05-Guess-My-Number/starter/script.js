'use strict';

const message = document.querySelector('.message');
const scoreShow = document.querySelector('.score');
const highScoreShow = document.querySelector('.highscore');
let guessingNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', e => {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    message.textContent = 'No number enetered.';
  } else if (score > 1) {
    if (guess === guessingNumber) {
      // console.log(guess, ' right number');
      message.textContent = 'Right number.';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').textContent = guessingNumber;
      if (score > highScore) {
        highScoreShow.textContent = score;
        highScore = score;
      }
    } else if (guess > guessingNumber) {
      // console.log('Too high');
      message.textContent = 'Number is too high';
      score--;
      scoreShow.textContent = score;
    } else {
      // console.log('Too low');
      message.textContent = 'Number is too low';
      score--;
      scoreShow.textContent = score;
    }
  } else {
    // console.log('You lost th game.');
    message.textContent = 'You Lost The Game.';
    scoreShow.textContent = 0;
  }
});

document.querySelector('.again').addEventListener('click', e => {
  guessingNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  scoreShow.textContent = score;
  message.textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
});
