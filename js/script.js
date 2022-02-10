// import "playlist.js";
// import { playlist } from "./playlist.js";




const DOM = {
    btnMusic: document.querySelector("#btnMusic"),
    btnVideo: document.querySelector("#btnVideo"),
    audioSection: document.querySelector("#audioSection"),
    audioPlayer: document.querySelector("#playerAudio").querySelector("audio"),
    playlistPart: document.querySelector("#partPlaylist"),
    videoSection: document.querySelector("#videoSection"),
    videoPlayer: document.querySelector("#playerVideo").querySelector("video"),
    play: document.querySelector(".play"),
    stop: document.querySelector(".stop"),
    volume: document.querySelector(".volume"),
    timeNow: document.querySelector(".timeNow"),
    timeEnd: document.querySelector(".timeEnd")
};

let playlistJSON = `[
    {
        "songs":
            [
                {
                    "id": 1,
                    "nameTrack": "1 Thin White Lies.mp3",
                    "nameArtist": "5 Seconds of Summer",
                    "audioSrc": "../src/media/audio/1 Thin White Lies.mp3",
                    "imgSrc": "../img/01song.jpg"
                },
                {
                    "id": 2,
                    "nameTrack": "2 Into It.mp3",
                    "nameArtist": "Chase Atlantic",
                    "audioSrc": "../src/media/audio/2 Into It.mp3",
                    "imgSrc": "../img/02song.jpg"
                },
                {
                    "id": 3,
                    "nameTrack": "3 The Fixer.mp3",
                    "nameArtist": "Brent Morgan",
                    "audioSrc": "../src/media/audio/3 The Fixer.mp3",
                    "imgSrc": "../img/03song.jpg"
                },
                {
                    "id": 4, "nameTrack": "4 La Paura del Buio.mp3",
                    "nameArtist": "Måneskin",
                    "audioSrc": "../src/media/audio/4 LA PAURA DEL BUIO.mp3",
                    "imgSrc": "../img/04song.jpg"
                }, {
                    "id": 5,
                    "nameTrack": "5 Angels Like You.mp3",
                    "nameArtist": "Miley Cyrus",
                    "audioSrc": "../src/media/audio/5 Angels Like You.mp3",
                    "imgSrc": "../img/05song.jpg"
                },
                {
                    "id": 6,
                    "nameTrack": "6 Betelgeuse.mp3",
                    "nameArtist": "Yuuri",
                    "audioSrc": "../src/media/audio/6 BETELGEUSE.mp3",
                    "imgSrc": "../img/06song.jpg"
                }
            ],
        "videos":
            [
                {
                    "id": 1,
                    "nameVideo": "Cómo dirías que es España sin decirlo",
                    "videoSrc": ""
                },
                {
                    "id": 2,
                    "nameVideo": "Haikyuu!! Season 2 Opening 4 - Fly High",
                    "videoSrc": ""
                },
                {
                    "id": 3,
                    "nameVideo": "Arcane Opening -  League of Legends",
                    "videoSrc": ""
                }
            ]
    }
]`;

//IIFE
(function () {
    DOM.btnMusic.addEventListener("click", changePlayer);
    DOM.btnVideo.addEventListener("click", changePlayer);
    DOM.play.addEventListener("click", playAudio);
    DOM.stop.addEventListener("click", audioStop);
    DOM.volume.addEventListener("change", changeVolume);
    DOM.audioPlayer.addEventListener("loadstart", loadTime);
    DOM.audioPlayer.addEventListener("timeupdate", loadTime);


    //generar playlist
    generatePlaylist();
}
)();




function changePlayer() {
    if (this.id == "btnMusic") {
        videoStop();
        DOM.audioSection.classList.remove("hidePlayer");
        DOM.videoSection.classList.add("hidePlayer");
        generatePlaylist();
    } else {
        audioStop();
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

function playVideo(){
    DOM.videoPlayer.play();
}

function videoStop(){
    DOM.videoPlayer.pause();
}

function changeVolume() {

    let level = DOM.volume.value;
    DOM.audioPlayer.volume = level;

}

function loadTime() {

    let now = DOM.audioPlayer.currentTime;
    if (isNaN(now)) {
        DOM.timeNow.textContent = '00:00';
    } else {
        DOM.timeNow.textContent = calculateTime(now);
    }
    let end = DOM.audioPlayer.duration;
    // console.log(end);
    if (isNaN(end)) {
        DOM.timeEnd.textContent = '00:00';
    } else {
        DOM.timeEnd.textContent = calculateTime(end);
    }

}

function calculateTime(times) {

    let result = '00:00';
    let hour, minute, second;
    if (times > 0) {
        hour = Math.floor(times / 3600);
        // if (hour < 10) {
        //     result = "0"+hour;
        // } else{
        //     result = hour;
        // }

        minute = Math.floor((times - 3600 * hour) / 60);
        if (minute < 10) {
            result = "0" + minute;
        } else {
            result = minute;
        }


        second = Math.floor((times - 3600 * hour - 60 * minute) % 60);
        if (second == 0) {
            result += ":00";
        }
        else {
            if (second < 10 && second > 0) {
                result += ":0" + second;
            } else {
                result += ":" + second;
            }
        }

    }
    return result;
}

function generatePlaylist(){
    console.log("Llego bien");
    //creamos la lista
    let elementsList = document.createElement("ol");
    var listMedia = JSON.parse(playlistJSON);
    console.log(listMedia);
    listMedia.songs.forEach(song => {
        //creamos el elemento li para cada uno de la lista
        let element = document.createElement("li");

        //añadimos imagen
        let divImagen = document.createElement("div");
        divImagen.style.backgroundImage(song.imgSrc);
        element.appendChild(divImagen);

        let divInfo = document.createElement("div");

        let infoTitle = document.createElement("p");
        infoTitle.textContent = song.nameTrack;
        divInfo.appendChild(infoTitle);

        let infoArtist = document.createElement("p");
        infoArtist.textContent = song.nameArtist;
        divInfo.appendChild(infoArtist);

        element.appendChild(divInfo);

        elementsList.appendChild(element);
    });


}