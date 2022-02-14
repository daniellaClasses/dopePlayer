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
    timeBar: document.querySelector(".timeBar"),
    stop: document.querySelector(".stop"),
    next: document.querySelector(".next"),
    prev: document.querySelector(".back"),
    volume: document.querySelector(".volume"),
    timeNow: document.querySelector(".timeNow"),
    timeEnd: document.querySelector(".timeEnd")
};

let playlistJSON = `
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
`;

function generarJSON(){
    var listMedia = JSON.parse(playlistJSON);
    var listMediaSongs = listMedia.songs;
    return listMediaSongs;
}


//IIFE
(function () {
    DOM.btnMusic.addEventListener("click", changePlayer);
    DOM.btnVideo.addEventListener("click", changePlayer);
    DOM.play.addEventListener("click", playAudio);
    DOM.stop.addEventListener("click", audioStop);
    DOM.next.addEventListener("click", changeToNextSong);
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
    // let nino = DOM.audioPlayer.querySelector("source").getAttribute("src")

    DOM.play.style.display = "none";
    DOM.stop.style.display = "flex";
    if (DOM.audioPlayer.dataset.songId === "") {
        playFirstSong();
    }
    else {
        DOM.audioPlayer.play()
    }
}

function audioStop() {
    DOM.audioPlayer.pause();
    // this.dataSet.idSong.classList.remove("active");
    DOM.stop.style.display = "none";
    DOM.play.style.display = "flex";
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

//función especialita para reproducir la primera canción

function playFirstSong()
{
    let listMediaSongs = generarJSON();
    
}



function loadTime() {

    let now = DOM.audioPlayer.currentTime;
    if (isNaN(now)) {
        DOM.timeNow.textContent = '00:00';
        DOM.timeBar.value = 0;
    } else {
        DOM.timeNow.textContent = calculateTime(now);
        DOM.timeBar.value = now;
    }
    let end = DOM.audioPlayer.duration;

    if (isNaN(end)) {
        DOM.timeEnd.textContent = '00:00';
        DOM.timeBar.max = 0;
    } else {
        DOM.timeEnd.textContent = calculateTime(end);
        DOM.timeBar.max = end;
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
    // let listMedia = JSON.parse(playlistJSON);
    // listMedia = Array.from(listMedia);
    // console.log(listMedia);
    // listMedia.songs
    listMediaSongs = generarJSON();
    listMediaSongs.forEach(song => {
        //creamos el elemento li para cada uno de la lista
        let element = document.createElement("li");
        element.addEventListener("click", changeCurrentSong);

        // le asignamos a element el atributo dataset.idSong (html dataset-id-song)
        // con valor song.id
        element.dataset.idSong = song.id;
        // element.setAttribute("title", song.id);
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
    let selectedSong = this.dataset.idSong;
    console.log(selectedSong);

    audioStop();
    listMediaSongs = generarJSON();

    let newSong = listMediaSongs.find(search => {
        return search.id == selectedSong;
    });

    let source = DOM.audioPlayer.querySelector("source");
    source.setAttribute("src", newSong.audioSrc);
    DOM.audioPlayer.dataset.songId = selectedSong;
    audioLoad();
    changeCurrentInfoSong(newSong);
    playAudio();
}


function changeCurrentInfoSong(songObject) {
    let trackNameSpace = document.querySelector("#nowPlayingSong").querySelector(".nowPlayingTitle");
    trackNameSpace.textContent = songObject.nameTrack;

    let artistNameSpace = document.querySelector("#nowPlayingSong").querySelector(".nowPlayingArtist");
    artistNameSpace.textContent = songObject.nameArtist;

    let imgSrcSpace = DOM.audioPlayer.parentElement;
    imgSrcSpace.style.backgroundImage = "url(" + songObject.imgSrc + ")";
}


function changeToNextSong() {
    let currentIdSong = this.dataset.idSong;
    let nextSongId = currentIdSong + 1;
    listMediaSongs = generarJSON();
    if (nextSongId > listMediaSongs.length) {
        nextSongId = 1;
        changeCurrentSong();
    }
    else {
        changeCurrentSong();
    }
}


// //Next song
// next.addEventListener("click",function(){
//     let idOriginal = document.querySelector(".cancion").id;
//     let idNuevo = parseInt(idOriginal) + 1;
//     if(idNuevo > songs.length){
//         idNuevo = 1;
//         reproducir(idNuevo);

//     }
//     else{
//         reproducir(idNuevo);

//     }
// });

// back.addEventListener("click",function(){
//     let idOriginal = document.querySelector(".cancion").id;
//     let idNuevo = idOriginal - 1;
//     if(idNuevo <= 0){
//         idNuevo = songs.length;
//         reproducir(idNuevo);
//     }
//     else{
//         reproducir(idNuevo);

//     }
// });