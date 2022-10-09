
const burgerMenuBtn = document.querySelector("#burger")
const burgerMenu = document.querySelector(".burger_menu")
const nav = document.querySelector('nav ul')
const sections = document.querySelectorAll("section")
const li = document.querySelectorAll("li")
const rangeBar640px = document.querySelector(".range-bar__640px")
const rangeBar1000px = document.querySelector(".range-bar__1000px")
const rangeBar1600px = document.querySelector(".range-bar__1600px")
const anotherAmountForm = document.querySelector(".donate-input__numrer input")

const width1000 = window.matchMedia("((min-width: 1000px) and (max-width: 1599px))")
const width1600 = window.matchMedia("(min-width:1600px)")
const width640 = window.matchMedia("((min-width: 320px) and (max-width: 999px))")

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

function amountChanging() {
  let amount = document.querySelectorAll(".donate-value__value")
  if (document.querySelector(".donate-value__value_colored") == null) {
    amount[0].classList.add("donate-value__value_colored")
  }
  let coloredValue = document.querySelector(".donate-value__value_colored")
  rangeBar640px.classList.add("input-range")
  rangeBar640px.classList.remove("non-track")
  rangeBar1000px.classList.add("input-range")
  rangeBar1000px.classList.remove("non-track")
  rangeBar1600px.classList.add("input-range")
  rangeBar1600px.classList.remove("non-track")
  if (width640.matches) {
    let value = rangeBar640px.value
    if (value == 1) {
      anotherAmountForm.value = 500
      coloredValue.classList.remove("donate-value__value_colored")
      amount[3].classList.add("donate-value__value_colored")
    }
    if (value == 2) {
      anotherAmountForm.value = 250
      coloredValue.classList.remove("donate-value__value_colored")
      amount[4].classList.add("donate-value__value_colored")
    }
    if (value == 3) {
      anotherAmountForm.value = 100
      coloredValue.classList.remove("donate-value__value_colored")
      amount[5].classList.add("donate-value__value_colored")
    }
    if (value == 4) {
      anotherAmountForm.value = 50
      coloredValue.classList.remove("donate-value__value_colored")
      amount[6].classList.add("donate-value__value_colored")
    }
    if (value == 5) {
      anotherAmountForm.value = 25
      coloredValue.classList.remove("donate-value__value_colored")
      amount[7].classList.add("donate-value__value_colored")
    }
  }
  else if (width1000.matches) {
    let value = rangeBar1000px.value
    if (value == 1) {
      anotherAmountForm.value = 2000
      coloredValue.classList.remove("donate-value__value_colored")
      amount[1].classList.add("donate-value__value_colored")
    }
    if (value == 2) {
      anotherAmountForm.value = 1000
      coloredValue.classList.remove("donate-value__value_colored")
      amount[2].classList.add("donate-value__value_colored")
    }
    if (value == 3) {
      anotherAmountForm.value = 500
      coloredValue.classList.remove("donate-value__value_colored")
      amount[3].classList.add("donate-value__value_colored")
    }
    if (value == 4) {
      anotherAmountForm.value = 250
      coloredValue.classList.remove("donate-value__value_colored")
      amount[4].classList.add("donate-value__value_colored")
    }
    if (value == 5) {
      anotherAmountForm.value = 100
      coloredValue.classList.remove("donate-value__value_colored")
      amount[5].classList.add("donate-value__value_colored")
    }
    if (value == 6) {
      anotherAmountForm.value = 50
      coloredValue.classList.remove("donate-value__value_colored")
      amount[6].classList.add("donate-value__value_colored")
    }
    if (value == 7) {
      anotherAmountForm.value = 25
      coloredValue.classList.remove("donate-value__value_colored")
      amount[7].classList.add("donate-value__value_colored")
    }
  }
  else if (width1600.matches) {
    let value = rangeBar1600px.value
    if (value == 1) {
      anotherAmountForm.value = 5000
      coloredValue.classList.remove("donate-value__value_colored")
      amount[0].classList.add("donate-value__value_colored")
    }
    if (value == 2) {
      anotherAmountForm.value = 2000
      coloredValue.classList.remove("donate-value__value_colored")
      amount[1].classList.add("donate-value__value_colored")
    }
    if (value == 3) {
      anotherAmountForm.value = 1000
      coloredValue.classList.remove("donate-value__value_colored")
      amount[2].classList.add("donate-value__value_colored")
    }
    if (value == 4) {
      anotherAmountForm.value = 500
      coloredValue.classList.remove("donate-value__value_colored")
      amount[3].classList.add("donate-value__value_colored")
    }
    if (value == 5) {
      anotherAmountForm.value = 250
      coloredValue.classList.remove("donate-value__value_colored")
      amount[4].classList.add("donate-value__value_colored")
    }
    if (value == 6) {
      anotherAmountForm.value = 100
      coloredValue.classList.remove("donate-value__value_colored")
      amount[5].classList.add("donate-value__value_colored")
    }
    if (value == 7) {
      anotherAmountForm.value = 50
      coloredValue.classList.remove("donate-value__value_colored")
      amount[6].classList.add("donate-value__value_colored")
    }
    if (value == 8) {
      anotherAmountForm.value = 25
      coloredValue.classList.remove("donate-value__value_colored")
      amount[7].classList.add("donate-value__value_colored")
    }
  }
}

