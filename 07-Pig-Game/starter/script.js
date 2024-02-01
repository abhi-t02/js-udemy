'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('#name--0');
const player2 = document.querySelector('#name--1');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const diceImage = document.querySelector('.dice');

const userArray = [
  {
    player: player1,
    score: score1,
    current: current1,
  },
  {
    player: player2,
    score: score2,
    current: current2,
  },
];

let diceNumber = 0;
let currentScore = 0;
let currentUser = 0;

// Generate Random dice number between (1-6)
const generateRandomNumber = () => Math.trunc(Math.random() * 6) + 1;

// Change Current user
const changeCurrentUser = () => {
  userArray[currentUser].player.parentElement.classList.remove(
    'player--active'
  );
  currentUser = currentUser === 0 ? 1 : 0;
  userArray[currentUser].player.parentElement.classList.add('player--active');
};

// When user roll dice
btnRoll.addEventListener('click', e => {
  diceNumber = generateRandomNumber();
  diceImage.src = `./dice-${diceNumber}.png`;
  if (diceNumber === 1) {
    userArray[currentUser].current.textContent = 0;
    changeCurrentUser();
    currentScore = 0;
  } else {
    currentScore += diceNumber;
    userArray[currentUser].current.textContent = currentScore;
  }
});

// When user click on hold button
btnHold.addEventListener('click', e => {
  userArray[currentUser].score.textContent =
    Number(userArray[currentUser].score.textContent) + currentScore;
  let scoreNum = Number(userArray[currentUser].score.textContent);

  if (scoreNum >= 100) {
    userArray[currentUser].player.classList.add('player--winner');
  }
  currentScore = 0;
  userArray[currentUser].current.textContent = 0;
  changeCurrentUser();
});

// New game
btnNew.addEventListener('click', e => {
  if (score1.textContent > score2.textContent) {
    alert('Player 1 has win');
  } else {
    alert('Player 2 has win');
  }
  currentUser = 0;
  currentScore = 0;
  userArray.forEach(user => {
    user.score.textContent = 0;
    user.current.textContent = 0;
  });
});
