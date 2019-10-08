function getLiveStatus(){
    let channels = document.getElementsByClassName("twitch-link");
    for(let i = 0; i < channels.length; i++){
        let xmlhttp = new XMLHttpRequest();
        let channel = channels[i].getAttribute("channel");
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText)["data"];
                if(data.length > 0 && data[0]["type"] === "live"){
                    let text = <HTMLElement> channels[i].getElementsByClassName("live-text")[0];
                    text.style.visibility = "visible";
                }
            }
        };
        xmlhttp.open("GET", `https://api.twitch.tv/helix/streams?user_login=${channel}`, true);
        xmlhttp.setRequestHeader("Client-ID", "xjah8vp8zd8s7es9blv3jlxkst315r");
        xmlhttp.send();
    }
}