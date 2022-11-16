import { createAudioPlayer } from "./custom-audio-player";
import { gamesData } from "./games-data";

const galleryButton = document.querySelector(".gallery-button");

const main = document.querySelector(".main");

function createGallery() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  let galleryBlock = document.createElement("div");
  galleryBlock.classList.add("gallery-block");

  for (let i = 0; i < gamesData.length; i++) {
    for (let j = 1; j < gamesData[i].length; j++) {
      let galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");

      let galleryItemImg = document.createElement("img");
      galleryItemImg.classList.add("game-img");
      galleryItemImg.classList.add("gallery-img");
      galleryItemImg.src = gamesData[i][j].img;

      let galleryItemName = document.createElement("p");
      galleryItemName.innerHTML = gamesData[i][j].name;
      galleryItemName.classList.add("gallery-text");

      let galleryItemSongName = document.createElement("p");
      galleryItemSongName.innerHTML = gamesData[i][j].songName;
      galleryItemSongName.classList.add("gallery-text");

      let galleryItemAudio = createAudioPlayer(gamesData[i][j].audio);
      galleryItemAudio.classList.add("gallery-audio");

      let galleryItemDescription = document.createElement("p");
      galleryItemDescription.classList.add("gallery-description");
      galleryItemDescription.innerHTML = gamesData[i][j].description;

      galleryItem.append(
        galleryItemImg,
        galleryItemName,
        galleryItemSongName,
        galleryItemAudio,
        galleryItemDescription
      );
      galleryBlock.append(galleryItem);
    }
  }
  main.append(galleryBlock);
}

galleryButton.addEventListener("click", createGallery);
