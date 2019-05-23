var key = 'sc_R-QunzjB8e_0ClZndsVJJw';
var podID = '4122';
var episodes = [];
var epCount = 0;

$.get(`https://api.simplecast.com/v1/podcasts/${podID}/episodes.json?api_key=${key}`,function(data, status){
	if (status == 'success'){
		episodes = SortEpisodesByDate(data);
		for(var i = 0; i < episodes.length; i++)
			CreateEpisode(episodes[i], i);
		AddEpToSite();
	}
	else
		alert('Failed to load episodes from podcast');
});

$(document).ready(function(){
    $("#getMore").click(function (){
		AddEpToSite();
	});
});

function SortEpisodesByDate(episodes){
	return episodes.sort(function(a,b){return new Date(b["published_at"]) - new Date(a["published_at"])});
}

function AddEpToSite(){
	var count = epCount;
	for(var i = count; i < count + 5; i++){
		if (i > episodes.length - 1){
			$("#getMore").hide();
			return;
		}
		$(`#ep${i}`).show();
		epCount++;
	}
}

function CreateEpisode(data,id){
	if (!data["published"])
		return;
	
	var episodes = document.getElementById("episodes");
	var ep = document.createElement("div");
	ep.setAttribute("class", "episode");
	ep.setAttribute("id", `ep${id}`);
		
	var epTitle = document.createElement("h1");
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
	$(`#ep${id}`).hide();
}