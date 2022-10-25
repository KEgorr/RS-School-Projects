import { isSolvable } from "./is-solvable.js"
import {shuffle} from "./shuffle-arr.js"
import { findTileToMove, isSolved } from "./move-tiles.js"
import { updateMovesCount, resetMovesCount, soundMute } from "./move-tiles.js"
import { saveGame } from "./save-game.js"

const width320 = window.matchMedia("(min-width: 320px) and (max-width: 767px)")
const width768 = window.matchMedia("(min-width: 768px) and (max-width: 1279px)")
const width1280 = window.matchMedia("(min-width: 1280px)")

const header = document.createElement("header")
const nav = document.createElement("nav")

const fieldSizeText = document.createElement("p")

export const fieldSizeSelection = document.createElement("select")
fieldSizeText.innerHTML = "Field Size:"
for (let i=3; i<=8; i++) {
    let option = document.createElement("option")
    option.value = i
    option.innerHTML = `${i} x ${i}`
    fieldSizeSelection.append(option)
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

function timerReset() {
  progressTimer.innerHTML = "00:00"
  seconds = 0
  secondsDecade = 0
  minutes = 0
  minutesDecade = 0
  clearInterval(timerID)
}

function stopTimer() {
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
      if (width320.matches) {
        gameTile.style.width = `${(gameFieldWidth/number)-2}px`
        gameTile.style.height = `${(gameFieldWidth/number)-2}px`
      }
      else {
        gameTile.style.width = `${(gameFieldWidth/number)-5}px`
        gameTile.style.height = `${(gameFieldWidth/number)-5}px`
      }
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
    timerReset()
    timerID = setInterval(timer, 1000)
    resetMovesCount()
    updateMovesCount()
  findTileToMove()
}

function createOldPuzzle() {
  if (localStorage.currentGameField != null) {
    gameField.innerHTML = JSON.parse(localStorage.currentGameField)
    progressTimer.innerHTML = JSON.parse(localStorage.currentProgressTimer)
    stopTimer()
    seconds = progressTimer.innerHTML[4]
    secondsDecade = progressTimer.innerHTML[3]
    minutes = progressTimer.innerHTML[1]
    minutesDecade = progressTimer.innerHTML[0]
    timerID = setInterval(timer, 1000)
    updateMovesCount()
    fieldSizeSelection.value = localStorage.fieldSize
    gameFieldNewWidth()
  }
  else {
    fieldSizeSelection.value = 4
    createGemPuzzleGame(4)
  }
}

createOldPuzzle()

newGameButton.addEventListener("click", createGemPuzzleGame.bind(null, 4))

function fieldSizeValueChange () {
  // deepNewGame()
  createGemPuzzleGame(fieldSizeSelection.value)
  newGameButton.addEventListener("click", createGemPuzzleGame.bind(null, fieldSizeSelection.value))
}

function deepNewGame() {
  localStorage.removeItem("currentGameField")
  localStorage.removeItem("currentProgressMovesCount")
  localStorage.removeItem("currentProgressTimer")
  createGemPuzzleGame(fieldSizeSelection.value)
}

function showRecords() {
  let recordsWindow = document.createElement("div")
  recordsWindow.classList.add("records-window")

  let recordsBlock = document.createElement("div")
  recordsBlock.classList.add("records-block")

  let recordsIntro = document.createElement("p")
  recordsIntro.classList.add("records-intro")
  recordsIntro.innerHTML = "Results are sorted by the average number of moves per second"

  let results = document.createElement("div")
  results.classList.add("results")

  if (localStorage.getItem("recordsArr") === null) {
    let resultsText = document.createElement("p")
    resultsText.classList.add("results-text")
    resultsText.innerHTML = "Nothing yet :("
    results.append(resultsText)
  }
  else {
    let recordsArr = JSON.parse(localStorage.getItem("recordsArr"))
    recordsArr.sort((a,b) => {
      let timeA = a[0].split(":")
      let minutesA = Number(timeA[0])
      let secondsA = Number (timeA[1])
      let allTimeA = (minutesA * 60) + secondsA

      let timeB = b[0].split(":")
      let minutesB = Number(timeB[0])
      let secondsB = Number (timeB[1])
      let allTimeB = (minutesB * 60) + secondsB

      return allTimeA/a[1] - allTimeB/b[1]
    })
    if (recordsArr.length > 10) {
      recordsArr = recordsArr.slice(0,10)
    }
    for (let i = 0; i<recordsArr.length; i++) {
      let records = document.createElement("p")
      results.append(records)
      records.innerHTML = `${i+1}: Time ${recordsArr[i][0]}, Moves: ${recordsArr[i][1]}`
    }
  }

  recordsBlock.append(recordsIntro, results)
  recordsWindow.append(recordsBlock)
  document.querySelector("body").append(recordsWindow)
  recordsWindow.addEventListener("click", closeRecords)
}

function closeRecords(event) {
  let recordsWindow = document.querySelector(".records-window")
  let target = event.target.closest(".records-block")
  if (!target) {
    recordsWindow.remove()
  }
}

function gameFieldNewWidth() {
  let gameTiles = document.querySelectorAll(".game-tile")
  let gameTileEmpty = document.querySelector(".game-tile_empty")
  let gameFieldWidth = getComputedStyle(gameField, null).width.replace("px", "")
  let number = fieldSizeSelection.value
  if (width768.matches || width1280.matches) {
    gameTiles.forEach(element => {
      element.style.width = `${(gameFieldWidth/number)-5}px`
      element.style.height = `${(gameFieldWidth/number)-5}px`
    });
    gameTileEmpty.style.width = `${(gameFieldWidth/number)-5}px`
    gameTileEmpty.style.height = `${(gameFieldWidth/number)-5}px`
  }
  if (width320.matches) {
    gameTiles.forEach(element => {
      element.style.width = `${(gameFieldWidth/number)-2}px`
      element.style.height = `${(gameFieldWidth/number)-2}px`
    });
    gameTileEmpty.style.width = `${(gameFieldWidth/number)-2}px`
    gameTileEmpty.style.height = `${(gameFieldWidth/number)-2}px`
  }
}

width768.addListener(gameFieldNewWidth)
width1280.addListener(gameFieldNewWidth)
width320.addListener(gameFieldNewWidth)

recordsButton.addEventListener("click", showRecords)

newGameButton.addEventListener("click", deepNewGame)

saveButton.addEventListener("click", saveGame)

fieldSizeSelection.addEventListener("change", fieldSizeValueChange)
newGameButton.addEventListener("click", deepNewGame.bind(null, fieldSizeSelection.value))