/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./scripts/is-solvable.js

function getInvCount (arr) {
  let invCount = 0;
  for (let i=0;i<arr.length-1; i++) {
    for (let j = i+1;j< arr.length; j++) {
      if(arr[j].value && arr[i].value && arr[i].value>arr[j].value) {
        invCount ++
      }
    }
  }
  return invCount
}

function getEmptyPos (arr) {
  for (let i = 0; i<Math.sqrt(arr.length); i++) {
    let rowArr = arr.slice(Math.sqrt(arr.length) * i, Math.sqrt(arr.length) * (i+1))
    for (let j = 0; j<rowArr.length; j++) {
      if (rowArr[j].value === false) {
        return i+1
      }
    }
  }
}

function isSolvable(arr) {
  let invCount = getInvCount(arr)
  let emptyPos = getEmptyPos(arr)
  if (Math.sqrt(arr.length) % 2 != 0) {
    if (invCount % 2 === 0) {
      return true
    }
    else {
      return false
    }
  }
  else {
    if (emptyPos % 2 != 0) {
      if (invCount % 2 != 0) {
        return true
      }
      else {return false}
    }
    else {
      if (invCount % 2 === 0) {
        return true
      }
      else {
        return false
      }
    }
  }
}


;// CONCATENATED MODULE: ./scripts/shuffle-arr.js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}
;// CONCATENATED MODULE: ./audio/slice-gem.mp3
/* harmony default export */ const slice_gem = (__webpack_require__.p + "77c55ea027be3d72d9cb53ee71ccdf21.mp3");
;// CONCATENATED MODULE: ./scripts/move-tiles.js



let movesCount = 0
if (localStorage.currentProgressMovesCount != null) {
  movesCount = localStorage.currentProgressMovesCount-1
}

let audio = new Audio()
audio.src = slice_gem
audio.volume = 0.2

function updateMovesCount() {
  let movesCountField = document.querySelector(".current-progress__moves-count")
  movesCountField.innerHTML = `Total Moves: ${movesCount}`
  movesCount++
}

function resetMovesCount() {
  movesCount = 0
}

function soundMute(soundButton) {
  soundButton.classList.add("nav__button_sound__muted")
  audio.volume = 0
  soundButton.addEventListener("click", soundUnMute)
  soundButton.removeEventListener("click", soundMute)
}

function soundUnMute() {
  let soundButton = document.querySelector(".nav__button_sound__muted")
  soundButton.classList.remove("nav__button_sound__muted")
  audio.volume = 0.2
  soundButton.addEventListener("click", soundMute)
  soundButton.removeEventListener("click", soundUnMute)
}

function playSound() {
  audio.play()
}

function exchangeElements(element1, element2) {
  var clonedElement1 = element1.cloneNode(true)
  var clonedElement2 = element2.cloneNode(true)
  element2.parentNode.replaceChild(clonedElement1, element2)
  element1.parentNode.replaceChild(clonedElement2, element1)
  return clonedElement1
}

function moveTiles (movedTile) {
  let gameTiles = document.querySelectorAll(".game-tile")
  gameTiles.forEach(element => {
    element.removeEventListener("click", moveDown)
    element.removeEventListener("click", moveUp)
    element.removeEventListener("click", moveLeft)
    element.removeEventListener("click", moveRight)
    element.removeEventListener("mousedown", dragMove)
  });
  playSound()
  let emptyTile = document.querySelector(".game-tile_empty")
  exchangeElements(movedTile, emptyTile)
  if (isSolved()) {
    let solveModal = document.createElement("div")
    solveModal.classList.add("solve-modal")
    let currentTime = document.querySelector(".current-progress__timer")
    let solveTextBlock = document.createElement("div")
    solveTextBlock.classList.add("solve-text-block")

    let solveNewGameButton = document.createElement("button")
    solveNewGameButton.classList.add("nav__button")
    solveNewGameButton.innerHTML = "New Game"

    let solveText = document.createElement("p")
    solveText.classList.add("solve-text")
    solveText.innerHTML = `Hooray! You solved the puzzle in ${currentTime.innerHTML} and ${movesCount} moves!`

    solveTextBlock.append(solveText, solveNewGameButton)
    solveModal.append(solveTextBlock)

    document.querySelector("body").append(solveModal)

    solveNewGameButton.addEventListener("click", solveModalClose)
    if (localStorage.getItem("recordsArr") === null) {
      let recordsArr = []
      recordsArr.push([currentTime.innerHTML, movesCount])
      localStorage.setItem("recordsArr", JSON.stringify(recordsArr))
    }
    else {
      let recordsArr = JSON.parse(localStorage.getItem("recordsArr"))
      recordsArr.push([currentTime.innerHTML, movesCount])
      localStorage.setItem("recordsArr", JSON.stringify(recordsArr))
    }
  }
  findTileToMove()
  updateMovesCount()
}

function solveModalClose() {
  let solveModal = document.querySelector(".solve-modal")
  solveModal.remove()
  createGemPuzzleGame(fieldSizeSelection.value)
}

function moveDown (value) {
  let movedTile = value.currentTarget
  movedTile.classList.add("game-tile_move-down")
  setTimeout(() => {
    movedTile.classList.remove("game-tile_move-down")
    moveTiles(movedTile)
  }, 190);
}
function moveUp (value) {
  let movedTile = value.currentTarget
  movedTile.classList.add("game-tile_move-up")
  setTimeout(() => {
    movedTile.classList.remove("game-tile_move-up")
    moveTiles(movedTile)
  }, 190);
}
function moveLeft (value) {
  let movedTile = value.currentTarget
  movedTile.classList.add("game-tile_move-left")
  setTimeout(() => {
    movedTile.classList.remove("game-tile_move-left")
    moveTiles(movedTile)
  }, 190);
}
function moveRight (value) {
  let movedTile = value.currentTarget
  movedTile.classList.add("game-tile_move-right")
  setTimeout(() => {
    movedTile.classList.remove("game-tile_move-right")
    moveTiles(movedTile)
  }, 190);
}

