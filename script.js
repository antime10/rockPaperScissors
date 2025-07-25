/*
  Run testScript() to run tests
 */
'use strict';

let humanScore = 0;
let computerScore = 0;

function playGame() {
    for (let i = 0 ; i < 5; i++) {
	playRound(getHumanChoice(), getComputerChoice());
    }
    if (humanScore == computerScore) {
	console.log("Draw overall!");
    } else if (humanScore > computerScore) {
	console.log("You win!");
    } else {
	console.log("Computer wins!");
    }
}

function getComputerChoice() {
    let guessNumber = Math.random() * 3;
    let guess;
    if (guessNumber < 1) {
	guess = "rock";
    } else if (guessNumber < 2) {
	guess = "paper";
    } else {
	guess = "scissors";
    }
    return guess;
}

function getHumanChoice() {
    let choice = prompt("What's your move?");
    return choice.toLowerCase();
}

function displayComputerChoice() {
    let computerChoiceElement = document.querySelector("#computerChoice");
    computerChoiceElement.textContent = getComputerChoice();
}

function finishGame() {
    if (humanScore > computerScore) {
	alert("You win!");
    } else {
	alert("Computer wins!");
    }
}

async function playRound(humanChoice) {
    document.querySelectorAll("button").forEach(
	btn => btn.disabled = true
    );
    let myChoiceElement = document.querySelector("#myChoice");
    let computerChoiceElement = document.querySelector("#computerChoice");
    let resultsElement = document.querySelector("#results");
    let scoreElement = document.querySelector("#score");
    let vsElement = document.querySelector("#vs");

    vsElement.style.display = "inline";

    myChoiceElement.textContent = humanChoice;
    let computerChoice = getComputerChoice();
    computerChoiceElement.textContent = computerChoice;
    if (humanChoice == computerChoice) {
	results.textContent = 'Draw';
    } else if ((humanChoice == "rock" && computerChoice == "scissors") ||
	       (humanChoice == "scissors" && computerChoice == "paper") ||
	       (humanChoice == "paper" && computerChoice == "rock")) {
	humanScore++;
	results.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
    } else {
	computerScore++;
	results.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
    }

    score.textContent = `You - ${humanScore} vs Computer - ${computerScore}`;

    if (humanScore == 5 || computerScore == 5) {
	finishGame();
	return;
    }
    document.querySelectorAll("button").forEach(
	btn => btn.disabled = false
    );
}

function testScript() {
    playRound("rock", "scissors");
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("rock", "rock");
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("rock", "paper");
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("scissors", "rock");
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("rock", "rock");
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("paper", "rock");
    if (humanScore != 2) { throw new Error("test failed") }

    let emptyArray = new Array(10000).fill("");
    let testArray = emptyArray.map(i => getComputerChoice());
    let rocks = 0;
    let scissors = 0;
    let papers = 0;

    testArray.forEach(i  => {
	switch (i) {
	case "rock":
	    rocks++;
	    break;
	case "paper":
	    papers++
	    break;
	case "scissors":
	    scissors++;
	    break;
	}
    })

    if (rocks < 3000 || scissors < 3000 || papers < 3000) {
	console.log("Too few of one output");
	throw new Error("test failed");
    }
    console.log("No test failed");
    return 0;
}


document.querySelector(".playerChoices").addEventListener(
    "click",
    (e) => playRound(e.target.id)
)
