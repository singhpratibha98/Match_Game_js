// script.js
document.addEventListener('DOMContentLoaded', () => {
    const emojisArray = [
      '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉',
      '🍓', '🍓', '🍒', '🍒', '🍑', '🍑', '🍍', '🍍'

    ];
  
    let gameBoard = document.getElementById('game-board');
    let attemptsDisplay = document.getElementById('attempts');
    let restartButton = document.getElementById('restart-button');
    let attempts = 0;
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
  
    function shuffle(array) {

      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        
      }
    }
  
    function createBoard() {
      gameBoard.innerHTML = '';
      shuffle(emojisArray);
      emojisArray.forEach(emoji => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
          <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${emoji}</div>
          </div>`;
        cardElement.dataset.value = emoji;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
      });
    }
  
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add('flipped');
  
      if (!firstCard) {
        firstCard = this;
        return;
      }
  
      secondCard = this;
      checkForMatch();
    }
  
    function checkForMatch() {
      let isMatch = firstCard.dataset.value === secondCard.dataset.value;
  
      isMatch ? disableCards() : unflipCards();
      attempts++;
      attemptsDisplay.textContent = attempts;
    }
  
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      firstCard.querySelector('.card-inner').classList.add('matched');
      secondCard.querySelector('.card-inner').classList.add('matched');
  
      resetBoard();
    }
  
    function unflipCards() {
      lockBoard = true;
  
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
  
        resetBoard();
      }, 1000);
    }
  
    function resetBoard() {
      [firstCard, secondCard, lockBoard] = [null, null, false];
    }
  
    restartButton.addEventListener('click', () => {
      attempts = 0;
      attemptsDisplay.textContent = attempts;
      createBoard();
    });
  
    createBoard();
  });
  