import {
  createNextLevel,
  currentGame,
  questNumber,
} from "./create-game-layout";
import { createAudioPlayer } from "./custom-audio-player";
import rightSound from "@/assets/sounds/right-sound.mp3";
import errorSound from "@/assets/sounds/error-sound.mp3";
import { gamesDataRu, gamesDataEn } from "./games-data";

let gamesData;

if (localStorage.getItem("language") === "en") {
  gamesData = gamesDataEn;
} else {
  gamesData = gamesDataRu;
}

export let audioRight = new Audio();
audioRight.src = rightSound;
audioRight.volume = 0.1;

let audioError = new Audio();
audioError.src = errorSound;
audioError.volume = 0.1;

let score = 5;

export function gameSelection(answer) {
  let target = answer.currentTarget;
  let targetText = target.lastChild;
  let answerIndicator = target.firstChild;
  let userSelection = findSelected(targetText);

  if (targetText.innerHTML === currentGame.name) {
    if (!answerIndicator.classList.contains("answer__indicator_success")) {
      answerIndicator.classList.add("answer__indicator_success");

      let scoreCountText = document.querySelector(".score-count");
      let scoreCount = scoreCountText.innerHTML.split(": ")[1];
      scoreCountText.innerHTML = `${scoreCountText.innerHTML.split(":")[0]}: ${
        Number(scoreCount) + score
      }`;

      let questImg = document.querySelector(".game-img");
      questImg.src = userSelection.img;

      let gameName = document.querySelector(".unknown-game-description__name");
      gameName.innerHTML = userSelection.name;

      let audioGame = document.querySelector(
        ".unknown-game-description .audio-player audio"
      );
      audioGame.pause();

      let nextLevelButton = document.querySelector(".next-level__button");
      nextLevelButton.classList.remove("next-level__button_disabled");
      nextLevelButton.addEventListener("click", createNextLevel);
      score = 5;

      audioRight.play();
      audioRight.addEventListener("ended", () => (audioRight.volume = 0));
    }
  } else if (!document.querySelector(".answer__indicator_success")) {
    if (!answerIndicator.classList.contains("answer__indicator_error")) {
      answerIndicator.classList.add("answer__indicator_error");
      score--;
      audioError.currentTime = 0;
      audioError.play();
    }
  }

  let answerInfo = document.querySelector(".answer-info");
  while (answerInfo.firstChild) {
    answerInfo.removeChild(answerInfo.firstChild);
  }

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
