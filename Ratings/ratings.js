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

function sortTableByCategory(ele,category, ascending){
  //Set row to sorted class identifier
  removeSortedAttribute();
  ele.setAttribute("class","sorted");

  let canSwitch = true;
  let table = document.getElementById("rankings-table");
  let rows = table.rows;

  //Swap sort algorithm
  while(canSwitch){
    canSwitch = false;
    for(let i = 1; i < rows.length; i++){
      if(rows[i].className.includes("rankings-table-row-info") || !rows[i+2])
        continue;
        
      x = rows[i].getElementsByClassName(`rankings-table-${category}`)[0];
      x.setAttribute("class",`rankings-table-${category} sorted`);
      y = rows[i + 2].getElementsByClassName(`rankings-table-${category}`)[0];
      y.setAttribute("class",`rankings-table-${category} sorted`);
      if (ascending && Number(x.innerHTML) > Number(y.innerHTML)) {
        canSwitch = true;
        table.insertBefore(rows[i+2],rows[i]);
        table.insertBefore(rows[i+3],rows[i+1]);
        break;
      }
      else if (!ascending && Number(x.innerHTML) < Number(y.innerHTML)){
        canSwitch = true;
        table.insertBefore(rows[i+2],rows[i]);
        table.insertBefore(rows[i+3],rows[i+1]);
        break;
      }
    }
  }
}

function sortTableByTitle(ele, ascending){
  //Set row to sorted class identifier
  removeSortedAttribute();
  ele.setAttribute("class","sorted");

  let canSwitch = true;
  let table = document.getElementById("rankings-table");
  let rows = table.rows;

  //Swap sort algorithm
  while(canSwitch){
    canSwitch = false;
    for(let i = 1; i < rows.length; i++){
      if(rows[i].className.includes("rankings-table-row-info") || !rows[i+2])
        continue;
        
      x = rows[i].getElementsByClassName(`rankings-table-title`)[0];
      x.setAttribute("class",`rankings-table-title sorted`);
      y = rows[i + 2].getElementsByClassName(`rankings-table-title`)[0];
      y.setAttribute("class",`rankings-table-title sorted`);
      if (ascending && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        canSwitch = true;
        table.insertBefore(rows[i+2],rows[i]);
        table.insertBefore(rows[i+3],rows[i+1]);
        break;
      }
      else if (!ascending && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
        canSwitch = true;
        table.insertBefore(rows[i+2],rows[i]);
        table.insertBefore(rows[i+3],rows[i+1]);
        break;
      }
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
  newRow.setAttribute("game",title);
  newRow.addEventListener("click",function(){selectGame(this)});

  let pGameplay = game["Ranking Info"]["P. Gameplay"].toFixed(2);
  let pVisuals = game["Ranking Info"]["P. Visuals"].toFixed(2);
  let pAudio = game["Ranking Info"]["P. Audio"].toFixed(2);
  let pContent = game["Ranking Info"]["P. Content"].toFixed(2);
  let pOverall = game["Ranking Info"]["Peter's Rating"].toFixed(2);
  newRow.setAttribute("p-scores",`${pGameplay}:${pVisuals}:${pAudio}:${pContent}:${pOverall}`);
  
  let kGameplay = game["Ranking Info"]["K. Gameplay"].toFixed(2);
  let kVisuals = game["Ranking Info"]["K. Visuals"].toFixed(2);
  let kAudio = game["Ranking Info"]["K. Audio"].toFixed(2);
  let kContent = game["Ranking Info"]["K. Content"].toFixed(2);
  let kOverall = game["Ranking Info"]["Kevin's Rating"].toFixed(2);
  newRow.setAttribute("k-scores",`${kGameplay}:${kVisuals}:${kAudio}:${kContent}:${kOverall}`);

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
  let pScore = document.createElement("td");
  pScore.setAttribute("class","rankings-table-p-overall");
  pScore.innerHTML = pOverall;
  let kScore = document.createElement("td");
  kScore.setAttribute("class","rankings-table-k-overall");
  kScore.innerHTML = kOverall;
  
  newRow.appendChild(rankE);
  newRow.appendChild(titleE);
  newRow.appendChild(overallE);
  newRow.appendChild(gameplayE);
  newRow.appendChild(aestheticsE);
  newRow.appendChild(contentE);
  newRow.appendChild(pScore);
  newRow.appendChild(kScore);
  table.appendChild(newRow);

  newRowInfo = document.createElement("tr");
  newRowInfo.setAttribute("class","rankings-table-row-info");

  infoData = document.createElement("td");
  infoData.setAttribute("class","rankings-table-info");
  infoData.setAttribute("colspan","8");
  addInfo(infoData,title);

  newRowInfo.appendChild(infoData);
  table.appendChild(newRowInfo);
}

function addInfo(infoData,title){
  pChartEle = document.createElement("div");
  pChartEle.className = "peteChart";

  let header = document.createElement("h2")
  header.innerHTML = "Peter's Scores";
  let t = document.createElement("p")
  t.innerHTML = title;

  pChartEle.appendChild(header);
  pChartEle.appendChild(t);
  infoData.appendChild(pChartEle);
}

function selectGame(ele){
  expand(ele);
  let pData = ele.getAttribute("p-scores").split(":");
  let kData = ele.getAttribute("k-scores").split(":");

  //setPeteChart(pData[0],pData[1],pData[2],pData[3],pData[4]);
  //setKevChart(kData[0],kData[1],kData[2],kData[3],kData[4]);
}