const DOM = {
    btnMusic: document.querySelector("#btnMusic"),
    btnVideo: document.querySelector("#btnVideo"),
    audioSection: document.querySelector("#audioSection"),
    audioPlayer: document.querySelector("#playerAudio").querySelector("audio"),
    videoSection: document.querySelector("#videoSection"),
    videoPlayer: document.querySelector("#playerAudio").querySelector("video")
};

(function()
{
    DOM.btnMusic.addEventListener("click",changePlayer);
    DOM.btnVideo.addEventListener("click",changePlayer);
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
    let cosa = "";
}