function onPlay(){
    var audio = document.getElementById("ig-trailer");
    if(audio.paused)
        audio.play();
    else
        audio.pause();
}