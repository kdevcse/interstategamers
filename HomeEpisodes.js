var episodes = [];
var epCount = 0;

function fetchData(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		SortEpisodesByDate(data)
		var seasonNum = data[0]["season"]["number"] + 1;
		for(var i = 0; i < data.length; i++){
			if (data[i]["season"]["number"] < seasonNum){
				seasonNum = data[i]["season"]["number"];
				CreateEpisode(data[i],i,true);
			}
			else {
				CreateEpisode(data[i],i,false);
			}
		}
		//console.log(data) //debug
	  }
	};
	xmlhttp.open("GET", "Database/data.json", true);
	xmlhttp.send();
}

function SortEpisodesByDate(episodes) {
	return episodes.sort(function(a,b){return new Date(b["published_at"]) - new Date(a["published_at"])});
}

function CreateEpisode(data,id,newSeason){
	if (data["status"] != "published")
		return;
	
	var episodes = document.getElementById("episodes");

	if(newSeason){
		var season = document.createElement("h1");
		season.setAttribute("class","season-title");
		season.innerHTML = "Season " + data["season"]["number"];
		episodes.appendChild(season);
	}
	
	var ep = document.createElement("div");
	if(newSeason)
		ep.setAttribute("class", "episode-first");
	else
		ep.setAttribute("class", "episode");
	
	ep.setAttribute("id", `ep${id}`);
	ep.setAttribute("onmouseover",`showRating(${id})`);
		
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
	player.setAttribute("height", "52px");
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
	ep.style.display = "block";
}

function showRating(gameId){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		SortEpisodesByDate(data);
		setRatingValues(data[gameId]);
		};
	}
	xmlhttp.open("GET", "Database/data.json", true);
	xmlhttp.send();
}
function setRatingValues(game) {
	if(!game["Ranking Info"])
		return;

	var title = document.getElementById("ig-content-rank-game-title");
	title.innerHTML = game["title"];
	
	var overall = document.getElementById("ig-content-rank-game-overall");
	overall.innerHTML = `Overall ${game["Ranking Info"]["IG Score"]}/100`
	overallPercent = document.getElementById("ig-content-rank-progress-overall");
	overallPercent.style.width = `${game["Ranking Info"]["IG Score"]}%`;

	var gameplay = document.getElementById("ig-content-rank-game-gameplay");
	gameplay.innerHTML = `Gameplay ${game["Ranking Info"]["Gameplay"]}/100`
	gameplayPercent = document.getElementById("ig-content-rank-progress-gameplay");
	gameplayPercent.style.width = `${game["Ranking Info"]["Gameplay"]}%`;

	var aesthetics = document.getElementById("ig-content-rank-game-aesthetics");
	aesthetics.innerHTML = `Aesthetics ${game["Ranking Info"]["Aesthetics"]}/100`
	aestheticsPercent = document.getElementById("ig-content-rank-progress-aesthetics");
	aestheticsPercent.style.width = `${game["Ranking Info"]["Aesthetics"]}%`;

	var content = document.getElementById("ig-content-rank-game-content");
	content.innerHTML = `Content ${game["Ranking Info"]["Content"]}/100`
	contentPercent = document.getElementById("ig-content-rank-progress-content");
	contentPercent.style.width = `${game["Ranking Info"]["Content"]}%`;
}