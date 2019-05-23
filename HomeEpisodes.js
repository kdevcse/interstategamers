var episodes = [];
var epCount = 0;

function fetchData(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		SortEpisodesByDate(data)
		var seasonNum = data[0]["season"]["number"];
		setSeason(seasonNum)
		for(var i = 0; i < data.length; i++)
			CreateEpisode(data[i],i,true,seasonNum);
		//console.log(data) //debug
	  }
	};
	xmlhttp.open("GET", "Database/data.json", true);
	xmlhttp.send();
}

function setSeason(number){
	const season = document.getElementById("season-title");
	season.innerHTML = "Season " + number;
}

function SortEpisodesByDate(episodes) {
	return episodes.sort(function(a,b){return new Date(b["published_at"]) - new Date(a["published_at"])});
}

function CreateEpisode(data,id,show,latest_season){
	if (data["status"] != "published" || data["season"]["number"] != latest_season)
		return;
	
	var episodes = document.getElementById("episodes");
	var ep = document.createElement("div");
	ep.setAttribute("class", "episode");
	ep.setAttribute("id", `ep${id}`);
		
	var epTitle = document.createElement("h2");
	epTitle.setAttribute("class", "episode-title");
	epTitle.textContent = data["title"];
		
	var epDes = document.createElement("p");
	epDes.setAttribute("class", "ep-description");
	epDes.textContent = data["description"];
		
	var epPlayer = document.createElement("div");
	epPlayer.setAttribute("class", "player");
		
	var player = document.createElement("iframe");
	player.setAttribute("frameborder", "no");
	player.setAttribute("height", "200px");
	player.setAttribute("scrolling", "no");
	var playerSrc = `https://player.simplecast.com/${data["id"]}?dark=false`
	player.setAttribute("src", playerSrc);
	player.setAttribute("width", "100%");
	player.setAttribute("seamless", "seamless");
		
	episodes.appendChild(ep);
	ep.appendChild(epTitle);
	ep.appendChild(epDes);
	ep.appendChild(epPlayer);
	epPlayer.appendChild(player);
	if(show)
		ep.style.display = "block";
	else
		ep.style.display = "none";
}