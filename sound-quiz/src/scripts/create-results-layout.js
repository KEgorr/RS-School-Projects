import { createGameLayout } from "./create-game-layout";
import { textDataEn, textDataRu } from "./text-data";

let textData;
if (localStorage.getItem("language") === "en") {
  textData = textDataEn;
} else {
  textData = textDataRu;
}

export function createResults() {
  let resultsBlock = document.createElement("div");
  resultsBlock.classList.add("results-block");

  let scoreCount = document.querySelector(".score-count");
  let currentScore = scoreCount.innerHTML.split(": ")[1];

  let resultsText = document.createElement("p");
  resultsText.classList.add("introduction");
  resultsText.innerHTML = `${textData.resultsScoreText} ${currentScore}/30`;

  let resultsDescription = document.createElement("p");
  resultsDescription.classList.add("introduction");

  let backToStartLink = document.createElement("a");
  backToStartLink.classList.add("button");
  backToStartLink.classList.add("start-button__button");
  backToStartLink.href = "index.html";
  backToStartLink.innerHTML = textData.resultsBackToStartButton;

  let buttonsBlock = document.createElement("div");
  buttonsBlock.classList.add("results-buttons-block");

  if (currentScore < 30) {
    let newGameButton = document.createElement("button");
    newGameButton.classList.add("button");
    newGameButton.classList.add("start-button__button");
    newGameButton.innerHTML = textData.resultsNewGame;
    resultsDescription.innerHTML = textData.resultsFail;
    buttonsBlock.append(newGameButton, backToStartLink);
    resultsBlock.append(resultsText, resultsDescription, buttonsBlock);
    newGameButton.addEventListener("click", createGameLayout);
  } else {
    resultsDescription.innerHTML = textData.resultsSuccess;
    buttonsBlock.append(backToStartLink);
    resultsBlock.append(resultsText, resultsDescription, buttonsBlock);
  }
  return resultsBlock;
}
