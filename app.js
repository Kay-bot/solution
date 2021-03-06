const startGame = document.getElementById("start");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const guesses = document.querySelector(".guesses");
const winner = document.querySelector(".winner");
const alertMessage = document.getElementById("alert");
const textField = document.getElementById("textField");

let isPlayerPredictor = true;
let resetButton;

function getAiAsPlayer() {
  const aiPlayer = ["oo", "oc", "co", "cc"];

  const randomNumberAsPlayer = Math.floor(Math.random() * 4);
  return aiPlayer[randomNumberAsPlayer];
}

function getAiAsPredictor() {
  const aiPredictor = [
    "oo4",
    "oo3",
    "oo2",
    "oc1",
    "oc3",
    "oc2",
    "oc1",
    "co1",
    "co2",
    "co3",
    "cc0",
    "cc1",
    "cc2"
  ];

  const randomNumberAspredictor = Math.floor(Math.random() * 13);
  return aiPredictor[randomNumberAspredictor];
}

function checkWinner() {
  let predictor;
  let player;
  let user = guessField.value.toLowerCase();
  if (isPlayerPredictor) {
    predictor = user;
    player = getAiAsPlayer();
    playerText = "User";
  } else {
    predictor = getAiAsPredictor();
    player = guessField.value.toLowerCase();
    playerText = "AI";
  }

  guesses.textContent = user;
  guessField.value = "";
  guessField.focus();

  isPlayerPredictor = !isPlayerPredictor;

  if (
    (predictor === "oo4" && player === "oo") ||
    (predictor === "oo3" && player === "oc") ||
    (predictor === "oo2" && player === "cc") ||
    (predictor === "oc1" && player === "cc") ||
    (predictor === "oc3" && player === "oo") ||
    (predictor === "oc2" && player === "co") ||
    (predictor === "oc1" && player === "cc") ||
    (predictor === "co1" && player === "cc") ||
    (predictor === "co2" && player === "oc") ||
    (predictor === "co3" && player === "oo") ||
    (predictor === "cc0" && player === "cc") ||
    (predictor === "cc1" && player === "oc") ||
    (predictor === "cc2" && player === "oo")
  ) {
    setTimeout(function confirmExit() {
      if (confirm("Do you want to continue playing?")) {
        game();
      } else {
        setGameOver();
      }
    }, 1000);
    return (winner.textContent = playerText + " Wins");
  } else {
    return (winner.textContent = "No winner");
  }
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
}

function game() {
  guesses.textContent = "";
  winner.textContent = "";
  textField.textContent = "";

  alert("Welcome to the game");

  newRoundStarted();
}

function newRoundStarted() {
  if (isPlayerPredictor) {
    alertMessage.textContent = "You are the predictor, what is your input?";
  } else {
    alertMessage.textContent = "AI is the predictor, what is your input?";
  }
}

function main() {
  startGame.addEventListener("click", function() {
    game();
  });
}
main();

function inputValidation() {
  inputValue = guessField.value.toLowerCase();
  console.log(
    "inputValidation called: input is " +
      inputValue +
      " and isPlayerPredictor is " +
      isPlayerPredictor
  );

  if (isPlayerPredictor) {
    let inputAllow = /^[oc](?:)[oc][01234]$/;
    const validate = document.getElementById("textField");

    if (inputValue !== "") {
      if (inputValue.length <= 3) {
        if (inputValue.match(inputAllow)) {
          validate.textContent = "good input";
          validate.style.color = "green";
        } else {
          validate.textContent =
            "Bad input: correct input should be of the form CC3, where the first two letters indicate [O]pen or [C]losed state for each hand, followed by the prediction (0-4).";
          validate.style.color = "red";
        }
      } else {
        validate.textContent =
          "Bad input: correct input should be of the form CC3, where the first two letters indicate [O]pen or [C]losed state for each hand, followed by the prediction (0-4).";
        validate.style.color = "red";
      }
    } else {
      validate.textContent = "empty input";
      validate.style.color = "red";
    }
  } else {
    let inputAllow = /^[oc](?:)[oc]/;
    const validate = document.getElementById("textField");
    if (inputValue !== "") {
      if (inputValue.length <= 2) {
        if (inputValue.match(inputAllow)) {
          validate.textContent = "good input";
          validate.style.color = "green";
        } else {
          validate.textContent =
            "Bad input: no prediction expected, you are not the predictor.";
          validate.style.color = "red";
        }
      } else {
        validate.textContent =
          "Bad input: no prediction expected, you are not the predictor.";
        validate.style.color = "red";
      }
    } else {
      validate.textContent = "empty input";
      validate.style.color = "red";
    }
  }
  checkWinner();
  newRoundStarted();
}
