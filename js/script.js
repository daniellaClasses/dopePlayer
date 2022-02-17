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

function generarJSON() {
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
    DOM.prev.addEventListener("click", changeToPreviousSong);
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

        // generatePlaylist();
    } else {
        audioStop();
        DOM.videoSection.classList.remove("hidePlayer");
        DOM.audioSection.classList.add("hidePlayer");
    }
}

function playAudio() {
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

function playFirstSong() {
    let listMediaSongs = generarJSON();
    let firstSong = listMediaSongs[0];
    let firstSongOfTheList = document.querySelector("li");
    firstSongOfTheList.classList.add("nowPlayingMedia");

    let source = DOM.audioPlayer.querySelector("source");
    source.setAttribute("src", firstSong.audioSrc);
    DOM.audioPlayer.dataset.songId = firstSong.id;
    audioLoad();
    changeCurrentInfoSong(firstSong);
    playAudio();
}

//hacer las funciones de playFirstSong...
// hacer funciones adelante y atrás

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
    listMediaSongs = generarJSON();
    listMediaSongs.forEach(song => {
        //creamos el elemento li para cada uno de la lista
        let element = document.createElement("li");
        element.addEventListener("click", changeCurrentSong);

        // le asignamos a element el atributo dataset.idSong (html dataset-id-song)
        // con valor song.id
        element.dataset.idSong = song.id;

        element.classList.add("displaySong");

        //añadimos imagen
        let divImagen = document.createElement("div");
        divImagen.classList.add("tamaniosImg");
        divImagen.style.backgroundImage = "url(" + song.imgSrc + ")";
        element.appendChild(divImagen);

        let divInfo = document.createElement("div");

        let infoTitle = document.createElement("h3");
        infoTitle.textContent = song.nameTrack;
        divInfo.appendChild(infoTitle);

        let infoArtist = document.createElement("h5");
        infoArtist.textContent = song.nameArtist;
        divInfo.appendChild(infoArtist);

        element.appendChild(divInfo);
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


function changeCurrentSong(event) {
    let selectedSong = this.dataset.idSong;
    let activeSong = document.querySelector(".nowPlayingMedia");
    console.log(activeSong)
    if (activeSong == null ) {
        this.classList.add("nowPlayingMedia");
    }
    else {
        activeSong.classList.toggle("nowPlayingMedia")
        this.classList.toggle("nowPlayingMedia")
    }

    // || activeSong.classList.contains("nowPlayingMedia")
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

    if (DOM.audioPlayer.dataset.songId === "") {
        playFirstSong();
    }
    else {
        let activeSong = document.querySelector(".nowPlayingMedia");

        let currentIdSong = activeSong.dataset.idSong;
        let nextSongId = parseInt(currentIdSong) + 1;

        listMediaSongs = generarJSON();
        if (parseInt(nextSongId) > parseInt(listMediaSongs.length)) {
            nextSongId = 1;
            let newSong = listMediaSongs.find(search => {
                return search.id == nextSongId;
            });

            changeToAnotherSongButtons(newSong);
        }
        else {
            let newSong = listMediaSongs.find(search => {
                return search.id == nextSongId;
            });

            changeToAnotherSongButtons(newSong);
        }
        activeSong.classList.remove("nowPlayingMedia")
    }
}

function changeToPreviousSong() {

    if (DOM.audioPlayer.dataset.songId === "") {
        playFirstSong();
    }
    else {
        let activeSong = document.querySelector(".nowPlayingMedia");
        let currentIdSong = activeSong.dataset.idSong;
        let nextSongId = parseInt(currentIdSong) - 1;

        listMediaSongs = generarJSON();
        if (parseInt(nextSongId) <= 0) {
            nextSongId = listMediaSongs.length;
            let newSong = listMediaSongs.find(search => {
                return search.id == nextSongId;
            });

            changeToAnotherSongButtons(newSong);
        }
        else {
            let newSong = listMediaSongs.find(search => {
                return search.id == nextSongId;
            });

            changeToAnotherSongButtons(newSong);
        }
        activeSong.classList.remove("nowPlayingMedia");
    }
}



function changeToAnotherSongButtons(songObject) {
    let idNew = songObject.id;

    let seleccion = document.querySelector(`[data-id-song='${idNew}']`)
    seleccion.classList.add("nowPlayingMedia");

    audioStop();
    listMediaSongs = generarJSON();

    let newSong = listMediaSongs.find(search => {
        return search.id == idNew;
    });

    let source = DOM.audioPlayer.querySelector("source");
    source.setAttribute("src", newSong.audioSrc);
    DOM.audioPlayer.dataset.songId = idNew;
    audioLoad();
    changeCurrentInfoSong(newSong);
    playAudio();
}

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





//MARAVITUPENDO
// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// var mask;

// var pointCount = 500;
// var str = "Hello.";
// var fontStr = "bold 128pt Helvetica Neue, Helvetica, Arial, sans-serif";

// ctx.font = fontStr;
// ctx.textAlign = "center";
// c.width = ctx.measureText(str).width;
// c.height = 128; // Set to font size

// var whitePixels = [];
// var points = [];
// var point = function (x, y, vx, vy) {
//     this.x = x;
//     this.y = y;
//     this.vx = vx || 1;
//     this.vy = vy || 1;
// }
// point.prototype.update = function () {
//     ctx.beginPath();
//     ctx.fillStyle = "#95a5a6";
//     ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.closePath();

//     // Change direction if running into black pixel
//     if (this.x + this.vx >= c.width || this.x + this.vx < 0 || mask.data[coordsToI(this.x + this.vx, this.y, mask.width)] != 255) {
//         this.vx *= -1;
//         this.x += this.vx * 2;
//     }
//     if (this.y + this.vy >= c.height || this.y + this.vy < 0 || mask.data[coordsToI(this.x, this.y + this.vy, mask.width)] != 255) {
//         this.vy *= -1;
//         this.y += this.vy * 2;
//     }

//     for (var k = 0, m = points.length; k < m; k++) {
//         if (points[k] === this) continue;

//         var d = Math.sqrt(Math.pow(this.x - points[k].x, 2) + Math.pow(this.y - points[k].y, 2));
//         if (d < 5) {
//             ctx.lineWidth = .2;
//             ctx.beginPath();
//             ctx.moveTo(this.x, this.y);
//             ctx.lineTo(points[k].x, points[k].y);
//             ctx.stroke();
//         }
//         if (d < 20) {
//             ctx.lineWidth = .1;
//             ctx.beginPath();
//             ctx.moveTo(this.x, this.y);
//             ctx.lineTo(points[k].x, points[k].y);
//             ctx.stroke();
//         }
//     }

//     this.x += this.vx;
//     this.y += this.vy;
// }

// function loop() {
//     ctx.clearRect(0, 0, c.width, c.height);
//     for (var k = 0, m = points.length; k < m; k++) {
//         points[k].update();
//     }
// }

// function init() {
//     // Draw text
//     ctx.beginPath();
//     ctx.fillStyle = "#000";
//     ctx.rect(0, 0, c.width, c.height);
//     ctx.fill();
//     ctx.font = fontStr;
//     ctx.textAlign = "left";
//     ctx.fillStyle = "#fff";
//     ctx.fillText(str, 0, c.height / 2 + (c.height / 2));
//     ctx.closePath();

//     // Save mask
//     mask = ctx.getImageData(0, 0, c.width, c.height);

//     // Draw background
//     ctx.clearRect(0, 0, c.width, c.height);

//     // Save all white pixels in an array
//     for (var i = 0; i < mask.data.length; i += 4) {
//         if (mask.data[i] == 255 && mask.data[i + 1] == 255 && mask.data[i + 2] == 255 && mask.data[i + 3] == 255) {
//             whitePixels.push([iToX(i, mask.width), iToY(i, mask.width)]);
//         }
//     }

//     for (var k = 0; k < pointCount; k++) {
//         addPoint();
//     }
// }

// function addPoint() {
//     var spawn = whitePixels[Math.floor(Math.random() * whitePixels.length)];

//     var p = new point(spawn[0], spawn[1], Math.floor(Math.random() * 2 - 1), Math.floor(Math.random() * 2 - 1));
//     points.push(p);
// }

// function iToX(i, w) {
//     return ((i % (4 * w)) / 4);
// }
// function iToY(i, w) {
//     return (Math.floor(i / (4 * w)));
// }
// function coordsToI(x, y, w) {
//     return ((mask.width * y) + x) * 4;

// }

// setInterval(loop, 50);
// init();