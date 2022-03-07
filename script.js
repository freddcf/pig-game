'use strict';

// Selecting elements
const gameboard = document.querySelector('main');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');

const cubeEl = document.querySelector('.cube');
const faces = document.querySelectorAll('.face > img');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const gameGoal = 100;

// Starting conditions
let scores = [],
  currentScore,
  activePlayer,
  playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  cubeEl.classList.remove('rolled');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
  if (playing && !cubeEl.classList.contains('rolled')) {
    // Generate dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // Rolled dice animation
    cubeEl.classList.add('rolled');

    // Changing players
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }

    // Animation handlers

    cubeEl.addEventListener('animationstart', event => {
      if (event.animationName === 'landingDice') {
        for (let i = 0; i < faces.length; ++i) {
          faces[i].setAttribute('src', `img/dice-${dice}.png`);
        }
        gameboard.classList.add('shocked');
      }
    });

    cubeEl.addEventListener('animationend', event => {
      if (event.animationName === 'landingDice') {
        cubeEl.classList.remove('rolled');
        for (let i = 0; i < faces.length; ++i) {
          faces[i].setAttribute('src', `img/dice-${i + 1}.png`);
        }
        gameboard.classList.remove('shocked');
      }
    });
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score is at least 100
    if (scores[activePlayer] >= gameGoal) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Change player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
