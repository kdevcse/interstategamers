// JavaScript Document
var key = 'keyiAfm7QZhgG2nkV';
var images = [];
var request = `https://api.airtable.com/v0/appDCLBXIkefciEz4/Ratings?api_key=${key}`;

$.get(`https://api.airtable.com/v0/appDCLBXIkefciEz4/Episode Info?api_key=${key}`,function(data, status){
	if (status == 'success'){
		images = data.records;
	}
	else
		alert('Failed to load image locations from database');
});

function getGames(){
	$.get(request,function(data, status){
		var gameData = data.records;
		for(var i = 0; i < gameData.length; i++)
			CreateEpisode(gameData[i], i);
	});		
}

$(document).ready(function(){
	getGames();
});

function SortGamesBy(g,sortBy){
	return g.sort(function(a,b){return b.fields[sortBy] - a.fields[sortBy]});
}

function CreateEpisode(gameData,id){
	var name = gameData.fields["Game"];
	var gs = document.getElementById("games");
	var g = document.createElement("div");
	g.setAttribute("class", "game");
	g.setAttribute("id", `rank${id + 1}`);
	
	//var gImg = document.createElement("gImg");
	//console.log("Images: " + images);
	//gImg.setAttribute("src",`../Images/${images[0].fields["Box Art Filename"]}`);
		
	var gTitle = document.createElement("h1");
	gTitle.setAttribute("class", "game-title");
	gTitle.textContent = name;
	
	var gameplayRing = document.createElement("svg");
	gameplayRing.setAttribute("class", "rating-ring");
	gameplayRing.setAttribute("xmlns","https://www.w3.org/TR/SVG2/");
	var gameplayCircle = document.createElement("circle");
	gameplayCircle.setAttribute("class", "rating-circle");
	gameplayRing.appendChild(gameplayCircle);
	
	gs.appendChild(g);
	//g.appendChild(gImg);
	g.appendChild(gTitle);
	g.appendChild(gameplayRing);
	
}