function amountValidatorAndRangeBarChanging () {
  let amountValue = anotherAmountForm.value
  let coloredValue = document.querySelector(".donate-value__value_colored")
  if (amountValue.length > 4) {
    anotherAmountForm.value = amountValue.slice(0,amountValue.length-1)
    amountValue = anotherAmountForm.value
  }
  if (width640.matches) {
    if (amountValue == 500) {
      rangeBar640px.value = 1
      amountChanging()
    }
    else if (amountValue == 250) {
      rangeBar640px.value = 2
      amountChanging()
    }
    else if (amountValue == 100) {
      rangeBar640px.value = 3
      amountChanging()
    }
    else if (amountValue == 50) {
      rangeBar640px.value = 4
      amountChanging()
    }
    else if (amountValue == 25) {
      rangeBar640px.value = 5
      amountChanging()
    }
    else {
      rangeBar640px.classList.remove("input-range")
      rangeBar640px.classList.add("non-track")
      coloredValue.classList.remove("donate-value__value_colored")
    }
  }
  if (width1000.matches) {
    if (amountValue == 2000) {
      rangeBar1000px.value = 1
      amountChanging()
    }
    else if (amountValue == 1000) {
      rangeBar1000px.value = 2
      amountChanging()
    }
    else if (amountValue == 500) {
      rangeBar1000px.value = 3
      amountChanging()
    }
    else if (amountValue == 250) {
      rangeBar1000px.value = 4
      amountChanging()
    }
    else if (amountValue == 100) {
      rangeBar1000px.value = 5
      amountChanging()
    }
    else if (amountValue == 50) {
      rangeBar1000px.value = 6
      amountChanging()
    }
    else if (amountValue == 25) {
      rangeBar1000px.value = 7
      amountChanging()
    }
    else {
      rangeBar1000px.classList.remove("input-range")
      rangeBar1000px.classList.add("non-track")
      coloredValue.classList.remove("donate-value__value_colored")
    }
  }
  if (width1600.matches) {
    if (amountValue == 5000) {
      rangeBar1600px.value = 1
      amountChanging()
    }
    else if (amountValue == 2000) {
      rangeBar1600px.value = 2
      amountChanging()
    }
    else if (amountValue == 1000) {
      rangeBar1600px.value = 3
      amountChanging()
    }
    else if (amountValue == 500) {
      rangeBar1600px.value = 4
      amountChanging()
    }
    else if (amountValue == 250) {
      rangeBar1600px.value = 5
      amountChanging()
    }
    else if (amountValue == 100) {
      rangeBar1600px.value = 6
      amountChanging()
    }
    else if (amountValue == 50) {
      rangeBar1600px.value = 7
      amountChanging()
    }
    else if (amountValue == 25) {
      rangeBar1600px.value = 8
      amountChanging()
    }
    else {
      rangeBar1600px.classList.remove("input-range")
      rangeBar1600px.classList.add("non-track")
      coloredValue.classList.remove("donate-value__value_colored")
    }
  }
}


width1000.addListener(amountChanging)
width1600.addListener(amountChanging)
width640.addListener(amountChanging)

amountChanging()

rangeBar1600px.addEventListener("input", amountChanging)
rangeBar640px.addEventListener("input", amountChanging)
rangeBar1000px.addEventListener("input", amountChanging)
anotherAmountForm.addEventListener("input", amountValidatorAndRangeBarChanging)
anotherAmountForm.addEventListener("change", amountValidatorAndRangeBarChanging)



burgerMenuBtn.addEventListener('click', burgerMenuActive)
