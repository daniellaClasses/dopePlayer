// import "playlist.js";
// import  playlist  from './playlist';


const DOM = {
    btnMusic: document.querySelector("#btnMusic"),
    btnVideo: document.querySelector("#btnVideo"),


    audioSection: document.querySelector("#audioSection"),
    audioPlayer: document.querySelector("#playerAudio").querySelector("audio"),
    playlistPart: document.querySelector("#partPlaylist"),
    songElection: document.querySelector(".displaySong"),
    timeNow: document.querySelector(".timeNow"),
    timeBar: document.querySelector(".timeBar"),
    timeEnd: document.querySelector(".timeEnd"),
    prev: document.querySelector(".back"),
    play: document.querySelector(".play"),
    stop: document.querySelector(".stop"),
    next: document.querySelector(".next"),
    mute: document.querySelector(".muteAudio"),
    lowAudio: document.querySelector(".lowVolumeAudio"),
    volume: document.querySelector(".volume"),
    highAudio: document.querySelector(".highVolumeAudio"),
    repeat: document.querySelector(".repeatAudio"),
    random: document.querySelector(".randomAudio"),

    selectSubtitles: document.querySelector("#selectSubtitles"),

    videoPlayer: document.querySelector("#playerVideo").querySelector("video"),
    videoPlaylist: document.querySelector("#videoPlaylist"),
    videoSection: document.querySelector("#videoSection"),

    prevVideo: document.querySelector("#videoSection").querySelector(".back"),
    playVideo: document.querySelector("#videoSection").querySelector(".play"),
    stopVideo: document.querySelector("#videoSection").querySelector(".stop"),
    nextVideo: document.querySelector("#videoSection").querySelector(".next"),
    muteVideo: document.querySelector("#videoSection").querySelector(".muteVideo"),
    repeatVideo: document.querySelector("#videoSection").querySelector(".repeatVideo"),
    randomVideo: document.querySelector("#videoSection").querySelector(".randomVideo"),
    lowVideo: document.querySelector("#videoSection").querySelector(".lowVolumeVideo"),
    volumeVideo: document.querySelector("#videoSection").querySelector(".volume"),
    highVideo: document.querySelector("#videoSection").querySelector(".highVolumeVideo"),
    timeNowVideo: document.querySelector("#videoSection").querySelector(".timeNow"),
    timeBarVideo: document.querySelector("#videoSection").querySelector(".timeBar"),
    timeEndVideo: document.querySelector("#videoSection").querySelector(".timeEnd")
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
                },
                {
                    "id": 7,
                    "nameTrack": "Al Santo Equivocado",
                    "nameArtist": "Ariadna",
                    "audioSrc": "../src/media/audio/7 Al Santo Equivocado.mp3",
                    "imgSrc": "../img/07song.jpg"
                },
                {
                    "id": 8,
                    "nameTrack": "La Di Die ft Jxdn",
                    "nameArtist": "Nessa Barrett",
                    "audioSrc": "../src/media/audio/8 Nessa Barrett - la di die feat. jxdn.mp3",
                    "imgSrc": "../img/08song.jpg"
                },
                {
                    "id": 9,
                    "nameTrack": "Christmas EveL",
                    "nameArtist": "Stray Kids",
                    "audioSrc": "../src/media/audio/9 Christmas EveL.mp3",
                    "imgSrc": "../img/09song.jpg"
                }, {
                    "id": 10,
                    "nameTrack": "Muéstrate",
                    "nameArtist": "Gisela",
                    "audioSrc": "../src/media/audio/10 Muéstrate.mp3",
                    "imgSrc": "../img/10song.jpg"
                },
                {
                    "id": 11,
                    "nameTrack": "Shadow is the Light ",
                    "nameArtist": "THE SIXTH LIE",
                    "audioSrc": "../src/media/audio/11 Shadow is the Light.mp3",
                    "imgSrc": "../img/11song.jpg"
                }
            ],
        "videos":
            [
                {
                    "id": 1,
                    "nameVideo": "No se habla de Bruno",
                    "videoSrc": "../src/media/video/1 No se habla de Bruno (De Encanto).mp4",
                    "imgSrc": "../img/01video.gif"
                },
                {
                    "id": 2,
                    "nameVideo": "Haikyuu!! Season 2 Opening 4 - Fly High",
                    "videoSrc": "../src/media/video/2 Haikyuu!! Season 2 Opening 4 - Fly High.mp4",
                    "imgSrc": "../img/02video.gif"
                },
                {
                    "id": 3,
                    "nameVideo": "Arcane Opening -  League of Legends",
                    "videoSrc": "../src/media/video/3 Arcane Opening -  League of Legends.mp4",
                    "imgSrc": "../img/03video.gif"
                },
                {
                    "id": 4,
                    "nameVideo": "Enchantix Flora - Winx Club",
                    "videoSrc": "../src/media/video/4 Winx Club Flora Enchantix.mp4",
                    "imgSrc": "../img/04video.gif"
                }
            ]
    }
