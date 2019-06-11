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
    episodes.sort(function(a,b){return Number(b["Rank"]) - Number(a["Rank"])});
    episodes.reverse();
    return episodes;
}

function removeSortedAttribute(){
    table = document.getElementById("rankings-table");
    rows = table.rows;
    for (i = 0; i < (rows.length); i++) {
        var sorts = rows[i].getElementsByClassName("sorted");
        for(j = 0; j < sorts.length; j++){
            var name = sorts[j].getAttribute("class");
            sorts[j].setAttribute("class",name.replace(" ","").replace("sorted",""));
        }
    }
}

function sortTableByCategory(ele,category, ascending) {
    removeSortedAttribute();
    ele.setAttribute("class","sorted");
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("rankings-table");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByClassName(`rankings-table-${category}`)[0];
        x.setAttribute("class",`rankings-table-${category} sorted`);
        y = rows[i + 1].getElementsByClassName(`rankings-table-${category}`)[0];
        y.setAttribute("class",`rankings-table-${category} sorted`);
        if (ascending && Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
        else if (!ascending && Number(x.innerHTML) < Number(y.innerHTML)){
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
}

function sortTableByTitle(ele,ascending){
    removeSortedAttribute();
    ele.setAttribute("class","sorted");
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("rankings-table");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByClassName(`rankings-table-title`)[0];
        x.setAttribute("class",`rankings-table-title sorted`);
        y = rows[i + 1].getElementsByClassName(`rankings-table-title`)[0];
        y.setAttribute("class",`rankings-table-title sorted`);
        if (ascending && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
        else if (!ascending && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
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
    rankE.setAttribute("class","rankings-table-rank sorted");
    rankE.innerHTML = rank;
    var titleE = document.createElement("td");
    titleE.setAttribute("class","rankings-table-title");
    titleE.innerHTML = title;
    var overallE = document.createElement("td");
    overallE.setAttribute("class","rankings-table-overall");
    overallE.innerHTML = overall;
    var gameplayE = document.createElement("td");
    gameplayE.setAttribute("class","rankings-table-gameplay");
    gameplayE.innerHTML = gameplay;
    var aestheticsE = document.createElement("td");
    aestheticsE.setAttribute("class","rankings-table-aesthetics");
    aestheticsE.innerHTML = aesthetics;
    var contentE = document.createElement("td");
    contentE.setAttribute("class","rankings-table-content");
    contentE.innerHTML = content;
    
    newRow.appendChild(rankE);
    newRow.appendChild(titleE);
    newRow.appendChild(overallE);
    newRow.appendChild(gameplayE);
    newRow.appendChild(aestheticsE);
    newRow.appendChild(contentE);
    table.appendChild(newRow);
}