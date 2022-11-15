import {
  createNextLevel,
  currentGame,
  questNumber,
} from "./create-game-layout";
import { createAudioPlayer } from "./custom-audio-player";
import { gamesData } from "./games-data";

let score = 5;

export function gameSelection(answer) {
  let target = answer.currentTarget;
  let targetText = target.lastChild;
  let answerIndicator = target.firstChild;

  if (targetText.innerHTML === currentGame.name) {
    answerIndicator.classList.add("answer__indicator_success");

    let scoreCountText = document.querySelector(".score-count");
    let scoreCount = scoreCountText.innerHTML.split(": ")[1];
    scoreCountText.innerHTML = `Score: ${Number(scoreCount) + score}`;

    let nextLevelButton = document.querySelector(".next-level__button");
    nextLevelButton.classList.remove("next-level__button_disabled");
    nextLevelButton.addEventListener("click", createNextLevel);
    score = 5;
  } else if (!document.querySelector(".answer__indicator_success")) {
    answerIndicator.classList.add("answer__indicator_error");
    score--;
  }

  let answerInfo = document.querySelector(".answer-info");
  while (answerInfo.firstChild) {
    answerInfo.removeChild(answerInfo.firstChild);
  }

  let userSelection = findSelected(targetText);
  let selectedGameMain = document.createElement("div");
  selectedGameMain.classList.add("selected-game");

  let selectedGameInfo = document.createElement("div");
  selectedGameInfo.classList.add("selected-game-info");

  let selectedGameImg = document.createElement("img");
  selectedGameImg.classList.add("game-img");
  selectedGameImg.src = userSelection.img;

  let selectedGameName = document.createElement("p");
  selectedGameName.classList.add("selected-game-info__item");
  selectedGameName.innerHTML = userSelection.name;

  let selectedGameSongName = document.createElement("p");
  selectedGameSongName.innerHTML = userSelection.songName;
  selectedGameSongName.classList.add("selected-game-info__item");

  let selectedGameAudio = createAudioPlayer(userSelection.audio);
  selectedGameAudio.classList.add("selected-audio-player");

  selectedGameInfo.append(
    selectedGameName,
    selectedGameSongName,
    selectedGameAudio
  );

  selectedGameMain.append(selectedGameImg, selectedGameInfo);

  let selectedGameDescription = document.createElement("p");
  selectedGameDescription.innerHTML = userSelection.description;
  selectedGameDescription.classList.add("selected-game-description");

  answerInfo.append(selectedGameMain, selectedGameDescription);
}

function findSelected(select) {
  for (let i = 1; i < gamesData[questNumber].length; i++) {
    if (gamesData[questNumber][i].name === select.innerHTML) {
      return gamesData[questNumber][i];
    }
  }
}
