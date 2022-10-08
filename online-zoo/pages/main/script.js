let petCards = document.querySelectorAll(".pet-card")


const petButtonLeft = document.querySelector(".pets-buttons__left")
const petButtonRight = document.querySelector(".pets-buttons__right")
const burgerMenuBtn = document.querySelector("#burger")
const burgerMenu = document.querySelector(".burger_menu")
const sections = document.querySelectorAll("section")
const li = document.querySelectorAll("li")
const nav = document.querySelector('nav ul')

let petCardWrapper = document.querySelector(".pets-content-wrapper")
let petCardsArr = [].slice.call(petCards)

function burgerMenuActive() {
  if (burgerMenuBtn.checked) {
    burgerMenuBtn.checked = true
    nav.classList.add("burger-active_ul")
    nav.style.transform = "translateY(0%)";
    burgerMenu.classList.add('burger_menu_active')
    setTimeout(() => {
      sections.forEach(element => {
        element.addEventListener("click", burgerMenuClose)
      })
      document.querySelector("footer").addEventListener("click", burgerMenuClose)
    }, 0.1)
    li.forEach(element => {
      element.addEventListener("click", burgerMenuClose)
    })
  }
  else {
    burgerMenu.classList.remove('burger_menu_active')
    nav.style.transform = "translateY(-100%)"
    nav.classList.remove("burger-active_ul")
  }
}

function burgerMenuClose() {
  if (burgerMenu.classList.contains("burger_menu_active")) {
    setTimeout(() => {
      burgerMenuBtn.checked = false
    }, 0.1)
    nav.style.transform = "translateY(-100%)";
    nav.classList.remove("burger-active_ul")
    burgerMenu.classList.remove('burger_menu_active')
    sections.forEach(element => {
      element.removeEventListener("click", burgerMenuClose)
    });
    li.forEach(element => {
      element.removeEventListener("click", burgerMenuClose)
    })
    document.querySelector("footer").removeEventListener("click", burgerMenuClose)
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

function addCardsToBlock (block, cards) {
  cards = shuffle(cards)
  cards.forEach(el => {
    block.append(el.cloneNode(true))
  })
}

function petCardMoveLeft() {
  petButtonRight.removeEventListener("click", petCardMoveRight)
  petButtonLeft.removeEventListener("click", petCardMoveLeft)
  let petCardBlockLeft = document.querySelector(".block_left")
  let petCardBlockCenter = document.querySelector(".block_center")
  let petCardBlockRight = document.querySelector(".block_right")
  addCardsToBlock(petCardBlockLeft, petCardsArr)
  petCardWrapper.classList.add("pets-content-wrapper_move-left")
  setTimeout(() => {
    petCardBlockCenter.innerHTML = ""
    petCardBlockRight.innerHTML = ""

    petCardBlockCenter.classList.remove("block_center")
    petCardBlockCenter.classList.add("block_right")

    petCardBlockRight.classList.remove("block_right")
    petCardBlockRight.classList.add("block_left")

    petCardBlockLeft.classList.remove("block_left")
    petCardBlockLeft.classList.add("block_center")

    petCardWrapper.classList.remove("pets-content-wrapper_move-left")
    petButtonLeft.addEventListener("click", petCardMoveLeft)
    petButtonRight.addEventListener("click", petCardMoveRight)
    }, 350);
  petCards = document.querySelectorAll(".pet-card")
  petCards.forEach(el => {
    el.addEventListener('mouseover', petCardHoverHelperOn)
  })
  petCards.forEach(el => {
    el.addEventListener('mouseout', petCardHoverHelperOff)
  })
}

function petCardMoveRight() {
  petButtonRight.removeEventListener("click", petCardMoveRight)
  petButtonLeft.removeEventListener("click", petCardMoveLeft)
  let petCardBlockLeft = document.querySelector(".block_left")
  let petCardBlockCenter = document.querySelector(".block_center")
  let petCardBlockRight = document.querySelector(".block_right")
  addCardsToBlock(petCardBlockRight, petCardsArr)
  petCardWrapper.classList.add("pets-content-wrapper_move-right")
  setTimeout(() => {
    petCardBlockCenter.innerHTML = ""
    petCardBlockLeft.innerHTML = ""

    petCardBlockCenter.classList.remove("block_center")
    petCardBlockCenter.classList.add("block_left")

    petCardBlockRight.classList.remove("block_right")
    petCardBlockRight.classList.add("block_center")

    petCardBlockLeft.classList.remove("block_left")
    petCardBlockLeft.classList.add("block_right")

    petCardWrapper.classList.remove("pets-content-wrapper_move-right")
    petButtonLeft.addEventListener("click", petCardMoveLeft)
    petButtonRight.addEventListener("click", petCardMoveRight)
    }, 350);
  petCards = document.querySelectorAll(".pet-card")
  petCards.forEach(el => {
    el.addEventListener('mouseover', petCardHoverHelperOn)
  })
  petCards.forEach(el => {
    el.addEventListener('mouseout', petCardHoverHelperOff)
  })
}


petButtonLeft.addEventListener("click", petCardMoveLeft)
petButtonRight.addEventListener("click", petCardMoveRight)

function petCardHoverHelperOn() {
  document.querySelector(".pets-content").classList.add("shadow")
}

function petCardHoverHelperOff() {
  document.querySelector(".pets-content").classList.remove("shadow")
}

petCards.forEach(el => {
  el.addEventListener('mouseover', petCardHoverHelperOn)
})
petCards.forEach(el => {
  el.addEventListener('mouseout', petCardHoverHelperOff)
})

burgerMenuBtn.addEventListener('click', burgerMenuActive)