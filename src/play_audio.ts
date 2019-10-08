/* exported playTrailer */
function playTrailer(){
    let audio = <HTMLMediaElement>document.getElementById("ig-audio");
    let button = document.getElementById("ig-trailer-playButton");

    if(audio.paused){
        audio.play();
        button.classList.remove("fa-play-circle");
        button.classList.add("fa-pause-circle");
    }
    else{
        audio.pause();
        button.classList.remove("fa-pause-circle");
        button.classList.add("fa-play-circle");
    }
}

/* exported stopTrailer */
function stopTrailer(){
    const button = document.getElementById("ig-trailer-playButton");
    button.classList.remove("fa-pause-circle");
    button.classList.add("fa-play-circle");
}

/* exported playEpisode */
function playEpisode(episode:HTMLElement,id:number){
    const audio = <HTMLMediaElement>document.getElementById(`ep${id}-audio`);
    episode.style.cursor = "pointer";

    if(audio.paused){
        audio.play();
        episode.classList.remove("fa-play-circle");
        episode.classList.add("fa-pause-circle");
    }
    else{
        audio.pause();
        episode.classList.remove("fa-pause-circle");
        episode.classList.add("fa-play-circle");
    }
}

function loadEpisode(episode:HTMLElement){
    episode.style.cursor = "progress";
}

/* exported stopEpisode */
function stopEpisode(episode:HTMLElement){
    episode.style.cursor = "pointer";
    episode.classList.remove("fa-pause-circle");
    episode.classList.add("fa-play-circle");
}

/* exported stopAudio */
function stopAudio(){
    var buttons = document.getElementsByClassName("fa-pause-circle");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove("fa-pause-circle");
        buttons[i].classList.add("fa-play-circle");
    }
}