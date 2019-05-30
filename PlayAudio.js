/* exported playTrailer */
function playTrailer(){
    const audio = document.getElementById("ig-audio");
    var button = document.getElementById("ig-trailer-playButton");

    if(audio.paused){
        audio.play();
        button.setAttribute("class","fas fa-pause-circle");
    }
    else{
        audio.pause();
        button.setAttribute("class","fas fa-play-circle");
    }
}

/* exported stopTrailer */
function stopTrailer(){
    const button = document.getElementById("ig-trailer-playButton");
    button.setAttribute("class","fas fa-play-circle");
}

/* exported playEpisode */
function playEpisode(episode,id){
    const audio = document.getElementById(`ep${id}-audio`);

    if(audio.paused){
        audio.play();
        episode.setAttribute("class","fas fa-pause-circle");
    }
    else{
        audio.pause();
        episode.setAttribute("class","fas fa-play-circle");
    }
}

/* exported stopEpisode */
function stopEpisode(episode){
    episode.setAttribute("class","fas fa-play-circle");
}

/* exported stopAudio */
function stopAudio(){
    var buttons = document.getElementsByClassName("fas fa-pause-circle");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].setAttribute("class","fas fa-play-circle");
    }
}