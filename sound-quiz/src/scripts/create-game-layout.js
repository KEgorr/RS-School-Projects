import { createResults } from "./create-results-layout";
import { createAudioPlayer } from "./custom-audio-player";
import { audioRight, gameSelection } from "./game-selection";
import { gamesData } from "./games-data";

export let questNumber = 0;
export let currentGame;

const main = document.querySelector(".main");

export function createGameLayout() {
  if (document.querySelector(".navigation__link_active")) {
    let activeLink = document.querySelector(".navigation__link_active");
    activeLink.classList.remove("navigation__link_active");
  }
  let main = document.querySelector(".main");

  let score = document.createElement("span");
  score.classList.add("score-count");
  score.innerHTML = "Score: 0";

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  let questionsName = document.createElement("ul");
  questionsName.classList.add("questions-types");
  for (let i = 0; i < gamesData.length; i++) {
    let quest = document.createElement("li");
    quest.classList.add("questions-types__type");
    quest.innerHTML = gamesData[i][0].questionType;
    questionsName.append(quest);
  }

  let questionBlock = document.createElement("div");
  questionBlock.classList.add("question-block");

  let question = createQuestion();

  questionBlock.append(question);

  let nextLevelButton = document.createElement("button");
  nextLevelButton.classList.add("button");
  nextLevelButton.classList.add("next-level__button");
  nextLevelButton.classList.add("next-level__button_disabled");
  nextLevelButton.innerHTML = "Следующий вопрос";

  main.append(score, questionsName, questionBlock, nextLevelButton);
  updateActiveQuest();
}

function createQuestion() {
  let question = document.createElement("div");
  question.classList.add("question");

  let unknownGameBlock = document.createElement("div");
  unknownGameBlock.classList.add("unknown-game-block");

  let unknownGameImg = document.createElement("img");
  unknownGameImg.classList.add("game-img");
  unknownGameImg.src =
    "https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-a929531dce98fb7054af1aa20c31466c.png";

  let unknownGameDescription = document.createElement("div");
  unknownGameDescription.classList.add("unknown-game-description");

  currentGame = gamesData[questNumber][getRandomGame(6)];
  let unknownAudio = createAudioPlayer(currentGame.audio);

  let unknownGameName = document.createElement("p");
  unknownGameName.classList.add("unknown-game-description__name");
  unknownGameName.innerHTML = "*****";

  unknownGameDescription.append(unknownGameName, unknownAudio);

  unknownGameBlock.append(unknownGameImg, unknownGameDescription);

  let answersBlock = document.createElement("div");
  answersBlock.classList.add("answers-block");

  let answers = document.createElement("ul");
  answers.classList.add("answers-list");

  for (let i = 1; i < gamesData[questNumber].length; i++) {
    let answer = document.createElement("li");
    answer.classList.add("answer");

    let answerIndicator = document.createElement("span");
    answerIndicator.classList.add("answer__indicator");

    let answerTxt = document.createElement("p");
    answerTxt.classList.add("answer__text");

    answerTxt.innerHTML = gamesData[questNumber][i].name;
    answer.append(answerIndicator, answerTxt);
    answers.append(answer);

    answer.addEventListener("click", gameSelection);
  }

  let answerInfo = document.createElement("div");
  answerInfo.classList.add("answer-info");

  let answerInfoTxt = document.createElement("pre");
  answerInfoTxt.classList.add("answer-info__intro-text");
  answerInfoTxt.innerHTML = "Послушайте плеер.\nВыберете игру из списка";

  answerInfo.append(answerInfoTxt);
  answersBlock.append(answers, answerInfo);
  question.append(unknownGameBlock, answersBlock);
  return question;
}

function getRandomGame(max) {
  return Math.ceil(Math.random() * max);
}

function updateActiveQuest() {
  if (document.querySelector(".questions-types__type_active")) {
    let currentActive = document.querySelector(".questions-types__type_active");
    currentActive.classList.remove("questions-types__type_active");
  }

  let quests = document.querySelectorAll(".questions-types__type");
  quests[questNumber].classList.add("questions-types__type_active");
}

let newGameButton = document.querySelector(".new-game-button");

createGameLayout();

newGameButton.addEventListener("click", newGame);

function newGame() {
  questNumber = 0;
  createGameLayout();
}

export function createNextLevel(button) {
  let target = button.currentTarget;
  questNumber++;
  if (questNumber === 6) {
    let resultsBlock = createResults();

    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    main.appendChild(resultsBlock);
    questNumber = 0;
    return;
  }
  let nexQuest = createQuestion();
  let currentQuestion = document.querySelector(".question");
  // currentQuestion.remove();
  let questionBlock = document.querySelector(".question-block");
  questionBlock.append(nexQuest);
  questionBlock.classList.add("move-left");
  questionBlock.addEventListener("animationend", function () {
    currentQuestion.remove();
    questionBlock.classList.remove("move-left");
  });
  updateActiveQuest();
  audioRight.pause();
  audioRight.currentTime = 0;
  audioRight.volume = 0.1;
  target.classList.add("next-level__button_disabled");
  target.removeEventListener("click", createNextLevel);
}
