export function createAudioPlayer(audioSrc) {
  let audioPlayer = document.createElement("div");
  audioPlayer.classList.add("audio-player");

  let controls = document.createElement("div");
  controls.classList.add("controls-block");

  let playPause = document.createElement("div");
  playPause.classList.add("play-pause-block");

  let playButton = document.createElement("span");
  playButton.classList.add("play-pause-block__play-button");
  playPause.append(playButton);

  let timeBar = document.createElement("div");
  timeBar.classList.add("time-bar");

  let playerSlider = document.createElement("input");
  playerSlider.classList.add("player-slider");
  playerSlider.type = "range";
  timeBar.append(playerSlider);

  let audioTime = document.createElement("div");
  audioTime.classList.add("audio-time");
  timeBar.append(audioTime);

  let audioCurrentTime = document.createElement("span");
  audioCurrentTime.classList.add("audio-time__current");
  let audioEndTime = document.createElement("span");
  audioEndTime.classList.add("audio-time__end");
  audioTime.append(audioCurrentTime, audioEndTime);

  let volumeBlock = document.createElement("div");
  volumeBlock.classList.add("volume-block");

  let volumeButton = document.createElement("span");
  volumeButton.classList.add("volume-block__volume-ico");

  let volumeSlider = document.createElement("input");
  volumeSlider.classList.add("volume-block__volume-slider");
  volumeSlider.type = "range";
  volumeSlider.min = 0;
  volumeSlider.max = 1;
  volumeSlider.step = 0.01;
  volumeSlider.value = 0.5;

  volumeBlock.append(volumeButton, volumeSlider);

  controls.append(playPause, timeBar, volumeBlock);
  audioPlayer.append(controls);

  let audio = document.createElement("audio");
  audio.src = audioSrc;
  audio.volume = 0.5;
  audio.hidden = true;
  audio.preload = "metadata";
  audioPlayer.append(audio);

  function findTimeToSet(time) {
    let minuets = Math.floor(time / 60);
    let seconds = time - minuets * 60;
    let foundTime = [minuets, seconds]
      .map((element) => {
        if (element < 10) {
          return `0${element}`;
        } else {
          return element;
        }
      })
      .join(":");
    return foundTime;
  }

  function setDurationAudio() {
    let duration = Math.floor(audio.duration);
    playerSlider.max = duration;
    audioEndTime.innerHTML = findTimeToSet(duration);
    audioCurrentTime.innerHTML = "00:00";
  }

  audio.addEventListener("loadedmetadata", setDurationAudio);

  function changePlayerSlider() {
    playerSlider.value = audio.currentTime;

    const min = playerSlider.min;
    const max = playerSlider.max;
    const val = playerSlider.value;
    playerSlider.style.backgroundSize =
      ((val - min) * 100) / (max - min) + "% 100%";

    let currentTimePlaying = Math.floor(audio.currentTime);

    audioCurrentTime.innerHTML = findTimeToSet(currentTimePlaying);
  }

  function handleInputChange(element) {
    let target = element.target;

    if (target === undefined) {
      target = element;
    }

    const min = target.min;
    const max = target.max;
    const val = target.value;
    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";

    if (target != volumeSlider) {
      audio.removeEventListener("timeupdate", changePlayerSlider);
    }
  }

  function userChangeCurrentTimeAudio() {
    audio.currentTime = playerSlider.value;
    audio.addEventListener("timeupdate", changePlayerSlider);
  }

  function changeVolume() {
    audio.volume = volumeSlider.value;
    if (audio.volume === 0) {
      muteAudio();
    } else {
      unMuteAudio();
    }
  }

  function muteAudio() {
    audio.volume = 0;
    volumeSlider.style.backgroundSize = "0% 100%";
    volumeButton.classList.add("volume-block__volume-ico_muted");
    volumeButton.addEventListener("click", unMuteAudio);
    volumeButton.removeEventListener("click", muteAudio);
  }

  function unMuteAudio() {
    audio.volume = volumeSlider.value;
    if (audio.volume === 0) {
      audio.volume = 0.1;
      volumeSlider.value = 0.1;
    }
    handleInputChange(volumeSlider);
    volumeButton.classList.remove("volume-block__volume-ico_muted");
    volumeButton.addEventListener("click", muteAudio);
  }

  volumeButton.addEventListener("click", muteAudio);
  playerSlider.addEventListener("input", handleInputChange);
  playerSlider.addEventListener("change", userChangeCurrentTimeAudio);
  volumeSlider.addEventListener("input", handleInputChange);
  volumeSlider.addEventListener("input", changeVolume);

  function play() {
    audio.addEventListener("timeupdate", changePlayerSlider);
    if (document.querySelector(".play-pause-block__pause-button")) {
      let playingBefore = document.querySelector(
        ".play-pause-block__pause-button"
      );
      playingBefore.classList.remove("play-pause-block__pause-button");
    }
    playButton.classList.add("play-pause-block__pause-button");
    playButton.removeEventListener("click", play);
    playButton.addEventListener("click", pause);
    let allAudios = document.querySelectorAll("audio");
    allAudios.forEach((element) => {
      element.pause();
    });
    audio.play();
  }

  function pause() {
    audio.pause();
    playButton.classList.remove("play-pause-block__pause-button");
    playButton.removeEventListener("click", pause);
    playButton.addEventListener("click", play);
  }

  playButton.addEventListener("click", play);
  audio.addEventListener("ended", pause);
  return audioPlayer;
}
