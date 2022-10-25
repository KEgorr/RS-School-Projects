import soundSlice from "@/audio/slice-gem.mp3"
import { createGemPuzzleGame, fieldSizeSelection } from "./layout-create"

export let movesCount = 0
if (localStorage.currentProgressMovesCount != null) {
  movesCount = localStorage.currentProgressMovesCount-1
}

let audio = new Audio()
audio.src = soundSlice
audio.volume = 0.2

export function updateMovesCount() {
  let movesCountField = document.querySelector(".current-progress__moves-count")
  movesCountField.innerHTML = `Total Moves: ${movesCount}`
  movesCount++
}

export function resetMovesCount() {
  movesCount = 0
}

export function soundMute(soundButton) {
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



export function findTileToMove() {
  let emptyTile = document.querySelector(".game-tile_empty")
  let emptyTileCoordinates = emptyTile.getBoundingClientRect()
  let tilesToMove = []
  let emptyTileCoordinatesCenterX = emptyTileCoordinates.x + emptyTileCoordinates.width/2
  let emptyTileCoordinatesCenterY = emptyTileCoordinates.y + emptyTileCoordinates.height/2
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX - (emptyTileCoordinates.width*1.5), emptyTileCoordinatesCenterY))
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX + (emptyTileCoordinates.width*1.5), emptyTileCoordinatesCenterY))
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX, emptyTileCoordinatesCenterY - (emptyTileCoordinates.width*1.5)))
  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX, emptyTileCoordinatesCenterY + (emptyTileCoordinates.width*1.5)))
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
  console.log(tilesToMove)
}

export function isSolved() {
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