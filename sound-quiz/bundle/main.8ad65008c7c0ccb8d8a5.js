(()=>{var e={139:()=>{let e=document.querySelector(".language-selector"),n=document.location.href.split("/");function t(){let e=document.querySelector(".language-selector"),n=e.lastElementChild,r=n.lastElementChild;n.classList.add("selector-options_active"),e.removeEventListener("click",t),e.addEventListener("mouseleave",o),r.addEventListener("click",l)}function l(e){let t=document.querySelector(".language-selector"),l=t.lastElementChild,a=e.currentTarget;if("quiz.html"===n[n.length-1]){let e;if("en"===localStorage.getItem("language")){if(e=confirm("Страница будет перезагружена. Весь прогресс будет потерян. Вы уверены?"),!e)return;document.location.reload()}else if("ru"===localStorage.getItem("language")){if(e=confirm("The page will be reloaded. All progress will be lost. Are you sure?"),!e)return;document.location.reload()}}var i,c,u,s;a.classList.contains("language-en")&&localStorage.setItem("language","en"),a.classList.contains("language-ru")&&localStorage.setItem("language","ru"),i=a,c=l.firstChild,u=i.cloneNode(!0),s=c.cloneNode(!0),c.parentNode.replaceChild(u,c),i.parentNode.replaceChild(s,i),o(),localStorage.selectorIco=JSON.stringify(t.innerHTML),"index.html"===n[n.length-1]?r():"gallery.html"===n[n.length-1]&&document.location.reload()}function r(){let e=document.querySelector(".language-selector");if(JSON.parse(localStorage.getItem("selectorIco"))&&(e.innerHTML=JSON.parse(localStorage.selectorIco)),function(){if("en"===localStorage.getItem("language")){document.querySelectorAll("a").forEach((e=>{-1!=e.innerHTML.indexOf("Стартовая страница")&&(e.innerHTML="Main page"),-1!=e.innerHTML.indexOf("Галерея")&&(e.innerHTML="Gallery"),-1!=e.innerHTML.indexOf("Новая игра")&&(e.innerHTML="New game"),-1!=e.innerHTML.indexOf("Играть сейчас")&&(e.innerHTML="Play now")}))}if("ru"===localStorage.getItem("language")){document.querySelectorAll("a").forEach((e=>{-1!=e.innerHTML.indexOf("Main page")&&(e.innerHTML="Стартовая страница"),-1!=e.innerHTML.indexOf("Gallery")&&(e.innerHTML="Галерея"),-1!=e.innerHTML.indexOf("New game")&&(e.innerHTML="Новая игра"),-1!=e.innerHTML.indexOf("Play now")&&(e.innerHTML="Играть сейчас")}))}}(),"index.html"===n[n.length-1]){if("en"===localStorage.getItem("language")){let e=document.querySelector(".introduction");-1!=e.innerHTML.indexOf("GAME OST Quiz")&&(e.innerHTML="GAME OST Quiz is a short quiz consisting of 6 questions in which you have to find the game whose sound is presented to you in the question.")}if("ru"===localStorage.getItem("language")){let e=document.querySelector(".introduction");-1!=e.innerHTML.indexOf("GAME OST Quiz")&&(e.innerHTML="GAME OST Quiz — это небольшая викторина, состоящая из 6 вопросов, в которой вам предстоит найти игру, звук из которой вам представлен в вопросе.")}}}function o(){let e=document.querySelector(".language-selector");e.lastElementChild.classList.remove("selector-options_active"),e.removeEventListener("mouseleave",o),e.addEventListener("click",t)}r(),e.addEventListener("click",t)}},n={};function t(l){var r=n[l];if(void 0!==r)return r.exports;var o=n[l]={exports:{}};return e[l](o,o.exports,t),o.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var l in n)t.o(n,l)&&!t.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:n[l]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{"use strict";t(139)})()})();