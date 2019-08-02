function createRankingsChart(title,gameplay,visuals,audio,content,overall){

	let statClass = "stat-category";
	let rankClass = "rank";
	let progressClass = "progress";
	let overallClass = "overall";
	let overallProgressClass = "overall-progress";

	//Create main elements
	chartEle = document.createElement("div");
	chartEle.className = "chart";
  
	let header = document.createElement("h3")
	header.innerHTML = title;
  
	chartEle.appendChild(header);
  
	//Overall
	statOverall = document.createElement("p");
	statOverall.className = statClass;
	statOverall.innerHTML = `Overall: ${overall}/100`; 
  
	rankOverall = document.createElement("div");
	rankOverall.className = rankClass + ` ${overallClass}`;
	
	progressOverall = document.createElement("div");
	progressOverall.className = progressClass + ` ${overallProgressClass}`;
	progressOverall.style.width = overall + "%";
  
	rankOverall.appendChild(progressOverall);
  
	//Gameplay
	statGameplay = document.createElement("p");
	statGameplay.className = statClass;
	statGameplay.innerHTML = `Gameplay: ${gameplay}/100`; 
  
	rankGameplay = document.createElement("div");
	rankGameplay.className = rankClass;
	
	progressGameplay = document.createElement("div");
	progressGameplay.className = progressClass;
	progressGameplay.style.width = gameplay + "%";
  
	rankGameplay.appendChild(progressGameplay);
  
	//Visuals
	statVisuals = document.createElement("p");
	statVisuals.className = statClass;
	statVisuals.innerHTML = `Visuals: ${visuals}/100`; 
  
	rankVisuals = document.createElement("div");
	rankVisuals.className = rankClass;
	
	progressVisuals = document.createElement("div");
	progressVisuals.className = progressClass;
	progressVisuals.style.width = visuals + "%";
  
	rankVisuals.appendChild(progressVisuals);
  
	//Audio
	statAudio = document.createElement("p");
	statAudio.className = statClass;
	statAudio.innerHTML = `Audio: ${audio}/100`; 
  
	rankAudio = document.createElement("div");
	rankAudio.className = rankClass;
	
	progressAudio = document.createElement("div");
	progressAudio.className = progressClass;
	progressAudio.style.width = audio + "%";
  
	rankAudio.appendChild(progressAudio);
  
	//Content
	statContent = document.createElement("p");
	statContent.className = statClass;
	statContent.innerHTML = `Content: ${content}/100`; 
  
	rankContent = document.createElement("div");
	rankContent.className = rankClass;
	
	progressContent = document.createElement("div");
	progressContent.className = progressClass;
	progressContent.style.width = content + "%";
  
	rankContent.appendChild(progressContent);
  
	//Append elements
	chartEle.appendChild(statOverall);
	chartEle.appendChild(rankOverall);
	chartEle.appendChild(statGameplay);
	chartEle.appendChild(rankGameplay);
	chartEle.appendChild(statVisuals);
	chartEle.appendChild(rankVisuals);
	chartEle.appendChild(statAudio);
	chartEle.appendChild(rankAudio);
	chartEle.appendChild(statContent);
	chartEle.appendChild(rankContent);
	return chartEle;
}

function expand(ele){
	let table = document.getElementById("rankings-table");
	let nodes = table.getElementsByClassName("rankings-table-row");

	for(let i = 0; i < nodes.length; i++){
		let charts = nodes[i].nextSibling.getElementsByClassName("charts")[0];

		if (nodes[i] === ele && nodes[i].className != "rankings-table-row selected"){
			//Mark the two rows as selected
			nodes[i].classList.add("selected");
			nodes[i].nextSibling.classList.add("expanded");

			//Set individual charts to expand
			charts.classList.add("expanded-breakdown");
			continue;
		}
		
		//Mark the two rows as unselected
		nodes[i].className = "rankings-table-row";
		nodes[i].nextSibling.className = "rankings-table-row-info"

		//Minimize individual charts
		charts.classList.remove("expanded-breakdown");
	}
}