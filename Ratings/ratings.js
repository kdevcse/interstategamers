function loadData(){
    var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		sortEpisodesByRank(data);
		for(var i = 0; i < data.length; i++){
            tableInsert(data[i]);
		}
	  }
	};
	xmlhttp.open("GET", "../Database/data.json", true);
	xmlhttp.send();
}

function sortEpisodesByRank(episodes) {
    for(let i = 0; i < episodes.length; i++){
        if(!episodes[i]["Rank"]){
            episodes.splice(i,1);
        }
    }
    episodes.sort(function(a,b){return Number(a["Rank"]) < Number(b["Rank"])});
    episodes.reverse();
    return episodes;
}

function tableInsert(game){

    if(!game["Ranking Info"]){
        return;
    }

    var table = document.getElementById("rankings-table");

    var newRow = document.createElement("tr");
    newRow.setAttribute("class","rankings-table-row");

    var rank = game["Rank"];
    var title = game["Ranking Info"]["Game"];
    var overall = game["Ranking Info"]["IG Score"].toFixed(2);
    var gameplay = game["Ranking Info"]["Gameplay"].toFixed(2);
    var aesthetics = game["Ranking Info"]["Aesthetics"].toFixed(2);
    var content = game["Ranking Info"]["Content"].toFixed(2);

    var rankE = document.createElement("td");
    rankE.innerHTML = rank;
    var titleE = document.createElement("td");
    titleE.innerHTML = title;
    var overallE = document.createElement("td");
    overallE.innerHTML = overall;
    var gameplayE = document.createElement("td");
    gameplayE.innerHTML = gameplay;
    var aestheticsE = document.createElement("td");
    aestheticsE.innerHTML = aesthetics;
    var contentE = document.createElement("td");
    contentE.innerHTML = content;
    
    newRow.appendChild(rankE);
    newRow.appendChild(titleE);
    newRow.appendChild(overallE);
    newRow.appendChild(gameplayE);
    newRow.appendChild(aestheticsE);
    newRow.appendChild(contentE);
    table.appendChild(newRow);
}