import { isSolvable } from "./is-solvable.js"
import {shuffle} from "./shuffle-arr.js"
import { findTileToMove, isSolved } from "./move-tiles.js"
import { updateMovesCount, resetMovesCount, soundMute } from "./move-tiles.js"

const header = document.createElement("header")
const nav = document.createElement("nav")

const fieldSizeText = document.createElement("p")

export const fieldSizeSelection = document.createElement("select")
fieldSizeText.innerHTML = "Field Size:"
for (let i=3; i<=8; i++) {
  if (i === 3 || i === 4 || i === 8) {
    let option = document.createElement("option")
    option.value = i
    option.innerHTML = `${i} x ${i}`
    fieldSizeSelection.append(option)
  }
}

const newGameButton = document.createElement("button")
newGameButton.innerHTML = "New Game"
newGameButton.classList.add("nav__button")
const saveButton = document.createElement("button")
saveButton.innerHTML = "Save"
saveButton.classList.add("nav__button")
const recordsButton = document.createElement("button")
recordsButton.innerHTML = "Records"
recordsButton.classList.add("nav__button")
const soundButton = document.createElement("button")
soundButton.classList.add("nav__button_sound")

nav.append(fieldSizeText,fieldSizeSelection, newGameButton, saveButton, recordsButton, soundButton)
header.append(nav)

soundButton.addEventListener("click", soundMute.bind(null, soundButton))

const currentProgress = document.createElement("div")
currentProgress.classList.add("current-progress")

const progressTimer = document.createElement("span")
progressTimer.classList.add("current-progress__timer")
let movesCount = document.createElement("span")
movesCount.classList.add("current-progress__moves-count")

currentProgress.append(progressTimer,movesCount)

let seconds = 0
let secondsDecade = 0
let minutes = 0
let minutesDecade = 0

function timerStop() {
  progressTimer.innerHTML = "00:00"
  seconds = 0
  secondsDecade = 0
  minutes = 0
  minutesDecade = 0
  clearInterval(timerID)
}

function timer() {
  progressTimer.innerHTML = `${minutesDecade}${minutes}:${secondsDecade}${seconds}`
  seconds++
  if (seconds === 10) {
    secondsDecade++
    if (secondsDecade === 6) {
      minutes++
      secondsDecade = 0
      if (minutes === 10) {
        minutesDecade++
        minutes = 0
        if (minutesDecade === 6) {
          seconds="#"
          minutes="#"
          secondsDecade="#"
          minutesDecade="#"
          progressTimer.innerHTML = `${minutesDecade}${minutes}:${secondsDecade}${seconds}`
          clearInterval(timerID)
        }
      }
    }
    seconds = 0
  }
  if (isSolved()) {
    clearInterval(timerID)
  }
}

let timerID = setInterval(timer, 1000);

const gameField = document.createElement("div")
gameField.classList.add("game-field")

document.querySelector("body").append(header, currentProgress, gameField)

export function createGemPuzzleGame (number) {
  gameField.innerHTML = ""
  let gameTiles = []
  for (let i = 1; i<=number * number; i++) {
    let gameTile = document.createElement("p")
    let gameFieldWidth = getComputedStyle(gameField, null).width.replace("px", "");
    gameTile.style.width = `${(gameFieldWidth/number)-5}px`
    gameTile.style.height = `${(gameFieldWidth/number)-5}px`
    if (i === number * number) {
      gameTile.classList.add("game-tile_empty")
      gameTile.value = false
    }
    else {
      gameTile.classList.add("game-tile")
      gameTile.value = i
      gameTile.innerHTML = `${i}`
    }
    gameTiles.push(gameTile)
  }
  gameTiles = shuffle(gameTiles)
  
  while (!isSolvable(gameTiles)) {
    shuffle(gameTiles)
  }
  gameTiles.forEach(element => {
    gameField.append(element)
  });
  findTileToMove()
  timerStop()
  timerID = setInterval(timer, 1000)
  resetMovesCount()
  updateMovesCount()
} 

createGemPuzzleGame(4)
fieldSizeSelection.value = 4

newGameButton.addEventListener("click", createGemPuzzleGame.bind(null, 4))

function fieldSizeValueChange () {
  createGemPuzzleGame(fieldSizeSelection.value)
  newGameButton.addEventListener("click", createGemPuzzleGame.bind(null, fieldSizeSelection.value))

}

fieldSizeSelection.addEventListener("change", fieldSizeValueChange)