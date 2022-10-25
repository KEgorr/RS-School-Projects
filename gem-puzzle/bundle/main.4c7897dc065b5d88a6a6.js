/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./audio/slice-gem.mp3":
/*!*****************************!*\
  !*** ./audio/slice-gem.mp3 ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"77c55ea027be3d72d9cb53ee71ccdf21.mp3\");\n\n//# sourceURL=webpack:///./audio/slice-gem.mp3?");

/***/ }),

/***/ "./styles/sass/main.scss":
/*!*******************************!*\
  !*** ./styles/sass/main.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./styles/sass/main.scss?");

/***/ }),

/***/ "./scripts/is-solvable.js":
/*!********************************!*\
  !*** ./scripts/is-solvable.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isSolvable\": () => (/* binding */ isSolvable)\n/* harmony export */ });\n\r\nfunction getInvCount (arr) {\r\n  let invCount = 0;\r\n  for (let i=0;i<arr.length-1; i++) {\r\n    for (let j = i+1;j< arr.length; j++) {\r\n      if(arr[j].value && arr[i].value && arr[i].value>arr[j].value) {\r\n        invCount ++\r\n      }\r\n    }\r\n  }\r\n  return invCount\r\n}\r\n\r\nfunction getEmptyPos (arr) {\r\n  for (let i = 0; i<Math.sqrt(arr.length); i++) {\r\n    let rowArr = arr.slice(Math.sqrt(arr.length) * i, Math.sqrt(arr.length) * (i+1))\r\n    for (let j = 0; j<rowArr.length; j++) {\r\n      if (rowArr[j].value === false) {\r\n        return i+1\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nfunction isSolvable(arr) {\r\n  let invCount = getInvCount(arr)\r\n  let emptyPos = getEmptyPos(arr)\r\n  if (Math.sqrt(arr.length) % 2 != 0) {\r\n    if (invCount % 2 === 0) {\r\n      return true\r\n    }\r\n    else {\r\n      return false\r\n    }\r\n  }\r\n  else {\r\n    if (emptyPos % 2 != 0) {\r\n      if (invCount % 2 != 0) {\r\n        return true\r\n      }\r\n      else {return false}\r\n    }\r\n    else {\r\n      if (invCount % 2 === 0) {\r\n        return true\r\n      }\r\n      else {\r\n        return false\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/is-solvable.js?");

/***/ }),

/***/ "./scripts/layout-create.js":
/*!**********************************!*\
  !*** ./scripts/layout-create.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createGemPuzzleGame\": () => (/* binding */ createGemPuzzleGame),\n/* harmony export */   \"fieldSizeSelection\": () => (/* binding */ fieldSizeSelection)\n/* harmony export */ });\n/* harmony import */ var _is_solvable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-solvable.js */ \"./scripts/is-solvable.js\");\n/* harmony import */ var _shuffle_arr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shuffle-arr.js */ \"./scripts/shuffle-arr.js\");\n/* harmony import */ var _move_tiles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./move-tiles.js */ \"./scripts/move-tiles.js\");\n/* harmony import */ var _save_game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save-game.js */ \"./scripts/save-game.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst width320 = window.matchMedia(\"(min-width: 320px) and (max-width: 767px)\")\r\nconst width768 = window.matchMedia(\"(min-width: 768px) and (max-width: 1279px)\")\r\nconst width1280 = window.matchMedia(\"(min-width: 1280px)\")\r\n\r\nconst header = document.createElement(\"header\")\r\nconst nav = document.createElement(\"nav\")\r\n\r\nconst fieldSizeText = document.createElement(\"p\")\r\n\r\nconst fieldSizeSelection = document.createElement(\"select\")\r\nfieldSizeText.innerHTML = \"Field Size:\"\r\nfor (let i=3; i<=8; i++) {\r\n    let option = document.createElement(\"option\")\r\n    option.value = i\r\n    option.innerHTML = `${i} x ${i}`\r\n    fieldSizeSelection.append(option)\r\n}\r\n\r\nconst newGameButton = document.createElement(\"button\")\r\nnewGameButton.innerHTML = \"New Game\"\r\nnewGameButton.classList.add(\"nav__button\")\r\nconst saveButton = document.createElement(\"button\")\r\nsaveButton.innerHTML = \"Save\"\r\nsaveButton.classList.add(\"nav__button\")\r\nconst recordsButton = document.createElement(\"button\")\r\nrecordsButton.innerHTML = \"Records\"\r\nrecordsButton.classList.add(\"nav__button\")\r\nconst soundButton = document.createElement(\"button\")\r\nsoundButton.classList.add(\"nav__button_sound\")\r\n\r\nnav.append(fieldSizeText,fieldSizeSelection, newGameButton, saveButton, recordsButton, soundButton)\r\nheader.append(nav)\r\n\r\nsoundButton.addEventListener(\"click\", _move_tiles_js__WEBPACK_IMPORTED_MODULE_2__.soundMute.bind(null, soundButton))\r\n\r\nconst currentProgress = document.createElement(\"div\")\r\ncurrentProgress.classList.add(\"current-progress\")\r\n\r\nconst progressTimer = document.createElement(\"span\")\r\nprogressTimer.classList.add(\"current-progress__timer\")\r\nlet movesCount = document.createElement(\"span\")\r\nmovesCount.classList.add(\"current-progress__moves-count\")\r\n\r\ncurrentProgress.append(progressTimer,movesCount)\r\n\r\nlet seconds = 0\r\nlet secondsDecade = 0\r\nlet minutes = 0\r\nlet minutesDecade = 0\r\n\r\nfunction timerReset() {\r\n  progressTimer.innerHTML = \"00:00\"\r\n  seconds = 0\r\n  secondsDecade = 0\r\n  minutes = 0\r\n  minutesDecade = 0\r\n  clearInterval(timerID)\r\n}\r\n\r\nfunction stopTimer() {\r\n  clearInterval(timerID)\r\n}\r\n\r\nfunction timer() {\r\n  progressTimer.innerHTML = `${minutesDecade}${minutes}:${secondsDecade}${seconds}`\r\n  seconds++\r\n  if (seconds === 10) {\r\n    secondsDecade++\r\n    if (secondsDecade === 6) {\r\n      minutes++\r\n      secondsDecade = 0\r\n      if (minutes === 10) {\r\n        minutesDecade++\r\n        minutes = 0\r\n        if (minutesDecade === 6) {\r\n          seconds=\"#\"\r\n          minutes=\"#\"\r\n          secondsDecade=\"#\"\r\n          minutesDecade=\"#\"\r\n          progressTimer.innerHTML = `${minutesDecade}${minutes}:${secondsDecade}${seconds}`\r\n          clearInterval(timerID)\r\n        }\r\n      }\r\n    }\r\n    seconds = 0\r\n  }\r\n  if ((0,_move_tiles_js__WEBPACK_IMPORTED_MODULE_2__.isSolved)()) {\r\n    clearInterval(timerID)\r\n  }\r\n}\r\n\r\nlet timerID = setInterval(timer, 1000);\r\n\r\nconst gameField = document.createElement(\"div\")\r\ngameField.classList.add(\"game-field\")\r\n\r\ndocument.querySelector(\"body\").append(header, currentProgress, gameField)\r\n\r\nfunction createGemPuzzleGame (number) {\r\n    gameField.innerHTML = \"\"\r\n    let gameTiles = []\r\n    for (let i = 1; i<=number * number; i++) {\r\n      let gameTile = document.createElement(\"p\")\r\n      let gameFieldWidth = getComputedStyle(gameField, null).width.replace(\"px\", \"\");\r\n      if (width320.matches) {\r\n        gameTile.style.width = `${(gameFieldWidth/number)-2}px`\r\n        gameTile.style.height = `${(gameFieldWidth/number)-2}px`\r\n      }\r\n      else {\r\n        gameTile.style.width = `${(gameFieldWidth/number)-5}px`\r\n        gameTile.style.height = `${(gameFieldWidth/number)-5}px`\r\n      }\r\n      if (i === number * number) {\r\n        gameTile.classList.add(\"game-tile_empty\")\r\n        gameTile.value = false\r\n      }\r\n      else {\r\n        gameTile.classList.add(\"game-tile\")\r\n        gameTile.value = i\r\n        gameTile.innerHTML = `${i}`\r\n      }\r\n      gameTiles.push(gameTile)\r\n    }\r\n    gameTiles = (0,_shuffle_arr_js__WEBPACK_IMPORTED_MODULE_1__.shuffle)(gameTiles)\r\n    \r\n    while (!(0,_is_solvable_js__WEBPACK_IMPORTED_MODULE_0__.isSolvable)(gameTiles)) {\r\n      (0,_shuffle_arr_js__WEBPACK_IMPORTED_MODULE_1__.shuffle)(gameTiles)\r\n    }\r\n    gameTiles.forEach(element => {\r\n      gameField.append(element)\r\n    });\r\n    timerReset()\r\n    timerID = setInterval(timer, 1000)\r\n    ;(0,_move_tiles_js__WEBPACK_IMPORTED_MODULE_2__.resetMovesCount)()\r\n    ;(0,_move_tiles_js__WEBPACK_IMPORTED_MODULE_2__.updateMovesCount)()\r\n  ;(0,_move_tiles_js__WEBPACK_IMPORTED_MODULE_2__.findTileToMove)()\r\n}\r\n\r\nfunction createOldPuzzle() {\r\n  if (localStorage.currentGameField != null) {\r\n    gameField.innerHTML = JSON.parse(localStorage.currentGameField)\r\n    progressTimer.innerHTML = JSON.parse(localStorage.currentProgressTimer)\r\n    stopTimer()\r\n    seconds = progressTimer.innerHTML[4]\r\n    secondsDecade = progressTimer.innerHTML[3]\r\n    minutes = progressTimer.innerHTML[1]\r\n    minutesDecade = progressTimer.innerHTML[0]\r\n    timerID = setInterval(timer, 1000)\r\n    ;(0,_move_tiles_js__WEBPACK_IMPORTED_MODULE_2__.updateMovesCount)()\r\n    fieldSizeSelection.value = localStorage.fieldSize\r\n    gameFieldNewWidth()\r\n  }\r\n  else {\r\n    fieldSizeSelection.value = 4\r\n    createGemPuzzleGame(4)\r\n  }\r\n}\r\n\r\ncreateOldPuzzle()\r\n\r\nnewGameButton.addEventListener(\"click\", createGemPuzzleGame.bind(null, 4))\r\n\r\nfunction fieldSizeValueChange () {\r\n  // deepNewGame()\r\n  createGemPuzzleGame(fieldSizeSelection.value)\r\n  newGameButton.addEventListener(\"click\", createGemPuzzleGame.bind(null, fieldSizeSelection.value))\r\n}\r\n\r\nfunction deepNewGame() {\r\n  localStorage.removeItem(\"currentGameField\")\r\n  localStorage.removeItem(\"currentProgressMovesCount\")\r\n  localStorage.removeItem(\"currentProgressTimer\")\r\n  createGemPuzzleGame(fieldSizeSelection.value)\r\n}\r\n\r\nfunction showRecords() {\r\n  let recordsWindow = document.createElement(\"div\")\r\n  recordsWindow.classList.add(\"records-window\")\r\n\r\n  let recordsBlock = document.createElement(\"div\")\r\n  recordsBlock.classList.add(\"records-block\")\r\n\r\n  let recordsIntro = document.createElement(\"p\")\r\n  recordsIntro.classList.add(\"records-intro\")\r\n  recordsIntro.innerHTML = \"Results are sorted by the average number of moves per second\"\r\n\r\n  let results = document.createElement(\"div\")\r\n  results.classList.add(\"results\")\r\n\r\n  if (localStorage.getItem(\"recordsArr\") === null) {\r\n    let resultsText = document.createElement(\"p\")\r\n    resultsText.classList.add(\"results-text\")\r\n    resultsText.innerHTML = \"Nothing yet :(\"\r\n    results.append(resultsText)\r\n  }\r\n  else {\r\n    let recordsArr = JSON.parse(localStorage.getItem(\"recordsArr\"))\r\n    recordsArr.sort((a,b) => {\r\n      let timeA = a[0].split(\":\")\r\n      let minutesA = Number(timeA[0])\r\n      let secondsA = Number (timeA[1])\r\n      let allTimeA = (minutesA * 60) + secondsA\r\n\r\n      let timeB = b[0].split(\":\")\r\n      let minutesB = Number(timeB[0])\r\n      let secondsB = Number (timeB[1])\r\n      let allTimeB = (minutesB * 60) + secondsB\r\n\r\n      return allTimeA/a[1] - allTimeB/b[1]\r\n    })\r\n    if (recordsArr.length > 10) {\r\n      recordsArr = recordsArr.slice(0,10)\r\n    }\r\n    for (let i = 0; i<recordsArr.length; i++) {\r\n      let records = document.createElement(\"p\")\r\n      results.append(records)\r\n      records.innerHTML = `${i+1}: Time ${recordsArr[i][0]}, Moves: ${recordsArr[i][1]}`\r\n    }\r\n  }\r\n\r\n  recordsBlock.append(recordsIntro, results)\r\n  recordsWindow.append(recordsBlock)\r\n  document.querySelector(\"body\").append(recordsWindow)\r\n  recordsWindow.addEventListener(\"click\", closeRecords)\r\n}\r\n\r\nfunction closeRecords(event) {\r\n  let recordsWindow = document.querySelector(\".records-window\")\r\n  let target = event.target.closest(\".records-block\")\r\n  if (!target) {\r\n    recordsWindow.remove()\r\n  }\r\n}\r\n\r\nfunction gameFieldNewWidth() {\r\n  let gameTiles = document.querySelectorAll(\".game-tile\")\r\n  let gameTileEmpty = document.querySelector(\".game-tile_empty\")\r\n  let gameFieldWidth = getComputedStyle(gameField, null).width.replace(\"px\", \"\")\r\n  let number = fieldSizeSelection.value\r\n  if (width768.matches || width1280.matches) {\r\n    gameTiles.forEach(element => {\r\n      element.style.width = `${(gameFieldWidth/number)-5}px`\r\n      element.style.height = `${(gameFieldWidth/number)-5}px`\r\n    });\r\n    gameTileEmpty.style.width = `${(gameFieldWidth/number)-5}px`\r\n    gameTileEmpty.style.height = `${(gameFieldWidth/number)-5}px`\r\n  }\r\n  if (width320.matches) {\r\n    gameTiles.forEach(element => {\r\n      element.style.width = `${(gameFieldWidth/number)-2}px`\r\n      element.style.height = `${(gameFieldWidth/number)-2}px`\r\n    });\r\n    gameTileEmpty.style.width = `${(gameFieldWidth/number)-2}px`\r\n    gameTileEmpty.style.height = `${(gameFieldWidth/number)-2}px`\r\n  }\r\n}\r\n\r\nwidth768.addListener(gameFieldNewWidth)\r\nwidth1280.addListener(gameFieldNewWidth)\r\nwidth320.addListener(gameFieldNewWidth)\r\n\r\nrecordsButton.addEventListener(\"click\", showRecords)\r\n\r\nnewGameButton.addEventListener(\"click\", deepNewGame)\r\n\r\nsaveButton.addEventListener(\"click\", _save_game_js__WEBPACK_IMPORTED_MODULE_3__.saveGame)\r\n\r\nfieldSizeSelection.addEventListener(\"change\", fieldSizeValueChange)\r\nnewGameButton.addEventListener(\"click\", deepNewGame.bind(null, fieldSizeSelection.value))\n\n//# sourceURL=webpack:///./scripts/layout-create.js?");

/***/ }),

/***/ "./scripts/main.js":
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shuffle_arr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shuffle-arr.js */ \"./scripts/shuffle-arr.js\");\n/* harmony import */ var _scripts_layout_create_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scripts/layout-create.js */ \"./scripts/layout-create.js\");\n/* harmony import */ var _scripts_move_tiles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/scripts/move-tiles.js */ \"./scripts/move-tiles.js\");\n/* harmony import */ var _scripts_save_game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/scripts/save-game.js */ \"./scripts/save-game.js\");\n/* harmony import */ var _styles_sass_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/sass/main.scss */ \"./styles/sass/main.scss\");\n// import \"@/styles/sass/main.scss\"\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/main.js?");

/***/ }),

