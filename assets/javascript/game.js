//Initialize variables
var winsCounter = 0;
var lossesCounter = 0;
var currentWord = "";
var workingWord = "";
var workingArray = [];
var lettersGuessed = [];
var guessesLeft = 6;
var animals = ['antelope', 'elephant', 'giraffe', 'zebra', 'cheetah', 'springbok', 'buffalo', 'crocodile', 'hippopotamus', 'gorilla', 'wildebeest', 'rhinoceros', 'flamingo', 'ostrich'];

function AlreadyGuessed() {  //If the letter has already been guessed, returns true, otherwise returns false.
    if (lettersGuessed.indexOf(event.key) == -1) {
        return false;
    }
    else {
        return true;
    }
}

function letterIndex() {  //Handles letter guess area of hangman
    let guessIndex = [];
    workingArray = workingWord.split("");
    if (!AlreadyGuessed()) {
        for (let i=0; i < currentWord.length; i++) {
            if (currentWord[i] == event.key) {
                guessIndex.push(i);
            }
        }
        for (let i=0; i < guessIndex.length; i++) {
            workingArray[guessIndex[i]] = event.key;
        }
        workingWord = "";
        for (let i=0; i < workingArray.length; i++) {
            workingWord = workingWord.concat(workingArray[i]);
        }
        console.log(workingWord);
        document.getElementById("currentWord").innerText = workingWord.toLocaleUpperCase();
    }
    else {
        return false;
    }
}

function handleLettersGuessed() {  //Handles letters already guessed section, prevents repeat letters
    if (!AlreadyGuessed()){
        let strPrint = "";
        lettersGuessed.push(event.key);
        for (let i=0; i < lettersGuessed.length; i++) {
            strPrint = strPrint.concat(lettersGuessed[i], " ");
        }
        document.getElementById("lettersGuessed").innerText = strPrint.toUpperCase();
        return true;
    }
}

function win() {  //Adds to the win counter and displays animal picture
    winsCounter++;
    document.getElementById("winsCounter").innerText = winsCounter;
    document.getElementById("anipic").src = "assets/images/" + currentWord + ".jpg";
    document.getElementById("gameResult").innerText = "Correct! Animal was a " + currentWord;
}

function lose() { //Adds to the losses counter and displays animal picture
    lossesCounter++;
    document.getElementById("lossesCounter").innerText = lossesCounter;
    document.getElementById("anipic").src = "assets/images/" + currentWord + ".jpg";
    document.getElementById("gameResult").innerText = "Wrong :( Animal was a " + currentWord;
}

function getRndInteger(min, max) { //Random Integer Generator
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function initWord() {  //Randomly guesses new word and generates string of underscores of same length
    workingWord = "";
    let randInt = getRndInteger(0, animals.length - 1);
    currentWord = animals[randInt];
    console.log(currentWord);
    for (let i=0; i < currentWord.length; i++) {
        workingWord = workingWord.concat("_");
    }
    document.getElementById("currentWord").innerText = workingWord;
}

function reset() {  //resets game scores
    winsCounter = 0;
    lossesCounter = 0;
    document.getElementById("winsCounter").innerText = winsCounter;
    document.getElementById("lossesCounter").innerText = lossesCounter;
}

function newGame() { //sets up a new game without reseting scores
    initWord();
    lettersGuessed = [];
    guessesLeft = 6;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("lettersGuessed").innerText = "";
}

function guessHandler() { //Decreases guesses left counter if letter guessed is not in word.  Leaves alone if letter guessed is in word or has already been guessed.
    if (!AlreadyGuessed()){
        if (currentWord.indexOf(event.key) == -1) {
            guessesLeft--;
            document.getElementById("guessesLeft").innerHTML = guessesLeft;
        }
    }
}

window.onload = function() { //Initializes game on first load
    newGame();
    reset();
}

document.onkeydown = function(event) {
    letterIndex(event);  //Call functions in exactly this order otherwise guesses counter won't work
    guessHandler();
    handleLettersGuessed(event);
    if (workingWord == currentWord) {
        win();
    }
    else if (guessesLeft == 0) {
        lose();
    }
    else {
        return false;
    }
}