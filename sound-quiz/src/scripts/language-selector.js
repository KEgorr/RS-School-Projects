let selector = document.querySelector(".language-selector");
let docLink = document.location.href.split("/");

function showLanguages() {
  let selector = document.querySelector(".language-selector");
  let selectorOptions = selector.lastElementChild;
  let language = selectorOptions.lastElementChild;

  selectorOptions.classList.add("selector-options_active");

  selector.removeEventListener("click", showLanguages);
  selector.addEventListener("mouseleave", hideLanguages);

  language.addEventListener("click", languageSwitch);
}

function languageSwitch(element) {
  let selector = document.querySelector(".language-selector");
  let selectorOptions = selector.lastElementChild;
  let language = element.currentTarget;
  if (docLink[docLink.length - 1] === "quiz.html") {
    let result;
    if (localStorage.getItem("language") === "en") {
      result = confirm(
        "Страница будет перезагружена. Весь прогресс будет потерян. Вы уверены?"
      );
      if (result) {
        document.location.reload();
      } else {
        return;
      }
    } else if (localStorage.getItem("language") === "ru") {
      result = confirm(
        "The page will be reloaded. All progress will be lost. Are you sure?"
      );
      if (result) {
        document.location.reload();
      } else {
        return;
      }
    }
  }
  if (language.classList.contains("language-en")) {
    localStorage.setItem("language", "en");
  }
  if (language.classList.contains("language-ru")) {
    localStorage.setItem("language", "ru");
  }
  exchangeElements(language, selectorOptions.firstChild);
  hideLanguages();

  localStorage.selectorIco = JSON.stringify(selector.innerHTML);
  if (docLink[docLink.length - 1] === "index.html") {
    switchingLang();
  } else if (docLink[docLink.length - 1] === "gallery.html") {
    document.location.reload();
  }
}

switchingLang();

function switchingLang() {
  let selector = document.querySelector(".language-selector");
  if (JSON.parse(localStorage.getItem("selectorIco"))) {
    selector.innerHTML = JSON.parse(localStorage.selectorIco);
  }
  switchingLangButtons();
  if (docLink[docLink.length - 1] === "index.html") {
    if (localStorage.getItem("language") === "en") {
      let intro = document.querySelector(".introduction");
      if (intro.innerHTML.indexOf("GAME OST Quiz") != -1) {
        intro.innerHTML =
          "GAME OST Quiz is a short quiz consisting of 6 questions in which you have to find the game whose sound is presented to you in the question.";
      }
    }
    if (localStorage.getItem("language") === "ru") {
      let intro = document.querySelector(".introduction");
      if (intro.innerHTML.indexOf("GAME OST Quiz") != -1) {
        intro.innerHTML =
          "GAME OST Quiz — это небольшая викторина, состоящая из 6 вопросов, в которой вам предстоит найти игру, звук из которой вам представлен в вопросе.";
      }
    }
  }
}

function switchingLangButtons() {
  if (localStorage.getItem("language") === "en") {
    let refs = document.querySelectorAll("a");
    refs.forEach((element) => {
      if (element.innerHTML.indexOf("Стартовая страница") != -1) {
        element.innerHTML = "Main page";
      }
      if (element.innerHTML.indexOf("Галерея") != -1) {
        element.innerHTML = "Gallery";
      }
      if (element.innerHTML.indexOf("Новая игра") != -1) {
        element.innerHTML = "New game";
      }
      if (element.innerHTML.indexOf("Играть сейчас") != -1) {
        element.innerHTML = "Play now";
      }
    });
  }
  if (localStorage.getItem("language") === "ru") {
    let refs = document.querySelectorAll("a");
    refs.forEach((element) => {
      if (element.innerHTML.indexOf("Main page") != -1) {
        element.innerHTML = "Стартовая страница";
      }
      if (element.innerHTML.indexOf("Gallery") != -1) {
        element.innerHTML = "Галерея";
      }
      if (element.innerHTML.indexOf("New game") != -1) {
        element.innerHTML = "Новая игра";
      }
      if (element.innerHTML.indexOf("Play now") != -1) {
        element.innerHTML = "Играть сейчас";
      }
    });
  }
}

function exchangeElements(element1, element2) {
  var clonedElement1 = element1.cloneNode(true);
  var clonedElement2 = element2.cloneNode(true);
  element2.parentNode.replaceChild(clonedElement1, element2);
  element1.parentNode.replaceChild(clonedElement2, element1);
  return clonedElement1;
}

function hideLanguages() {
  let selector = document.querySelector(".language-selector");
  let selectorOptions = selector.lastElementChild;
  selectorOptions.classList.remove("selector-options_active");
  selector.removeEventListener("mouseleave", hideLanguages);
  selector.addEventListener("click", showLanguages);
}

selector.addEventListener("click", showLanguages);
