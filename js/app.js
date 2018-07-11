/*
 * Create a list that holds all of your cards
 */

 let openedCards = [];
 let moves = 0;
 let starCount = 0;
 let matched = 0;
 let seconds = 0;
 let minutes = 0;
 let t;

 const counter = document.querySelector('.moves') //Select 'moves' class
 const deck = document.querySelector('.deck'); //Select Deck
 const restart = document.querySelector('.restart') //Restart Button
 const cards = Array.from(document.querySelectorAll('.deck li')); // Select All Cards and Turn Them To Array
 const playAgainButton = document.getElementById('playAgain');
 const startGameButton = document.getElementById('startGame');
 const modal = document.getElementById('modal');
 const star = document.querySelectorAll('.stars li i');
 const movesScore = document.getElementById('moves');
 const starScore = document.getElementById('star');
 const timeScore = document.querySelector('.timer');
 const timeScoreModal = document.getElementById('timer');



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

deck.addEventListener('click', card => {
  const clickTarget = card.target;
  if (
    //Check if the Card already matched
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    openedCards.length < 2 &&
    !openedCards.includes(clickTarget)
  ) {
    openCard(clickTarget);
    addToOpenedCards(clickTarget);
    match();
    addMoves();
    stars();
  }

})

//Refresh the page
restart.addEventListener('click', () => {
  resetTime();
  resetStars();
  resetMoves();
  shuffleDeck();
  resetCards();
  modal.style.display = 'none';

  })

startGame.addEventListener('click', () => {
  startModal.style.display = 'none';
  timer();
})

//Play playAgain
playAgainButton.addEventListener('click', () => {
  location.reload();
})

function openCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');

}

function closeCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

function noMatch(card) {
  card.classList.toggle('noMatch');
}

function addToOpenedCards(clickTarget) {
  openedCards.push(clickTarget);
}

function match() {
  //Match
  if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
    openedCards[0].classList.toggle('match');
    openedCards[1].classList.toggle('match');
    matched++;

    setTimeout(() => {
      openedCards = [];
    },100)


  } else {
      //Not Match
      noMatch(openedCards[0]);
      noMatch(openedCards[1]);
      setTimeout(() => {
        noMatch(openedCards[0]);
        noMatch(openedCards[1]);
        closeCard(openedCards[0]);
        closeCard(openedCards[1]);
        openedCards = [];
      }, 1000);

    }
    //Check if the game is over
    if (matched === 8) {
      modal.style.display = 'block';
      clearTimeout(t);
    }

  }

  function addMoves() {
    if (openedCards.length === 2) {
      moves++
      counter.innerHTML = moves;
      starScore.innerHTML = starCount;
      movesScore.innerHTML = moves;
    }
  }

  function shuffleDeck() {
    //Shuffle Cards
    const shuffledCards = shuffle(cards);
    //Add Shuffled Cards To HTML
    for (card of shuffledCards) {
      deck.appendChild(card);
    }


  }

 //Star Score
 function stars() {
    if(moves === 7) {
      star[0].classList.remove('fa-star');
      star[0].classList.add('fa-star-o');
      starCount = 2;
    }
    if(moves === 15) {
      star[1].classList.remove('fa-star');
      star[1].classList.add('fa-star-o');
      starCount = 1;
    }
    if(moves === 23) {
      star[2].classList.remove('fa-star');
      star[2].classList.add('fa-star-o');
      starCount = 0;
    }
  }

  function add() {
    seconds++;
    if (seconds >= 60) {
      minutes++
      seconds = 0;
    }

    timeScore.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" + (seconds > 9 ? seconds : "0" + seconds);

    timeScoreModal.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
  }

 function timer() {

    t = setTimeout(() => {
     add()
   }, 1000);

 }

 function resetMoves() {
   moves = 0;
   matched = 0;
   movesScore.innerHTML = moves;
   counter.innerHTML = moves;
 }

 function resetStars() {
   starCount = 0;
   starScore.innerHTML = starCount;
   star[2].classList.remove('fa-star-o');
   star[2].classList.add('fa-star');
   star[1].classList.remove('fa-star-o');
   star[1].classList.add('fa-star');
   star[0].classList.remove('fa-star-o');
   star[0].classList.add('fa-star');

 }

 function resetTime() {
   seconds = 0;
   minutes = 0;
   timeScore.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
   ":" + (seconds > 9 ? seconds : "0" + seconds);

   timeScoreModal.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
   ":" + (seconds > 9 ? seconds : "0" + seconds);

 }

 function resetCards() {
   const cards = document.querySelectorAll('.deck li');
   for (let card of cards) {
     card.classList = 'card';
   }
 }


  shuffleDeck();
  counter.innerHTML = moves;




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
