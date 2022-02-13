// import "playlist.js";
// import  playlist  from './playlist';


const DOM = {
    btnMusic: document.querySelector("#btnMusic"),
    btnVideo: document.querySelector("#btnVideo"),
    audioSection: document.querySelector("#audioSection"),
    audioPlayer: document.querySelector("#playerAudio").querySelector("audio"),
    playlistPart: document.querySelector("#partPlaylist"),
    songElection: document.querySelector(".displaySong"),
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
                    "nameTrack": "Thin White Lies",
                    "nameArtist": "5 Seconds of Summer",
                    "audioSrc": "../src/media/audio/1 Thin White Lies.mp3",
                    "imgSrc": "../img/01song.jpg"
                },
                {
                    "id": 2,
                    "nameTrack": "Into It",
                    "nameArtist": "Chase Atlantic",
                    "audioSrc": "../src/media/audio/2 Into It.mp3",
                    "imgSrc": "../img/02song.jpg"
                },
                {
                    "id": 3,
                    "nameTrack": "The Fixer",
                    "nameArtist": "Brent Morgan",
                    "audioSrc": "../src/media/audio/3 The Fixer.mp3",
                    "imgSrc": "../img/03song.png"
                },
                {
                    "id": 4, "nameTrack": "La Paura del Buio",
                    "nameArtist": "Måneskin",
                    "audioSrc": "../src/media/audio/4 LA PAURA DEL BUIO.mp3",
                    "imgSrc": "../img/04song.jpg"
                }, {
                    "id": 5,
                    "nameTrack": "Angels Like You",
                    "nameArtist": "Miley Cyrus",
                    "audioSrc": "../src/media/audio/5 Angels Like You.mp3",
                    "imgSrc": "../img/05song.jpg"
                },
                {
                    "id": 6,
                    "nameTrack": "Betelgeuse",
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
    // let nino = DOM.audioPlayer.querySelector("source").getAttribute("src");

    // if () {
    // } else {
        // }
            DOM.audioPlayer.play();
}

function audioStop() {
    DOM.audioPlayer.pause();
}

function audioLoad() {
    DOM.audioPlayer.load();
}




function playVideo() {
    DOM.videoPlayer.play();
}

function videoStop() {
    DOM.videoPlayer.pause();
}

function videoLoad() {
    DOM.videoPlayer.load();
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

function generatePlaylist() {
    cleanPreviousContent(DOM.playlistPart);
    //creamos la lista
    let elementsList = document.createElement("ol");
    let listMedia = JSON.parse(playlistJSON);
    listMedia = Array.from(listMedia);
    // console.log(listMedia);
    listMedia[0].songs.forEach(song => {
        //creamos el elemento li para cada uno de la lista
        let element = document.createElement("li");
        element.addEventListener("click", changeCurrentSong);
        element.setAttribute("title", song.id);
        // element.setAttribute("title", song.nameTrack);

        let containerInfo = document.createElement("div");
        containerInfo.classList.add("displaySong");

        //añadimos imagen
        let divImagen = document.createElement("div");
        divImagen.classList.add("tamaniosImg");
        divImagen.style.backgroundImage = "url(" + song.imgSrc + ")";
        containerInfo.appendChild(divImagen);

        let divInfo = document.createElement("div");

        let infoTitle = document.createElement("h3");
        infoTitle.textContent = song.nameTrack;
        divInfo.appendChild(infoTitle);

        let infoArtist = document.createElement("h5");
        infoArtist.textContent = song.nameArtist;
        divInfo.appendChild(infoArtist);

        containerInfo.appendChild(divInfo);
        element.appendChild(containerInfo);
        elementsList.appendChild(element);
    });

    DOM.playlistPart.appendChild(elementsList);
}

function cleanPreviousContent(section) {
    if (section.hasChildNodes) {
        section.childNodes.forEach(element => {
            element.parentElement.replaceChildren();
        }
        );
    }
}


function changeCurrentSong() {
    // console.log(this.title);
    let selectedSong = this.title;

    audioStop();
    let listMedia = JSON.parse(playlistJSON);
    listMedia = Array.from(listMedia);
    listMediaSongs = Array.from(listMedia[0].songs);

    let newSong = listMediaSongs.find(search => {
        return search.id == selectedSong;
        // return search.nameTrack == selectedSong;
    });
    // console.log(newSong);

    let source = DOM.audioPlayer.querySelector("source");
    source.setAttribute("src", newSong.audioSrc);
    audioLoad();
    changeCurrentInfoSong(newSong);
    playAudio();
}


function changeCurrentInfoSong(songObject){
    let trackNameSpace = document.querySelector("#nowPlayingSong").querySelector(".nowPlayingTitle");
    trackNameSpace.textContent = songObject.nameTrack;

    let artistNameSpace = document.querySelector("#nowPlayingSong").querySelector(".nowPlayingArtist");
    artistNameSpace.textContent = songObject.nameArtist;

    let imgSrcSpace =DOM.audioPlayer.parentElement;
    imgSrcSpace.style.backgroundImage = "url(" + songObject.imgSrc + ")";
}