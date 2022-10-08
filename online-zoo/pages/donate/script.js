const burgerMenuBtn = document.querySelector("#burger")
const burgerMenu = document.querySelector(".burger_menu")
const nav = document.querySelector('nav ul')
const sections = document.querySelectorAll("section")
const li = document.querySelectorAll("li")


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

burgerMenuBtn.addEventListener('click', burgerMenuActive)
