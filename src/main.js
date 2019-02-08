import coinFlip from './coin-flip.js';

const newWinsLossesJSON = window.localStorage.getItem('wins-losses');
const newWinsLosses = JSON.parse(newWinsLossesJSON);

const picNode = document.getElementById('coin-pic');
const flipForm = document.getElementById('flip-form');
const winNode = document.getElementById('win-count');
const lossNode = document.getElementById('loss-count'); 
const lastGameNode = document.getElementById('last-game');

if(!newWinsLossesJSON) {
    lastGameNode.textContent = 'Good luck!';
}
else {
    const oldWins = newWinsLosses.wins;
    const oldLosses = newWinsLosses.losses;
    lastGameNode.textContent = 'Your last game score was: ' + oldWins + ' wins, ' + oldLosses + ' losses';
}

let winCount = 0;
let lossCount = 0;

flipForm.addEventListener('submit', function(event){
    event.preventDefault();
    const flipGuess = flipForm.elements.flip.value;
    const randomNumber = Math.random();
    const result = coinFlip(randomNumber);
    const guessResults = document.getElementById('guess-results');

    let imageSource = '';

    if(result === 'horse') {
        imageSource = '../assets/coin-horse.jpg';
        
    }
    else {
        imageSource = '../assets/coin-button.jpg';
    }
   
    picNode.classList.remove('hidden');

    picNode.src = imageSource;

    if(result === flipGuess){
        guessResults.textContent = 'You win!';
        winCount++;
    }
    else {
        guessResults.textContent = 'You lose!';
        lossCount++;
    }

    const winsAndLosses = {
        wins: winCount,
        losses: lossCount
    };

    winNode.textContent = winsAndLosses.wins;
    lossNode.textContent = winsAndLosses.losses;

    const countJSON = JSON.stringify(winsAndLosses);
    window.localStorage.setItem('wins-losses', countJSON);
});