/***/ "./scripts/move-tiles.js":
/*!*******************************!*\
  !*** ./scripts/move-tiles.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findTileToMove\": () => (/* binding */ findTileToMove),\n/* harmony export */   \"isSolved\": () => (/* binding */ isSolved),\n/* harmony export */   \"movesCount\": () => (/* binding */ movesCount),\n/* harmony export */   \"resetMovesCount\": () => (/* binding */ resetMovesCount),\n/* harmony export */   \"soundMute\": () => (/* binding */ soundMute),\n/* harmony export */   \"updateMovesCount\": () => (/* binding */ updateMovesCount)\n/* harmony export */ });\n/* harmony import */ var _audio_slice_gem_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/audio/slice-gem.mp3 */ \"./audio/slice-gem.mp3\");\n/* harmony import */ var _layout_create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout-create */ \"./scripts/layout-create.js\");\n\r\n\r\n\r\nlet movesCount = 0\r\nif (localStorage.currentProgressMovesCount != null) {\r\n  movesCount = localStorage.currentProgressMovesCount-1\r\n}\r\n\r\nlet audio = new Audio()\r\naudio.src = _audio_slice_gem_mp3__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\naudio.volume = 0.2\r\n\r\nfunction updateMovesCount() {\r\n  let movesCountField = document.querySelector(\".current-progress__moves-count\")\r\n  movesCountField.innerHTML = `Total Moves: ${movesCount}`\r\n  movesCount++\r\n}\r\n\r\nfunction resetMovesCount() {\r\n  movesCount = 0\r\n}\r\n\r\nfunction soundMute(soundButton) {\r\n  soundButton.classList.add(\"nav__button_sound__muted\")\r\n  audio.volume = 0\r\n  soundButton.addEventListener(\"click\", soundUnMute)\r\n  soundButton.removeEventListener(\"click\", soundMute)\r\n}\r\n\r\nfunction soundUnMute() {\r\n  let soundButton = document.querySelector(\".nav__button_sound__muted\")\r\n  soundButton.classList.remove(\"nav__button_sound__muted\")\r\n  audio.volume = 0.2\r\n  soundButton.addEventListener(\"click\", soundMute)\r\n  soundButton.removeEventListener(\"click\", soundUnMute)\r\n}\r\n\r\nfunction playSound() {\r\n  audio.play()\r\n}\r\n\r\nfunction exchangeElements(element1, element2) {\r\n  var clonedElement1 = element1.cloneNode(true)\r\n  var clonedElement2 = element2.cloneNode(true)\r\n  element2.parentNode.replaceChild(clonedElement1, element2)\r\n  element1.parentNode.replaceChild(clonedElement2, element1)\r\n  return clonedElement1\r\n}\r\n\r\nfunction moveTiles (movedTile) {\r\n  let gameTiles = document.querySelectorAll(\".game-tile\")\r\n  gameTiles.forEach(element => {\r\n    element.removeEventListener(\"click\", moveDown)\r\n    element.removeEventListener(\"click\", moveUp)\r\n    element.removeEventListener(\"click\", moveLeft)\r\n    element.removeEventListener(\"click\", moveRight)\r\n    element.removeEventListener(\"mousedown\", dragMove)\r\n  });\r\n  playSound()\r\n  let emptyTile = document.querySelector(\".game-tile_empty\")\r\n  exchangeElements(movedTile, emptyTile)\r\n  if (isSolved()) {\r\n    let solveModal = document.createElement(\"div\")\r\n    solveModal.classList.add(\"solve-modal\")\r\n    let currentTime = document.querySelector(\".current-progress__timer\")\r\n    let solveTextBlock = document.createElement(\"div\")\r\n    solveTextBlock.classList.add(\"solve-text-block\")\r\n\r\n    let solveNewGameButton = document.createElement(\"button\")\r\n    solveNewGameButton.classList.add(\"nav__button\")\r\n    solveNewGameButton.innerHTML = \"New Game\"\r\n\r\n    let solveText = document.createElement(\"p\")\r\n    solveText.classList.add(\"solve-text\")\r\n    solveText.innerHTML = `Hooray! You solved the puzzle in ${currentTime.innerHTML} and ${movesCount} moves!`\r\n\r\n    solveTextBlock.append(solveText, solveNewGameButton)\r\n    solveModal.append(solveTextBlock)\r\n\r\n    document.querySelector(\"body\").append(solveModal)\r\n\r\n    solveNewGameButton.addEventListener(\"click\", solveModalClose)\r\n    if (localStorage.getItem(\"recordsArr\") === null) {\r\n      let recordsArr = []\r\n      recordsArr.push([currentTime.innerHTML, movesCount])\r\n      localStorage.setItem(\"recordsArr\", JSON.stringify(recordsArr))\r\n    }\r\n    else {\r\n      let recordsArr = JSON.parse(localStorage.getItem(\"recordsArr\"))\r\n      recordsArr.push([currentTime.innerHTML, movesCount])\r\n      localStorage.setItem(\"recordsArr\", JSON.stringify(recordsArr))\r\n    }\r\n  }\r\n  findTileToMove()\r\n  updateMovesCount()\r\n}\r\n\r\nfunction solveModalClose() {\r\n  let solveModal = document.querySelector(\".solve-modal\")\r\n  solveModal.remove()\r\n  ;(0,_layout_create__WEBPACK_IMPORTED_MODULE_1__.createGemPuzzleGame)(_layout_create__WEBPACK_IMPORTED_MODULE_1__.fieldSizeSelection.value)\r\n}\r\n\r\nfunction moveDown (value) {\r\n  let movedTile = value.currentTarget\r\n  movedTile.classList.add(\"game-tile_move-down\")\r\n  setTimeout(() => {\r\n    movedTile.classList.remove(\"game-tile_move-down\")\r\n    moveTiles(movedTile)\r\n  }, 190);\r\n}\r\nfunction moveUp (value) {\r\n  let movedTile = value.currentTarget\r\n  movedTile.classList.add(\"game-tile_move-up\")\r\n  setTimeout(() => {\r\n    movedTile.classList.remove(\"game-tile_move-up\")\r\n    moveTiles(movedTile)\r\n  }, 190);\r\n}\r\nfunction moveLeft (value) {\r\n  let movedTile = value.currentTarget\r\n  movedTile.classList.add(\"game-tile_move-left\")\r\n  setTimeout(() => {\r\n    movedTile.classList.remove(\"game-tile_move-left\")\r\n    moveTiles(movedTile)\r\n  }, 190);\r\n}\r\nfunction moveRight (value) {\r\n  let movedTile = value.currentTarget\r\n  movedTile.classList.add(\"game-tile_move-right\")\r\n  setTimeout(() => {\r\n    movedTile.classList.remove(\"game-tile_move-right\")\r\n    moveTiles(movedTile)\r\n  }, 190);\r\n}\r\n\r\nfunction dragMove(item) {\r\n  let target = item.currentTarget\r\n  let search = item.currentTarget.cloneNode(true)\r\n\r\n  search.classList.add(\"draggable-tile\")\r\n\r\n  search.style.position = 'absolute'\r\n  search.style.zIndex = 1000\r\n\r\n  let shiftX = item.clientX - target.getBoundingClientRect().left\r\n  let shiftY = item.clientY - target.getBoundingClientRect().top\r\n\r\n  document.querySelector(\".game-field\").append(search)\r\n\r\n  search.style.display = \"none\";\r\n  function moveAt(pageX, pageY) {\r\n    search.style.left = pageX - shiftX + 'px';\r\n    search.style.top = pageY - shiftY+ 'px';\r\n  }\r\n\r\n  function onMouseMove(item) {\r\n    moveAt(item.pageX, item.pageY);\r\n    let gameTileEmpty = document.querySelector(\".game-tile_empty\")\r\n\r\n    search.style.display = \"none\";\r\n    let elemBelow = document.elementFromPoint(item.clientX, item.clientY);\r\n    search.style.display = \"flex\";\r\n\r\n    if (!elemBelow) {\r\n      search.remove()\r\n    }\r\n    if (elemBelow === elemBelow.closest('.game-tile_empty')) {\r\n      gameTileEmpty.classList.add(\"drag-prepare\")\r\n      search.onmouseup = function() {\r\n        search.remove()\r\n        moveTiles(target)\r\n        let gameTileEmpty = document.querySelector(\".game-tile_empty\")\r\n        gameTileEmpty.classList.remove(\"drag-prepare\")\r\n        document.removeEventListener('mousemove', onMouseMove);\r\n        search.onmouseup = null;\r\n      }\r\n    }\r\n    else {\r\n      gameTileEmpty.classList.remove(\"drag-prepare\")\r\n      search.onmouseup = function() {\r\n        search.remove()\r\n        document.removeEventListener('mousemove', onMouseMove);\r\n        search.onmouseup = null;\r\n      }\r\n    }\r\n  }\r\n  function removeDrag () {\r\n    document.removeEventListener('mousemove', onMouseMove);\r\n    search.remove()\r\n  }\r\n  document.addEventListener('mousemove', onMouseMove);\r\n  document.addEventListener('mouseup', removeDrag);\r\n}\r\n\r\n\r\n\r\nfunction findTileToMove() {\r\n  let emptyTile = document.querySelector(\".game-tile_empty\")\r\n  let emptyTileCoordinates = emptyTile.getBoundingClientRect()\r\n  let tilesToMove = []\r\n  let emptyTileCoordinatesCenterX = emptyTileCoordinates.x + emptyTileCoordinates.width/2\r\n  let emptyTileCoordinatesCenterY = emptyTileCoordinates.y + emptyTileCoordinates.height/2\r\n  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX - (emptyTileCoordinates.width*1.5), emptyTileCoordinatesCenterY))\r\n  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX + (emptyTileCoordinates.width*1.5), emptyTileCoordinatesCenterY))\r\n  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX, emptyTileCoordinatesCenterY - (emptyTileCoordinates.width*1.5)))\r\n  tilesToMove.push(document.elementFromPoint(emptyTileCoordinatesCenterX, emptyTileCoordinatesCenterY + (emptyTileCoordinates.width*1.5)))\r\n  for (let i = 0; i<tilesToMove.length; i++) {\r\n    if (tilesToMove[i] !=null && tilesToMove[i].classList.contains(\"game-tile\")) {\r\n      tilesToMove[i].addEventListener(\"mousedown\", dragMove)\r\n      if (i === 0) {\r\n        tilesToMove[i].addEventListener(\"click\", moveRight)\r\n      }\r\n      else if (i === 1) {\r\n        tilesToMove[1].addEventListener(\"click\", moveLeft)\r\n      }\r\n      else if (i === 2) {\r\n        tilesToMove[2].addEventListener(\"click\", moveDown)\r\n      }\r\n      else if (i === 3) {\r\n        tilesToMove[3].addEventListener(\"click\", moveUp)\r\n      }\r\n    }\r\n  }\r\n  console.log(tilesToMove)\r\n}\r\n\r\nfunction isSolved() {\r\n  let allTiles = document.querySelector(\".game-field\").childNodes\r\n  let arrForCheck = []\r\n  let allTilesValue = []\r\n  allTiles.forEach(element => {\r\n    allTilesValue.push(element.outerText)\r\n  });\r\n  for (let i=1; i<allTiles.length; i++) {\r\n    arrForCheck.push(i.toString())\r\n    if (i === allTiles.length-1) {\r\n      arrForCheck.push(\"\")\r\n    }\r\n  }\r\n  return JSON.stringify(arrForCheck) === JSON.stringify(allTilesValue)\r\n}\n\n//# sourceURL=webpack:///./scripts/move-tiles.js?");

