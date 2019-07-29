function loadData(){
  //Get data from server json file
  let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      //Sort by rank and insert each row into the table
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
	sorts[j].classList.remove("sorted");
    }
  }
}

function sortTableByCategory(ele,category, ascending){
  //Set row to sorted class identifier
  removeSortedAttribute();
  ele.classList.add("sorted");

  let canSwitch = true;
  let table = document.getElementById("rankings-table").childNodes[1];
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

function sortTableByName(ele, ascending, type){
  //Set row to sorted class identifier
  removeSortedAttribute();
  ele.classList.add("sorted");

  let canSwitch = true;
  let table = document.getElementById("rankings-table").childNodes[1];
  let rows = table.rows;

  //Swap sort algorithm
  while(canSwitch){
    canSwitch = false;
    for(let i = 1; i < rows.length; i++){
      if(rows[i].className.includes("rankings-table-row-info") || !rows[i+2])
        continue;
        
      x = rows[i].getElementsByClassName(`rankings-table-${type}`)[0];
      x.setAttribute("class",`rankings-table-${type} sorted`);
      y = rows[i + 2].getElementsByClassName(`rankings-table-${type}`)[0];
      y.setAttribute("class",`rankings-table-${type} sorted`);
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
  //Make sure game has ranking information
  if(!game["Ranking Info"]){
    return;
  }

  let table = document.getElementById("rankings-table");

  //Get data for the new row
  let rank = game["Rank"];
  let title = game["Ranking Info"]["Game"];
  let year = game["Ranking Info"]["Year"];
  let platform = game["Ranking Info"]["Platform"];
  let overall = game["Ranking Info"]["IG Score"].toFixed(2);
  let gameplay = game["Ranking Info"]["Gameplay"].toFixed(2);
  let aesthetics = game["Ranking Info"]["Aesthetics"].toFixed(2);
  let content = game["Ranking Info"]["Content"].toFixed(2);
  let pOverall = game["Ranking Info"]["Peter's Rating"].toFixed(2);
  let kOverall = game["Ranking Info"]["Kevin's Rating"].toFixed(2);


  //Initialize the new row
  let newRow = table.insertRow(-1);
  newRow.setAttribute("class","rankings-table-row");
  newRow.setAttribute("game",title);
  newRow.addEventListener("click",function(){expand(this)});

  //Create table data elements
  let rankE = document.createElement("td");
  rankE.setAttribute("class","rankings-table-rank sorted");
  rankE.innerHTML = rank;
  let titleE = document.createElement("td");
  titleE.setAttribute("class","rankings-table-title");
  titleE.innerHTML = title;
  titleE.title = title;
  let yearE = document.createElement("td");
  yearE.setAttribute("class","rankings-table-year");
  yearE.innerHTML = year;
  let platformE = document.createElement("td");
  platformE.setAttribute("class","rankings-table-platform");
  platformE.innerHTML = platform;
  platformE.title = platform;
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
  
  //Append table data and row for the game
  newRow.appendChild(rankE);
  newRow.appendChild(titleE);
  newRow.appendChild(yearE);
  newRow.appendChild(platformE);
  newRow.appendChild(overallE);
  newRow.appendChild(gameplayE);
  newRow.appendChild(aestheticsE);
  newRow.appendChild(contentE);
  newRow.appendChild(pScore);
  newRow.appendChild(kScore);
  //table.appendChild(newRow);

  //Initialize game breakdown row
  newRowInfo = table.insertRow(-1);
  newRowInfo.setAttribute("class","rankings-table-row-info");

  //Create table data element for game breakdown
  infoData = document.createElement("td");
  infoData.setAttribute("class","rankings-table-info");
  infoData.setAttribute("colspan","10");
  addInfo(infoData,game);

  //Append game breakdown to table
  newRowInfo.appendChild(infoData);
  //table.appendChild(newRowInfo);
}

function addInfo(infoData,game){
  
  //Gather imperative data
  let pGameplay = game["Ranking Info"]["P. Gameplay"].toFixed(2);
  let pVisuals = game["Ranking Info"]["P. Visuals"].toFixed(2);
  let pAudio = game["Ranking Info"]["P. Audio"].toFixed(2);
  let pContent = game["Ranking Info"]["P. Content"].toFixed(2);
  let pOverall = game["Ranking Info"]["Peter's Rating"].toFixed(2);
  
  let kGameplay = game["Ranking Info"]["K. Gameplay"].toFixed(2);
  let kVisuals = game["Ranking Info"]["K. Visuals"].toFixed(2);
  let kAudio = game["Ranking Info"]["K. Audio"].toFixed(2);
  let kContent = game["Ranking Info"]["K. Content"].toFixed(2);
  let kOverall = game["Ranking Info"]["Kevin's Rating"].toFixed(2);

  pChartEle = createRankingsChart("Peter's Scores",pGameplay,pVisuals,pAudio,pContent,pOverall);
  kChartEle = createRankingsChart("Kevin's Scores",kGameplay,kVisuals,kAudio,kContent,kOverall);

  //Create div container
  var chartContainer = document.createElement("div");
  chartContainer.className = "charts";
  
  //Append Kev and Pete breakdown
  chartContainer.appendChild(pChartEle);
  chartContainer.appendChild(kChartEle);

  //Add guest if needed
  if (game["Ranking Info"]["Guest"]){
    let guest = game["Ranking Info"]["Guest"];
    let gGameplay = game["Ranking Info"]["G. Gameplay"].toFixed(2);
    let gVisuals = game["Ranking Info"]["G. Visuals"].toFixed(2);
    let gAudio = game["Ranking Info"]["G. Audio"].toFixed(2);
    let gContent = game["Ranking Info"]["G. Content"].toFixed(2);
    let gOverall = game["Ranking Info"]["Guest Rating"].toFixed(2);
    gChartEle = createRankingsChart(`${guest}'s Scores`,gGameplay,gVisuals,gAudio,gContent,gOverall);
    chartContainer.appendChild(gChartEle);
  }

  infoData.appendChild(chartContainer);
}
