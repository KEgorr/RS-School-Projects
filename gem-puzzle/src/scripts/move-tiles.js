const gameField = document.querySelector(".game-field")


function exchangeElements(element1, element2)
{
    var clonedElement1 = element1.cloneNode(true);
    var clonedElement2 = element2.cloneNode(true);

    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);

    return clonedElement1;
}

function moveTiles (value) {
  let gameTiles = document.querySelectorAll(".game-tile")
  gameTiles.forEach(element => {
    element.removeEventListener("click", moveTiles)
  });
  let movedTile = value.currentTarget
  let emptyTile = document.querySelector(".game-tile_empty")
  exchangeElements(movedTile, emptyTile)
  findTileToMove()
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
      tilesToMove[i].addEventListener("click", moveTiles)
    }
  }
}

