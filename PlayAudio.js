function onPlay(){
    const audio = document.getElementById("ig-trailer");
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

function stopAudio(){
    const button = document.getElementById("ig-trailer-playButton");
    button.setAttribute("class","fas fa-play-circle");
}