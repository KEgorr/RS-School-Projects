import soundSlice from "@/audio/slice-gem.mp3"

let movesCount = 0

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
    element.removeEventListener("click", playSound)
  });
  let emptyTile = document.querySelector(".game-tile_empty")
  exchangeElements(movedTile, emptyTile)
  findTileToMove()
  updateMovesCount()
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

export function findTileToMove() {
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
      tilesToMove[i].addEventListener("click", playSound)
    }
  }
}