/***/ }),

/***/ "./scripts/save-game.js":
/*!******************************!*\
  !*** ./scripts/save-game.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"saveGame\": () => (/* binding */ saveGame)\n/* harmony export */ });\n/* harmony import */ var _move_tiles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./move-tiles */ \"./scripts/move-tiles.js\");\n\r\n\r\nfunction saveGame () {\r\n  let currentGameField = document.querySelector(\".game-field\").innerHTML\r\n  let currentProgressTimer = document.querySelector(\".current-progress__timer\").innerHTML\r\n  let fieldSize = document.querySelector(\"select\").value\r\n  localStorage.setItem(\"fieldSize\", fieldSize)\r\n  localStorage.setItem(\"currentGameField\", JSON.stringify(currentGameField))\r\n  localStorage.setItem(\"currentProgressTimer\", JSON.stringify(currentProgressTimer))\r\n  localStorage.setItem(\"currentProgressMovesCount\", _move_tiles__WEBPACK_IMPORTED_MODULE_0__.movesCount)\r\n}\r\n\n\n//# sourceURL=webpack:///./scripts/save-game.js?");

/***/ }),

/***/ "./scripts/shuffle-arr.js":
/*!********************************!*\
  !*** ./scripts/shuffle-arr.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shuffle\": () => (/* binding */ shuffle)\n/* harmony export */ });\nfunction shuffle(array) {\r\n  for (let i = array.length - 1; i > 0; i--) {\r\n    let j = Math.floor(Math.random() * (i + 1));\r\n    [array[i], array[j]] = [array[j], array[i]];\r\n  }\r\n  return array\r\n}\n\n//# sourceURL=webpack:///./scripts/shuffle-arr.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/main.js");
/******/ 	
/******/ })()
;