let openCards = [];
let deck = document.querySelector('.deck');
let moves = 0;
let movesText = document.querySelector('.moves');
let stars = document.querySelectorAll('.stars li');
let starCount = 0;
let time = 0;
let timer = document.querySelector('.timer');
let timerId;
let timerOff = true;
let restart = document.querySelector('.restart');
let matchCards = 0;
let cardPairs = 8;
let cards = document.querySelectorAll('.card');
let popup = document.querySelector('.popup');
let replay = document.querySelector('.replay');
let buttonz = document.querySelector('.buttonz');



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

// change cards place 
function shufflingCards() {
    const toBeShuffled = Array.from(document.querySelectorAll('.deck li'));
    const shuffled = shuffle(toBeShuffled);
    shuffled.forEach(function (card) {
        deck.appendChild(card);
    })
}

shufflingCards()



deck.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('card') && !openCards.includes(target)) {
        target.classList.add('open', 'show');
        openCards.push(target); // add clicked cards to an array
        addMoves()
        checkScore()
        if (timerOff) {
            startTimer();
            timerOff = false;
        }


        if (openCards.length === 2 && openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {

            openCards[0].classList.toggle('match')
            openCards[1].classList.toggle('match')
            openCards.length = 0;
            matchCards++ // counting matched cards
            if (matchCards === cardPairs) {
                showResult(); // show result if all cards are matched
            }

            // flipping unmatched cards
        } else if (!openCards[0].classList.contains('match') && !openCards[1].classList.contains('match')) {
            setTimeout(() => {
                openCards[0].classList.remove("open", "show");
                openCards[1].classList.remove("open", "show");
                openCards.length = 0;

            }, 500);
        }
    }

});


// to keep track of players moves
function addMoves() {
    moves++;
    movesText.innerHTML = moves;
}

// to hide stars based on player moves
function checkScore() {
    if (moves === 20 || moves === 32) {
        hideStar();

    }
}

function hideStar() {
    stars;
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            starCount--;
            break;
        }
    }
}

// keep track of player stars
function starNumber() {
    stars;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;


}

// calculate the time user spent playing
function startTimer() {
    time = 0;
    timerId = setInterval(() => {
        time++
        displayTime()
    }, 1000);

}

// timer function from stackoverflow
function displayTime() {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    if (second < 10) {
        timer.innerHTML = `${minute}:0${second}`;
    } else {
        timer.innerHTML = `${minute}:${second}`;
    }

}

// stop timer after matching all cards
function stopTimer() {
    clearInterval(timerId);
}

// adding listener to the restart icon and refresh the game
document.querySelector('.restart').addEventListener('click', () => {
    window.location.reload();
    shufflingCards()

});


function togglePopup() {
    popup;
    popup.classList.toggle('hide')
}


// show player result on the popup window
function showResult() {
    const totalTimeSpan = document.querySelector(".total-time");
    const totalTime = document.querySelector('.timer').innerHTML;
    totalTimeSpan.innerHTML = `${totalTime}`;

    const totalMovesSpan = document.querySelector(".total-moves");
    const totalMoves = document.querySelector('.moves').innerHTML;
    totalMovesSpan.innerHTML = `${totalMoves}`;

    const totalStarsSpan = document.querySelector(".total-stars");
    const totalStars = starNumber()
    totalStarsSpan.innerHTML = `${totalStars}`;


    stopTimer();
    togglePopup();

}
// adding listener to the cancel button and hide popup window
document.querySelector('.cancel').addEventListener('click', () => {
    togglePopup();
});

// adding listener to the replay button and refresh the game
document.querySelector('.replay').addEventListener('click', () => {
    window.location.reload();
    shufflingCards()

});

