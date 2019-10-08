function createRankingsChart(title,gameplay,visuals,audio,content,overall){

	let statClass = "stat-category";
	let rankClass = "rank";
	let progressClass = "progress";
	let overallClass = "overall";
	let overallProgressClass = "overall-progress";

	//Create main elements
	let chartEle = document.createElement("div");
	chartEle.className = "chart";
  
	let header = document.createElement("h3")
	header.innerHTML = title;
  
	chartEle.appendChild(header);
  
	//Overall
	let statOverall = document.createElement("p");
	statOverall.className = statClass;
	statOverall.innerHTML = `Overall: ${overall}/100`; 
  
	let rankOverall = document.createElement("div");
	rankOverall.className = rankClass + ` ${overallClass}`;
	
	let progressOverall = document.createElement("div");
	progressOverall.className = progressClass + ` ${overallProgressClass}`;
	progressOverall.style.width = overall + "%";
  
	rankOverall.appendChild(progressOverall);
  
	//Gameplay
	let statGameplay = document.createElement("p");
	statGameplay.className = statClass;
	statGameplay.innerHTML = `Gameplay: ${gameplay}/100`; 
  
	let rankGameplay = document.createElement("div");
	rankGameplay.className = rankClass;
	
	let progressGameplay = document.createElement("div");
	progressGameplay.className = progressClass;
	progressGameplay.style.width = gameplay + "%";
  
	rankGameplay.appendChild(progressGameplay);
  
	//Visuals
	let statVisuals = document.createElement("p");
	statVisuals.className = statClass;
	statVisuals.innerHTML = `Visuals: ${visuals}/100`; 
  
	let rankVisuals = document.createElement("div");
	rankVisuals.className = rankClass;
	
	let progressVisuals = document.createElement("div");
	progressVisuals.className = progressClass;
	progressVisuals.style.width = visuals + "%";
  
	rankVisuals.appendChild(progressVisuals);
  
	//Audio
	let statAudio = document.createElement("p");
	statAudio.className = statClass;
	statAudio.innerHTML = `Audio: ${audio}/100`; 
  
	let rankAudio = document.createElement("div");
	rankAudio.className = rankClass;
	
	let progressAudio = document.createElement("div");
	progressAudio.className = progressClass;
	progressAudio.style.width = audio + "%";
  
	rankAudio.appendChild(progressAudio);
  
	//Content
	let statContent = document.createElement("p");
	statContent.className = statClass;
	statContent.innerHTML = `Content: ${content}/100`; 
  
	let rankContent = document.createElement("div");
	rankContent.className = rankClass;
	
	let progressContent = document.createElement("div");
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
		let sibling = <HTMLElement> nodes[i].nextSibling;
		let charts = sibling.getElementsByClassName("charts")[0];

		if (nodes[i] === ele && nodes[i].className != "rankings-table-row selected"){
			//Mark the two rows as selected
			nodes[i].classList.add("selected");
			sibling.classList.add("expanded");

			//Set individual charts to expand
			charts.classList.add("expanded-breakdown");
			continue;
		}
		
		//Mark the two rows as unselected
		nodes[i].classList.remove("selected");
		sibling.classList.remove("expanded");

		//Minimize individual charts
		charts.classList.remove("expanded-breakdown");
	}
}

function unselectAll(){
	let selected = document.getElementsByClassName("selected");
	for(let i = 0; i < selected.length; i++){
		selected[i].classList.remove("selected");
	}

	let expanded = document.getElementsByClassName("expanded");
	for(let i = 0; i < expanded.length; i++){
		expanded[i].classList.remove("expanded");
	}

	let breakdown = document.getElementsByClassName("expanded-breakdown");
	for(let i = 0; i < breakdown.length; i++){
		breakdown[i].classList.remove("expanded-breakdown");
	}
}