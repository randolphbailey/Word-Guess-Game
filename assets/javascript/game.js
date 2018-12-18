//Initialize variables
var winsCounter = 0;
var lossesCounter = 0;
var currentWord = "";
var workingWord = "";
var workingArray = [];
var lettersGuessed = [];
var guessesLeft = 8;
var animals = ['antelope', 'elephant', 'giraffe', 'zebra', 'cheetah', 'springbok', 'buffalo', 'crocodile', 'hippopotamus', 'gorilla', 'wildebeest', 'rhinoceros', 'flamingo', 'ostrich'];

function hasntAlreadyGuessed() {
    if (lettersGuessed.indexOf(event.key) == -1) {
        return true;
    }
    else {
        return false;
    }
}

function letterIndex() {  //Returns array of index positions of letter guessed if in string.  Otherwise returns boolean false
    let guessIndex = [];
    workingArray = workingWord.split("");
    if (hasntAlreadyGuessed()) {
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

function handleLettersGuessed() {
    if (hasntAlreadyGuessed()){
    let strPrint = "";
    lettersGuessed.push(event.key);
    for (let i=0; i < lettersGuessed.length; i++) {
        strPrint = strPrint.concat(lettersGuessed[i], " ");
    }
    document.getElementById("lettersGuessed").innerText = strPrint.toUpperCase();
    guessesLeft--;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    return true;
}
}

function win() {
    winsCounter++;
    document.getElementById("winsCounter").innerText = winsCounter;
    document.getElementById("anipic").src = "assets/images/" + currentWord + ".jpg";
    newGame();
}

function lose() {
    lossesCounter++;
    document.getElementById("lossesCounter").innerText = lossesCounter;
    document.getElementById("anipic").src = "assets/images/" + currentWord + ".jpg";
    newGame();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function initWord() {
    workingWord = "";
    let randInt = getRndInteger(0, animals.length - 1);
    currentWord = animals[randInt];
    console.log(currentWord);
    for (let i=0; i < currentWord.length; i++) {
        workingWord = workingWord.concat("_");
    }
    document.getElementById("currentWord").innerText = workingWord;
}

function reset() {
    winsCounter = 0;
    lossesCounter = 0;
    document.getElementById("winsCounter").innerText = winsCounter;
    document.getElementById("lossesCounter").innerText = lossesCounter;
}

function newGame() {
    initWord();
    lettersGuessed = [];
    guessesLeft = 8;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("lettersGuessed").innerText = "";
}

window.onload = function() {
    newGame();
    reset();
}

document.onkeydown = function(event) {
    letterIndex(event);
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