function dragMove(item) {
  let target = item.currentTarget
  let search = item.currentTarget.cloneNode(true)

  search.classList.add("draggable-tile")

  search.style.position = 'absolute'
  search.style.zIndex = 1000

  let shiftX = item.clientX - target.getBoundingClientRect().left
  let shiftY = item.clientY - target.getBoundingClientRect().top

  document.querySelector(".game-field").append(search)

  search.style.display = "none";
  function moveAt(pageX, pageY) {
    search.style.left = pageX - shiftX + 'px';
    search.style.top = pageY - shiftY+ 'px';
  }

  function onMouseMove(item) {
    moveAt(item.pageX, item.pageY);
    let gameTileEmpty = document.querySelector(".game-tile_empty")

    search.style.display = "none";
    let elemBelow = document.elementFromPoint(item.clientX, item.clientY);
    search.style.display = "flex";

    if (!elemBelow) {
      search.remove()
    }
    if (elemBelow === elemBelow.closest('.game-tile_empty')) {
      gameTileEmpty.classList.add("drag-prepare")
      search.onmouseup = function() {
        search.remove()
        moveTiles(target)
        let gameTileEmpty = document.querySelector(".game-tile_empty")
        gameTileEmpty.classList.remove("drag-prepare")
        document.removeEventListener('mousemove', onMouseMove);
        search.onmouseup = null;
      }
    }
    else {
      gameTileEmpty.classList.remove("drag-prepare")
      search.onmouseup = function() {
        search.remove()
        document.removeEventListener('mousemove', onMouseMove);
        search.onmouseup = null;
      }
    }
  }
  function removeDrag () {
    document.removeEventListener('mousemove', onMouseMove);
    search.remove()
  }
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', removeDrag);
}



function findTileToMove() {
  let emptyTile = document.querySelector(".game-tile_empty")
  let emptyTileCoordinates = emptyTile.getBoundingClientRect()
  let tilesToMove = []
  let emptyTileCoordinatesCenterX = emptyTileCoordinates.x + emptyTileCoordinates.width/2
  let emptyTileCoordinatesCenterY = emptyTileCoordinates.y + emptyTileCoordinates.height/2
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX - (emptyTileCoordinates.width), emptyTileCoordinatesCenterY))
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX + (emptyTileCoordinates.width), emptyTileCoordinatesCenterY))
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX, emptyTileCoordinatesCenterY - (emptyTileCoordinates.width)))
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX, emptyTileCoordinatesCenterY + (emptyTileCoordinates.width)))
  for (let i = 0; i<tilesToMove.length; i++) {
    if (tilesToMove[i] !=null && tilesToMove[i].classList.contains("game-tile")) {
      tilesToMove[i].addEventListener("mousedown", dragMove)
      if (i === 0) {
        tilesToMove[i].addEventListener("click", moveRight)
      }
      else if (i === 1) {
        tilesToMove[1].addEventListener("click", moveLeft)
      }
      else if (i === 2) {
        tilesToMove[2].addEventListener("click", moveDown)
      }
      else if (i === 3) {
        tilesToMove[3].addEventListener("click", moveUp)
      }
    }
  }
}

function isSolved() {
  let allTiles = document.querySelector(".game-field").childNodes
  let arrForCheck = []
  let allTilesValue = []
  allTiles.forEach(element => {
    allTilesValue.push(element.outerText)
  });
  for (let i=1; i<allTiles.length; i++) {
    arrForCheck.push(i.toString())
    if (i === allTiles.length-1) {
      arrForCheck.push("")
    }
  }
  return JSON.stringify(arrForCheck) === JSON.stringify(allTilesValue)
}
;// CONCATENATED MODULE: ./scripts/save-game.js


function saveGame () {
  let currentGameField = document.querySelector(".game-field").innerHTML
  let currentProgressTimer = document.querySelector(".current-progress__timer").innerHTML
  let fieldSize = document.querySelector("select").value
  localStorage.setItem("fieldSize", fieldSize)
  localStorage.setItem("currentGameField", JSON.stringify(currentGameField))
  localStorage.setItem("currentProgressTimer", JSON.stringify(currentProgressTimer))
  localStorage.setItem("currentProgressMovesCount", movesCount)
}

;// CONCATENATED MODULE: ./scripts/layout-create.js






const width320 = window.matchMedia("(min-width: 320px) and (max-width: 767px)")
const width768 = window.matchMedia("(min-width: 768px) and (max-width: 1279px)")
const width1280 = window.matchMedia("(min-width: 1280px)")

const header = document.createElement("header")
const nav = document.createElement("nav")

const fieldSizeText = document.createElement("p")

const fieldSizeSelection = document.createElement("select")
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
let layout_create_movesCount = document.createElement("span")
layout_create_movesCount.classList.add("current-progress__moves-count")

currentProgress.append(progressTimer,layout_create_movesCount)

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

function createGemPuzzleGame (number) {
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
  }
  findTileToMove()
} 

fieldSizeSelection.value = 4
createGemPuzzleGame(4)

newGameButton.addEventListener("click", createGemPuzzleGame.bind(null, 4))

function fieldSizeValueChange () {
  deepNewGame()
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
;// CONCATENATED MODULE: ./scripts/main.js
// import "@/styles/sass/main.scss"










/******/ })()
;