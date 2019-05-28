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

function stopTrailer(){
    const button = document.getElementById("ig-trailer-playButton");
    button.setAttribute("class","fas fa-play-circle");
}

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

function stopEpisode(episode){
    episode.setAttribute("class","fas fa-play-circle");
}

function stopAudio(){
    var buttons = document.getElementsByClassName("fas fa-pause-circle");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].setAttribute("class","fas fa-play-circle");
    }
}