`;

function playlistSongs() {
    var listMedia = JSON.parse(playlistJSON);
    var listMediaSongs = listMedia.songs;
    return listMediaSongs;
}

function playlistVideos() {
    var listMedia = JSON.parse(playlistJSON);
    var listMediaVideos = listMedia.videos;
    return listMediaVideos;
}

//IIFE
(function () {
    DOM.btnMusic.addEventListener("click", changePlayer);
    DOM.btnVideo.addEventListener("click", changePlayer);

    //---------------------------- AUDIO ------------------------------
    DOM.play.addEventListener("click", playAudio);
    DOM.stop.addEventListener("click", audioStop);
    DOM.next.addEventListener("click", changeToNextSong);
    DOM.prev.addEventListener("click", changeToPreviousSong);
    DOM.volume.addEventListener("change", changeVolume);

    //---------------------------- ESTADOS AUDIO ------------------------------
    DOM.audioPlayer.addEventListener("loadstart", loadTime);
    DOM.audioPlayer.addEventListener("timeupdate", loadTime);
    DOM.timeBar.addEventListener("input", changeCurrentMomentSong);
    DOM.repeat.addEventListener("click", repeatSameSong);
    DOM.random.addEventListener("click", playRandomAudio);
    DOM.mute.addEventListener("click", muteAudio);
    DOM.lowAudio.addEventListener("click", lowLessAudio);
    DOM.highAudio.addEventListener("click", highMoreAudio);

    //----------------------------------------- VIDEO ------------------------------------
    DOM.videoPlayer.addEventListener("timeupdate", loadTimeVideo);

    DOM.nextVideo.addEventListener("click", changeToNextVideo);
    DOM.playVideo.addEventListener("click", playVideo);
    DOM.stopVideo.addEventListener("click", videoStop);
    DOM.prevVideo.addEventListener("click", changeToPreviousVideo);
    DOM.volumeVideo.addEventListener("change", changeVolumeVideo);


    // ESTADOS VIDEO
    DOM.videoPlayer.addEventListener("loadstart", loadTimeVideo);
    DOM.volumeVideo.addEventListener("change", changeVolumeVideo);
    DOM.repeatVideo.addEventListener("click", repeatSameVideo);
    DOM.randomVideo.addEventListener("click", playRandomVideo);
    DOM.muteVideo.addEventListener("click", muteVideo);
    DOM.lowVideo.addEventListener("click", lowLessVideo);
    DOM.highVideo.addEventListener("click", highMoreVideo);
    DOM.timeBarVideo.addEventListener("input", changeCurrentMomentVideo);

    //para cambiar la barra de proceso del input según cambie, el evento es "input"

    //generar playlist
    generatePlaylist();

    //generar lista vídeos
    generateVideos();


    let noSub = document.createElement("option");
    noSub.textContent = "Subtítulos";
    let espSub = document.createElement("option");
    espSub.textContent = "Español";
    let enSub = document.createElement("option");
    enSub.textContent = "Inglés";

    DOM.selectSubtitles.appendChild(noSub);
    DOM.selectSubtitles.appendChild(espSub);
    DOM.selectSubtitles.appendChild(enSub);
}
)();

function changePlayer() {
    if (this.id == "btnMusic") {
        videoStop();
        DOM.audioSection.classList.remove("hidePlayer");
        DOM.videoSection.classList.add("hidePlayer");
        DOM.btnMusic.classList.add("active")
        DOM.btnVideo.classList.remove("active")

    } else {
        audioStop();
        DOM.videoSection.classList.remove("hidePlayer");
        DOM.audioSection.classList.add("hidePlayer");
        DOM.btnMusic.classList.remove("active")
        DOM.btnVideo.classList.add("active")
    }
}

function playAudio() {
    DOM.play.style.display = "none";
    DOM.stop.style.display = "flex";
    if (DOM.audioPlayer.dataset.songId == null) {
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
    DOM.playVideo.style.display = "none";
    DOM.stopVideo.style.display = "flex";

    if (DOM.videoPlayer.dataset.videoId == null) {
        playFirstVideo();
    }
    else {
        DOM.videoPlayer.play()
    }

}

function videoStop() {
    DOM.videoPlayer.pause();
    DOM.stopVideo.style.display = "none";
    DOM.playVideo.style.display = "flex";
}

function videoLoad() {
    DOM.videoPlayer.load();

}

function changeVolume() {
    let level = DOM.volume.value;
    DOM.audioPlayer.volume = level;
}

function lowLessAudio() {
    let level = DOM.volume.value;
    level = parseFloat(level)
    level -= 0.1;
    DOM.volume.value = level;
    changeVolume();
}

function highMoreAudio() {
    let level = DOM.volume.value;
    level = parseFloat(level)
    level += 0.1;
    DOM.volume.value = level;
    changeVolume();
}

function changeVolumeVideo() {
    let level = DOM.volumeVideo.value;
    DOM.videoPlayer.volume = level;
}

function lowLessVideo() {
    let level = DOM.volumeVideo.value;
    level = parseFloat(level)
    level -= 0.1;
    DOM.volumeVideo.value = level;
    changeVolumeVideo();
}

function highMoreVideo() {
    let level = DOM.volumeVideo.value;
    level = parseFloat(level)
    level += 0.1;
    DOM.volumeVideo.value = level;
    changeVolumeVideo();
}


//función especialita para reproducir la primera canción
function playFirstSong() {
    let listMediaSongs = playlistSongs();
    let firstSong = listMediaSongs[0];
    let firstSongOfTheList = document.querySelector("li");
    firstSongOfTheList.classList.add("nowPlayingMedia");

    changeSrc(DOM.audioPlayer, firstSong.audioSrc);
    DOM.audioPlayer.dataset.songId = firstSong.id;
    audioLoad();
    changeCurrentInfoSong(firstSong);
    playAudio();
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

function loadTimeVideo() {
    let now = DOM.videoPlayer.currentTime;
    if (isNaN(now)) {
        DOM.timeNowVideo.textContent = '00:00';
        DOM.timeBarVideo.value = 0;
    } else {
        DOM.timeNowVideo.textContent = calculateTime(now);
        DOM.timeBarVideo.value = now;
    }
    let end = DOM.videoPlayer.duration;

    if (isNaN(end)) {
        DOM.timeEndVideo.textContent = '00:00';
        DOM.timeBarVideo.max = 0;
    } else {
        DOM.timeEndVideo.textContent = calculateTime(end);
        DOM.timeBarVideo.max = end;
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
    listMediaSongs = playlistSongs();
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
        divInfo.classList.add("infoSong");

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

function generateVideos() {
    cleanPreviousContent(DOM.videoPlaylist);

    let titleVideoPlaylist = document.createElement("h1");
    titleVideoPlaylist.textContent = "Vídeos disponibles";

    DOM.videoPlaylist.appendChild(titleVideoPlaylist);

    let listMediaVideos = playlistVideos();

    listMediaVideos.forEach(video => {

        let containerVideo = document.createElement("div")
        containerVideo.classList.add("card")
        containerVideo.addEventListener("click", changeCurrentVideo);
        containerVideo.dataset.idVideo = video.id;

        containerVideo.style.backgroundImage = "url(" + video.imgSrc + ")";

        DOM.videoPlaylist.appendChild(containerVideo);
    })
}

function cleanPreviousContent(section) {
    if (section.hasChildNodes) {
        section.childNodes.forEach(element => {
            element.parentElement.replaceChildren();
        });
    }
}

function changeCurrentSong(event) {
    let selectedSong = this.dataset.idSong;
    let activeSong = document.querySelector(".nowPlayingMedia");
    if (activeSong == null) {
        this.classList.add("nowPlayingMedia");
    }
    else {
        activeSong.classList.toggle("nowPlayingMedia")
        this.classList.toggle("nowPlayingMedia")
    }

    audioStop();
    listMediaSongs = playlistSongs();

    let newSong = listMediaSongs.find(search => {
        return search.id == selectedSong;
    });

    changeSrc(DOM.audioPlayer, newSong.audioSrc);

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

    if (DOM.audioPlayer.dataset.songId === undefined) {
        playFirstSong();
    }
    else {
        let activeSong = document.querySelector(".nowPlayingMedia");

        let currentIdSong = activeSong.dataset.idSong;
        let nextSongId = parseInt(currentIdSong) + 1;

        listMediaSongs = playlistSongs();
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

    if (DOM.audioPlayer.dataset.songId === undefined) {
        playFirstSong();
    }
    else {
        let activeSong = document.querySelector(".nowPlayingMedia");
        let currentIdSong = activeSong.dataset.idSong;
        let nextSongId = parseInt(currentIdSong) - 1;

        listMediaSongs = playlistSongs();
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
    listMediaSongs = playlistSongs();

    let newSong = listMediaSongs.find(search => {
        return search.id == idNew;
    });

    changeSrc(DOM.audioPlayer, newSong.audioSrc);

    DOM.audioPlayer.dataset.songId = idNew;
    audioLoad();
    changeCurrentInfoSong(newSong);
    playAudio();
}

// AUDIO AUDIO AUDIO AUDIO AUDIO ---------------------------------------------------

function changeCurrentMomentSong() {
    let moment = DOM.timeBar.value;
    DOM.audioPlayer.currentTime = moment;
}

function repeatSameSong() {
    audioLoad();
    playAudio();
}

// funcion para reproducir un audio de la lista aleatoriamente.
function playRandomAudio() {
    let listMediaAudios = playlistSongs();
    let totalAudios = listMediaAudios.length;

    let audioActive = DOM.audioPlayer.dataset.songId;

    let randomId;
    if (audioActive == null) {
        randomId = Math.floor(Math.random() * totalAudios + 1);
    } else {
        do {
            randomId = Math.floor(Math.random() * totalAudios + 1);
        } while (randomId == audioActive);
    }
    playAudioId(randomId);
}

// funcion para reproducir un audio por su id.
function playAudioId(inputId) {

    let listMediaAudios = playlistSongs();

    let audio = listMediaAudios.find(element => element.id == inputId);

    let audioOnList = DOM.audioSection.querySelector(`[data-id-song='${inputId}']`);
    nowPlayingMediaCleaner(DOM.audioSection);
    audioOnList.classList.add("nowPlayingMedia");

    changeSrc(DOM.audioPlayer, audio.audioSrc);

    DOM.audioPlayer.dataset.songId = audio.id;

    audioLoad();
    changeCurrentInfoSong(audio);
    playAudio();
}

// funcion para mutear el audio
function muteAudio() {

    let muteNow = DOM.volume.dataset.muteMode;

    if (muteNow == null || muteNow == "off") {

        DOM.audioPlayer.volume = 0;
        DOM.volume.dataset.muteMode = "on";
        DOM.volume.setAttribute("disabled", true);

    } else {

        let level = DOM.volume.value;

        if (level == 0) {
            DOM.audioPlayer.volume = 0.5;
            DOM.volume.value = 0.5;
        }
        else {
            DOM.audioPlayer.volume = level;
        }

        DOM.volume.dataset.muteMode = "off";
        DOM.volume.removeAttribute("disabled");
    }
}

// VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO VIDEO

function changeCurrentMomentVideo() {
    let moment = DOM.timeBarVideo.value;
    DOM.videoPlayer.currentTime = moment;
}

function changeCurrentVideo(event) {
    let selectedVideo = this.dataset.idVideo;
    let activeVideo = document.querySelector(".nowPlayingMedia");
    if (activeVideo == null) {
        this.classList.add("nowPlayingMedia");
    }
    else {
        activeVideo.classList.toggle("nowPlayingMedia")
        this.classList.toggle("nowPlayingMedia")
    }

    videoStop();
    listMediaVideos = playlistVideos();

    let newVideo = listMediaVideos.find(search => {
        return search.id == selectedVideo;
    });

    changeSrc(DOM.videoPlayer, newVideo.videoSrc)

    DOM.videoPlayer.dataset.videoId = selectedVideo;

    console.log(DOM.videoPlayer.dataset.videoId)

    if (DOM.videoPlayer.dataset.videoId == 4) {
        DOM.selectSubtitles.removeAttribute("disabled");
        selectSubtitles.addEventListener("change", function(){
            if (selectSubtitles.value == "Subtítulos") {
                DOM.videoPlayer.querySelector("track").remove();
            }
            let subTrack;
            if (DOM.videoPlayer.querySelector("track") == null) {
                
                subTrack = document.createElement("track");

                
            if (selectSubtitles.value == "Español") {
                subTrack.setAttribute("kind", "captions");
                subTrack.setAttribute("src", "../src/media/subtitles/enchantixSub.vtt");
                subTrack.setAttribute("srclang", "es");
                subTrack.setAttribute("label", "español")
                subTrack.setAttribute("default", "true")
                let unuseful = DOM.videoPlayer.querySelector("track");
                DOM.videoPlayer.appendChild(subTrack)
            }

            if (selectSubtitles.value == "Inglés") {
                subTrack.setAttribute("kind", "captions");
                subTrack.setAttribute("src", "../src/media/subtitles/enchantixSubEng.vtt");
                subTrack.setAttribute("srclang", "en");
                subTrack.setAttribute("label", "ingles")
                subTrack.setAttribute("default", "true")
                let unuseful = DOM.videoPlayer.querySelector("track");
                DOM.videoPlayer.appendChild(subTrack)
            }
            }
        })
    }


    videoLoad();
    changeCurrentInfoVideo(newVideo);
    playVideo();
}

function changeCurrentInfoVideo(videoObject) {
    let trackNameSpace = document.querySelector("#nowPlayingVideo").querySelector(".nowPlayingTitle");
    trackNameSpace.textContent = videoObject.nameVideo;
}

function changeToNextVideo() {

    if (DOM.videoPlayer.dataset.videoId === undefined) {
        playFirstVideo();
    }
    else {
        let activeVideo = document.querySelector(".nowPlayingMedia");

        let currentIdVideo = activeVideo.dataset.idVideo;
        let nextVideoId = parseInt(currentIdVideo) + 1;

        listMediaVideo = playlistVideos();
        if (parseInt(nextVideoId) > parseInt(listMediaVideo.length)) {
            nextVideoId = 1;
            let newVideo = listMediaVideo.find(search => {
                return search.id == nextVideoId;
            });

            changeToAnotherVideoButtons(newVideo);
        }
        else {
            let newVideo = listMediaVideo.find(search => {
                return search.id == nextVideoId;
            });

            changeToAnotherVideoButtons(newVideo);
        }
        activeVideo.classList.remove("nowPlayingMedia")
    }
}

function changeToPreviousVideo() {
    if (DOM.videoPlayer.dataset.videoId === undefined) {
        // playFirstVideo();
        listMediaVideos = playlistVideos();
        playVideoId(listMediaVideos.length);
    }
    else {

        let activeVideo = document.querySelector(".nowPlayingMedia");
        let currentIdVideo = activeVideo.dataset.idVideo;
        let nextVideoId = parseInt(currentIdVideo) - 1;
        listMediaVideos = playlistVideos();

        if (parseInt(nextVideoId) <= 0) {

            nextVideoId = listMediaVideos.length;
            let newVideo = listMediaVideos.find(search => {
                return search.id == nextVideoId;
            });

            changeToAnotherVideoButtons(newVideo);
        }
        else {
            let newVideo = listMediaVideos.find(search => {
                return search.id == nextVideoId;
            });

            changeToAnotherVideoButtons(newVideo);
        }
        activeVideo.classList.remove("nowPlayingMedia");
    }
}

function playFirstVideo() {

    let listMediaVideos = playlistVideos();
    let firstVideo = listMediaVideos[0];

    let firstVideoOfTheList = DOM.videoSection.querySelector(".card");
    firstVideoOfTheList.classList.add("nowPlayingMedia");

    changeSrc(DOM.videoPlayer, firstVideo.videoSrc);

    DOM.videoPlayer.dataset.videoId = firstVideo.id;

    videoLoad();
    changeCurrentInfoVideo(firstVideo);
    playVideo();

}

function changeToAnotherVideoButtons(videoObject) {
    let idNew = videoObject.id;

    let seleccion = document.querySelector(`[data-id-video='${idNew}']`)
    seleccion.classList.add("nowPlayingMedia");

    videoStop();
    let listMediaVideos = playlistVideos();

    let newVideo = listMediaVideos.find(search => {
        return search.id == idNew;
    });

    changeSrc(DOM.videoPlayer, newVideo.videoSrc);

    DOM.videoPlayer.dataset.videoId = idNew;

    videoLoad();
    changeCurrentInfoVideo(newVideo);
    playVideo();
}


function repeatSameVideo() {
    videoLoad();
    playVideo();
}

// función para reproducir un video de la lista aleatoriamente.
function playRandomVideo() {
    let listMediaVideos = playlistVideos();
    let totalVideos = listMediaVideos.length;

    let videoActive = DOM.videoPlayer.dataset.videoId;

    let randomId;
    if (videoActive == null) {
        randomId = Math.floor(Math.random() * totalVideos + 1);
    } else {
        do {
            randomId = Math.floor(Math.random() * totalVideos + 1);
        } while (randomId == videoActive);
    }
    playVideoId(randomId);
}

// funcion para reproducir un video por su id.
function playVideoId(inputId) {

    let listMediaVideos = playlistVideos();

    let video = listMediaVideos.find(element => element.id == inputId);
    // let video = listMediaVideos[inputId];

    let videoOnList = DOM.videoSection.querySelector(`[data-id-video='${inputId}']`);
    nowPlayingMediaCleaner(DOM.videoSection);
    videoOnList.classList.add("nowPlayingMedia");

    changeSrc(DOM.videoPlayer, video.videoSrc);

    DOM.videoPlayer.dataset.videoId = video.id;

    videoLoad();
    changeCurrentInfoVideo(video);
    playVideo();
}

// funcion para mutear el video
function muteVideo() {

    let muteNow = DOM.volumeVideo.dataset.muteMode;

    if (muteNow == null || muteNow == "off") {

        DOM.videoPlayer.volume = 0;
        DOM.volumeVideo.dataset.muteMode = "on";
        DOM.volumeVideo.setAttribute("disabled", true);

    } else {

        let level = DOM.volumeVideo.value;
        DOM.videoPlayer.volume = level;
        DOM.volumeVideo.dataset.muteMode = "off";
        DOM.volumeVideo.removeAttribute("disabled");

    }
}

//-------------  COMUNES COMUNES COMUNES COMUNES COMUNES -------------------------------------------------------------------

// funcion para cambiar el atributo src
function changeSrc(player, inputSrc) {

    let source = player.querySelector("source");
    source.setAttribute("src", inputSrc);
}

// funcion para limpiar la clase nowPlayingMedia.
function nowPlayingMediaCleaner(section) {
    let nows = section.querySelectorAll(".nowPlayingMedia");
    nows.forEach(element => element.classList.remove("nowPlayingMedia"));
}

function checkSubtitles(){
    DOM.videoPlayer.dataset.videoId;
}




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