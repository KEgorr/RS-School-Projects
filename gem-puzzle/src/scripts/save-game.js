import { movesCount } from "./move-tiles"

export function saveGame () {
  let currentGameField = document.querySelector(".game-field").innerHTML
  let currentProgressTimer = document.querySelector(".current-progress__timer").innerHTML
  let fieldSize = document.querySelector("select").value
  localStorage.setItem("fieldSize", fieldSize)
  localStorage.setItem("currentGameField", JSON.stringify(currentGameField))
  localStorage.setItem("currentProgressTimer", JSON.stringify(currentProgressTimer))
  localStorage.setItem("currentProgressMovesCount", movesCount)
}
