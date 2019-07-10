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

function sortTableByTitle(ele, ascending){
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
  //Make sure game has ranking information
  if(!game["Ranking Info"]){
    return;
  }

  let table = document.getElementById("rankings-table");

  //Get data for the new row
  let rank = game["Rank"];
  let title = game["Ranking Info"]["Game"];
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
  infoData.setAttribute("colspan","8");
  addInfo(infoData,game);

  //Append game breakdown to table
  newRowInfo.appendChild(infoData);
  //table.appendChild(newRowInfo);
}

function addInfo(infoData,game){
  let statClass = "stat-category";
  let pRankClass = "p-rank";
  let kRankClass = "k-rank";
  let pProgressClass = "p-progress";
  let kProgressClass = "k-progress";
  let overallClass = "overall";
  let overallProgressClass = "overall-progress";

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

  //Create pete elements
  pChartEle = document.createElement("div");
  pChartEle.className = "peteChart";

  let pHeader = document.createElement("h2")
  pHeader.innerHTML = "Peter's Scores";

  pChartEle.appendChild(pHeader);

  //Overall
  pStatOverall = document.createElement("p");
  pStatOverall.className = statClass;
  pStatOverall.innerHTML = `Overall: ${pOverall}/100`; 

  pRankOverall = document.createElement("div");
  pRankOverall.className = pRankClass + ` ${overallClass}`;
  
  pProgressOverall = document.createElement("div");
  pProgressOverall.className = pProgressClass + ` ${overallProgressClass}`;
  pProgressOverall.style.width = pOverall + "%";

  pRankOverall.appendChild(pProgressOverall);

  //Gameplay
  pStatGameplay = document.createElement("p");
  pStatGameplay.className = statClass;
  pStatGameplay.innerHTML = `Gameplay: ${pGameplay}/100`; 

  pRankGameplay = document.createElement("div");
  pRankGameplay.className = pRankClass;
  
  pProgressGameplay = document.createElement("div");
  pProgressGameplay.className = pProgressClass;
  pProgressGameplay.style.width = pGameplay + "%";

  pRankGameplay.appendChild(pProgressGameplay);

  //Visuals
  pStatVisuals = document.createElement("p");
  pStatVisuals.className = statClass;
  pStatVisuals.innerHTML = `Visuals: ${pVisuals}/100`; 

  pRankVisuals = document.createElement("div");
  pRankVisuals.className = pRankClass;
  
  pProgressVisuals = document.createElement("div");
  pProgressVisuals.className = pProgressClass;
  pProgressVisuals.style.width = pVisuals + "%";

  pRankVisuals.appendChild(pProgressVisuals);

  //Audio
  pStatAudio = document.createElement("p");
  pStatAudio.className = statClass;
  pStatAudio.innerHTML = `Audio: ${pAudio}/100`; 

  pRankAudio = document.createElement("div");
  pRankAudio.className = pRankClass;
  
  pProgressAudio = document.createElement("div");
  pProgressAudio.className = pProgressClass;
  pProgressAudio.style.width = pAudio + "%";

  pRankAudio.appendChild(pProgressAudio);

  //Content
  pStatContent = document.createElement("p");
  pStatContent.className = statClass;
  pStatContent.innerHTML = `Content: ${pContent}/100`; 

  pRankContent = document.createElement("div");
  pRankContent.className = pRankClass;
  
  pProgressContent = document.createElement("div");
  pProgressContent.className = pProgressClass;
  pProgressContent.style.width = pContent + "%";

  pRankContent.appendChild(pProgressContent);

  //Append elements
  pChartEle.appendChild(pStatOverall);
  pChartEle.appendChild(pRankOverall);
  pChartEle.appendChild(pStatGameplay);
  pChartEle.appendChild(pRankGameplay);
  pChartEle.appendChild(pStatVisuals);
  pChartEle.appendChild(pRankVisuals);
  pChartEle.appendChild(pStatAudio);
  pChartEle.appendChild(pRankAudio);
  pChartEle.appendChild(pStatContent);
  pChartEle.appendChild(pRankContent);

  
  //Create kev elements
  kChartEle = document.createElement("div");
  kChartEle.className = "kevChart";

  let kHeader = document.createElement("h2")
  kHeader.innerHTML = "Kevin's Scores";

  kChartEle.appendChild(kHeader);

  //Overall
  kStatOverall = document.createElement("p");
  kStatOverall.className = statClass;
  kStatOverall.innerHTML = `Overall: ${kOverall}/100`; 

  kRankOverall = document.createElement("div");
  kRankOverall.className = kRankClass + ` ${overallClass}`;
  
  kProgressOverall = document.createElement("div");
  kProgressOverall.className = kProgressClass + ` ${overallProgressClass}`;
  kProgressOverall.style.width = kOverall + "%";

  kRankOverall.appendChild(kProgressOverall);

  //Gameplay
  kStatGameplay = document.createElement("p");
  kStatGameplay.className = statClass;
  kStatGameplay.innerHTML = `Gameplay: ${kGameplay}/100`; 

  kRankGameplay = document.createElement("div");
  kRankGameplay.className = kRankClass;
  
  kProgressGameplay = document.createElement("div");
  kProgressGameplay.className = kProgressClass;
  kProgressGameplay.style.width = kGameplay + "%";

  kRankGameplay.appendChild(kProgressGameplay);

  //Visuals
  kStatVisuals = document.createElement("p");
  kStatVisuals.className = statClass;
  kStatVisuals.innerHTML = `Visuals: ${kVisuals}/100`; 

  kRankVisuals = document.createElement("div");
  kRankVisuals.className = kRankClass;
  
  kProgressVisuals = document.createElement("div");
  kProgressVisuals.className = kProgressClass;
  kProgressVisuals.style.width = kVisuals + "%";

  kRankVisuals.appendChild(kProgressVisuals);

  //Audio
  kStatAudio = document.createElement("p");
  kStatAudio.className = statClass;
  kStatAudio.innerHTML = `Audio: ${kAudio}/100`; 

  kRankAudio = document.createElement("div");
  kRankAudio.className = kRankClass;
  
  kProgressAudio = document.createElement("div");
  kProgressAudio.className = kProgressClass;
  kProgressAudio.style.width = kAudio + "%";

  kRankAudio.appendChild(kProgressAudio);

  //Content
  kStatContent = document.createElement("p");
  kStatContent.className = statClass;
  kStatContent.innerHTML = `Content: ${kContent}/100`; 

  kRankContent = document.createElement("div");
  kRankContent.className = kRankClass;
  
  kProgressContent = document.createElement("div");
  kProgressContent.className = kProgressClass;
  kProgressContent.style.width = kContent + "%";

  kRankContent.appendChild(kProgressContent);

  //Append elements
  kChartEle.appendChild(kStatOverall);
  kChartEle.appendChild(kRankOverall);
  kChartEle.appendChild(kStatGameplay);
  kChartEle.appendChild(kRankGameplay);
  kChartEle.appendChild(kStatVisuals);
  kChartEle.appendChild(kRankVisuals);
  kChartEle.appendChild(kStatAudio);
  kChartEle.appendChild(kRankAudio);
  kChartEle.appendChild(kStatContent);
  kChartEle.appendChild(kRankContent);

  //Append Kev and Pete breakdown
  infoData.appendChild(pChartEle);
  infoData.appendChild(kChartEle);
}
