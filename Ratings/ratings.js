function loadData(){
  let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      sortEpisodesByRank(data);
      for(let i = 0; i < data.length; i++){
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
    let sorts = rows[i].getElementsByClassName("sorted");
    for(j = 0; j < sorts.length; j++){
        let name = sorts[j].getAttribute("class");
        sorts[j].setAttribute("class",name.replace(" ","").replace("sorted",""));
    }
  }
}

function removeSelectedAttribute(){
  let sorts = document.getElementsByClassName("selected");
  for(j = 0; j < sorts.length; j++){
    let name = sorts[j].getAttribute("class");
    sorts[j].setAttribute("class",name.replace(" ","").replace("selected",""));
  }
}

function sortTableByCategory(ele,category, ascending) {
  removeSortedAttribute();
  ele.setAttribute("class","sorted");
  let table, rows, switching, i, x, y, shouldSwitch;
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
  let table, rows, switching, i, x, y, shouldSwitch;
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

  let rank = game["Rank"];
  let title = game["Ranking Info"]["Game"];
  let overall = game["Ranking Info"]["IG Score"].toFixed(2);
  let gameplay = game["Ranking Info"]["Gameplay"].toFixed(2);
  let aesthetics = game["Ranking Info"]["Aesthetics"].toFixed(2);
  let content = game["Ranking Info"]["Content"].toFixed(2);

  let table = document.getElementById("rankings-table");

  let newRow = document.createElement("tr");
  newRow.setAttribute("class","rankings-table-row");
  newRow.setAttribute("onclick","selectGame(this)");
  newRow.setAttribute("game",title);
  newRow.setAttribute("game-img","../Images/IGLogo.png");

  let pGameplay = game["Ranking Info"]["P. Gameplay"];
  let pVisuals = game["Ranking Info"]["P. Visuals"];
  let pAudio = game["Ranking Info"]["P. Audio"];
  let pContent = game["Ranking Info"]["P. Content"];
  let pOverall = game["Ranking Info"]["Peter's Rating"];
  newRow.setAttribute("p-scores",`${pGameplay}:${pVisuals}:${pAudio}:${pContent}:${pOverall}`);
  
  let kGameplay = game["Ranking Info"]["K. Gameplay"];
  let kVisuals = game["Ranking Info"]["K. Visuals"];
  let kAudio = game["Ranking Info"]["K. Audio"];
  let kContent = game["Ranking Info"]["K. Content"];
  let kOverall = game["Ranking Info"]["Kevin's Rating"];
  newRow.setAttribute("k-scores",`${kGameplay}:${kVisuals}:${kAudio}:${kContent}:${kOverall}`);
  
  let gameTitle = "../Images/" + title.replace(/\ /g,'_').replace(/\W/g, '').toLowerCase();
  imgExists(gameTitle + ".png", function(exists){
    if (exists){
      newRow.setAttribute("game-img",`${gameTitle}.png`);
    }
  });
  imgExists(gameTitle + ".jpg", function(exists){
    if (exists){
      newRow.setAttribute("game-img",`${gameTitle}.jpg`);
    }
  });

  let rankE = document.createElement("td");
  rankE.setAttribute("class","rankings-table-rank sorted");
  rankE.innerHTML = rank;
  let titleE = document.createElement("td");
  titleE.setAttribute("class","rankings-table-title");
  titleE.innerHTML = title;
  let overallE = document.createElement("td");
  overallE.setAttribute("class","rankings-table-overall");
  overallE.innerHTML = overall;
  let gameplayE = document.createElement("td");
  gameplayE.setAttribute("class","rankings-table-gameplay");
  gameplayE.innerHTML = gameplay;
  let aestheticsE = document.createElement("td");
  aestheticsE.setAttribute("class","rankings-table-aesthetics");
  aestheticsE.innerHTML = aesthetics;
  let contentE = document.createElement("td");
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

function selectGame(ele){
  removeSelectedAttribute();
  ele.setAttribute("class","rankings-table-row selected");
  let path = ele.getAttribute("game-img");
  let pData = ele.getAttribute("p-scores").split(":");
  let kData = ele.getAttribute("k-scores").split(":");

  let gameImg = document.getElementById("rankings-display-img");
  gameImg.setAttribute("src",path);

  getChart("peteChart",pData[0],pData[1],pData[2],pData[3],pData[4]);
  getChart("kevChart",kData[0],kData[1],kData[2],kData[3],kData[4]);

  document.getElementById("breakdownTxt").style.display = "none";
  gameImg.style.height = "100%";
}

function imgExists(path, callBack){
    let imageData = new Image();
    imageData.onload = function() {
      callBack(true);
    };
    imageData.onerror = function() {
      callBack(false);
    };
    imageData.src = path;
}