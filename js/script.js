const DOM = {
    btnMusic: document.querySelector("#btnMusic"),
    btnVideo: document.querySelector("#btnVideo"),
    audioSection: document.querySelector("#audioSection"),
    audioPlayer: document.querySelector("#playerAudio").querySelector("audio"),
    videoSection: document.querySelector("#videoSection"),
    videoPlayer: document.querySelector("#playerVideo").querySelector("video"),
    play: document.querySelector(".play"),
    stop: document.querySelector(".stop"),
    volume: document.querySelector(".volume"),
    timeNow: document.querySelector(".timeNow"),
    timeEnd: document.querySelector(".timeEnd")
};

var musicGallery = [
    {"name":"Jamones","src":"./src/media/audio/1 Into It.mp3"},
    {"name":"quesos","src":""},
    {"name":"dulces","src":""}
];

(function()
{
    DOM.btnMusic.addEventListener("click",changePlayer);
    DOM.btnVideo.addEventListener("click",changePlayer);
    DOM.play.addEventListener("click",playAudio);
    DOM.stop.addEventListener("click",audioStop);
    DOM.volume.addEventListener("change",changeVolume);
    DOM.audioPlayer.addEventListener("loadstart",loadTime);
    DOM.audioPlayer.addEventListener("timeupdate",loadTime);
}
)();

function changePlayer() {
    if (this.id == "btnMusic") {
        DOM.audioSection.classList.remove("hidePlayer");
        DOM.videoSection.classList.add("hidePlayer");
    } else {
        DOM.videoSection.classList.remove("hidePlayer");
        DOM.audioSection.classList.add("hidePlayer");
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
    DOM.audioPlayer.volume = level;

}

function loadTime() {
    
    let now =  DOM.audioPlayer.currentTime;
    if (isNaN(now)) {
        DOM.timeNow.textContent = '00:00';
    } else {
        DOM.timeNow.textContent = calTime(now);
    }
    let end = DOM.audioPlayer.duration;
    console.log(end);
    if (isNaN(end)) {
        DOM.timeEnd.textContent = '00:00';
    } else {
        DOM.timeEnd.textContent = calTime(end);
    }
    
}

function calTime(times) {

    let result = '00:00';
    let hour,minute,second;
    if (times > 0) {
        
        hour = Math.floor(times / 3600);
        // if (hour < 10) {
        //     result = "0"+hour;
        // } else{
        //     result = hour;
        // }

        minute = Math.floor((times - 3600 * hour) / 60);
        if (minute < 10) {
            result = "0"+minute;
        }else {
            result = minute;
        }

        second = Math.floor((times - 3600 * hour - 60 * minute) % 60);
        if (second < 10 && second > 0) {
            result += ":0"+second;
        }else {
            result += ":"+second;
        }
    }
    return result;
}