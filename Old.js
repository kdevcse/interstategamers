// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var key = 'sc_R-QunzjB8e_0ClZndsVJJw';
var podID = '4122';

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', `https://api.simplecast.com/v1/podcasts/${podID}/episodes.json?api_key=${key}`, true);

request.onload = function () {
	// Begin accessing JSON data here
	if (request.status == 200){
		var eps = JSON.parse(this.response);
		var sortedEps = SortEpisodesByDate(eps);
		for (var i = 0; i < 5; i++)
			CreateEpisode(sortedEps[i]);
	}
	else{
		console.log("ERROR Response code:" + request.status.toString);
	}
}

function SortEpisodesByDate(episodes){
	return episodes.sort(function(a,b){return new Date(b["published_at"]) - new Date(a["published_at"])});
}

function CreateEpisode(data){
		var episodes = document.getElementById("episodes");
		var ep = document.createElement("div");
		ep.setAttribute("class", "episode");
		
		var epTitle = document.createElement("h1");
		epTitle.setAttribute("class", "episode-title");
		epTitle.textContent = data["title"];
		
		var epDes = document.createElement("p");
		epDes.setAttribute("class", "ep-description");
		epDes.textContent = data["description"];
		
		var epPlayer = document.createElement("div");
		epPlayer.setAttribute("class", "player");
		
		var player = document.createElement("iframe");
		player.setAttribute("frameborder", "0");
		player.setAttribute("height", "200px");
		player.setAttribute("scrolling", "no");
		var playerSrc = data["sharing_url"].replace("simplecast.com","embed.simplecast.com").replace("/s","") + "?color=ffffff";
		player.setAttribute("src", playerSrc);
		player.setAttribute("width", "100%");
		player.setAttribute("seamless", "seamless");
		
		episodes.appendChild(ep);
		ep.appendChild(epTitle);
		ep.appendChild(epDes);
		ep.appendChild(epPlayer);
		epPlayer.appendChild(player);
}

// Send request
request.send();