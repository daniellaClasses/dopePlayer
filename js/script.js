const DOM = {
    btnMusic: document.querySelector("#btnMusic"),
    btnVideo: document.querySelector("#btnVideo"),
    audioSection: document.querySelector("#audioSection"),
    audioPlayer: document.querySelector("#playerAudio").querySelector("audio"),
    videoSection: document.querySelector("#videoSection"),
    videoPlayer: document.querySelector("#playerVideo").querySelector("video"),
    play: document.querySelector(".play"),
    stop: document.querySelector(".stop"),
    volume: document.querySelector(".volume")
};

(function()
{
    DOM.btnMusic.addEventListener("click",changePlayer);
    DOM.btnVideo.addEventListener("click",changePlayer);
    DOM.play.addEventListener("click",playAudio);
    DOM.stop.addEventListener("click",audioStop);
    DOM.volume.addEventListener("change",changeVolume);
}
)();

function changePlayer() {
    if (this.id == "btnMusic") {
        DOM.audioSection.classList.remove("hidePlayer");
        DOM.videoSection.classList.add("hidePlayer");
        console.log("música");
    } else {
        DOM.videoSection.classList.remove("hidePlayer");
        DOM.audioSection.classList.add("hidePlayer");
        console.log("video");
    }
}

function playAudio() {
    DOM.audioPlayer.play();
}

function audioStop() {
    DOM.audioPlayer.pause();
}

function changeVolume() {

    let level = DOM.volume.value;
    console.log(level);
    DOM.audioPlayer.volume = level;
}