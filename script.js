/*
  Run testScript() to run tests
 */
'use strict';

let humanScore = 0;
let computerScore = 0;

function playGame() {
    for (let i = 0 ; i < 5; i++) {
	const humanSelection = getHumanChoice();
	const computerSelection = getComputerChoice();
	playRound(humanSelection, computerSelection);
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
    let choice = prompt("What's your move?")
    console.log(choice);
    return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
    console.log("computer: ", computerChoice)
    if (humanChoice == computerChoice) {
	console.log('Draw')
    } else if ((humanChoice == "rock" && computerChoice == "scissors") ||
	       (humanChoice == "scissors" && computerChoice == "paper") ||
	       (humanChoice == "paper" && computerChoice == "rock")) {
	humanScore++;
	console.log(`You win! ${humanChoice} beats ${computerChoice}`)
    } else {
	computerScore++;
	console.log(`You lose! ${computerChoice} beats ${humanChoice}`)
    }
}

function testScript() {
    playRound("rock", "scissors")
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("rock", "rock")
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("rock", "paper")
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("scissors", "rock")
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("rock", "rock")
    if (humanScore != 1) { throw new Error("test failed") }
    playRound("paper", "rock")
    if (humanScore != 2) { throw new Error("test failed") }

    let emptyArray = new Array(10000).fill("")
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
