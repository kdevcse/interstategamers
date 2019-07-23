function populateTwitchLinks(){
    let twitchHovers = document.getElementsByClassName("twitch-link");
    
    for(let i = 0; i < twitchHovers.length; i++){
        twitchHovers[i].addEventListener("mouseover", function(){
            this.getElementsByClassName("fa-play")[0].classList.add("hovered");
        });
        twitchHovers[i].addEventListener("mouseout", function(){
            this.getElementsByClassName("fa-play")[0].classList.remove("hovered");
        });
    }
}