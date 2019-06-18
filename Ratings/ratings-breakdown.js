function setPeteChart(gameplay,visuals,audio,content,overall){
	
	overallPercent = document.getElementById("pete-overall-progress");
	gameplayPercent = document.getElementById("pete-gameplay-progress");
	visualsPercent = document.getElementById("pete-visuals-progress");
	audioPercent = document.getElementById("pete-audio-progress");
	contentPercent = document.getElementById("pete-content-progress");

	document.getElementById("p-stat-overall").innerHTML = `Overall: ${overall}/100`;
	document.getElementById("p-stat-gameplay").innerHTML = `Gameplay: ${gameplay}/100`;
	document.getElementById("p-stat-visuals").innerHTML = `Visuals: ${visuals}/100`;
	document.getElementById("p-stat-audio").innerHTML = `Audio: ${audio}/100`;
	document.getElementById("p-stat-content").innerHTML = `Content: ${content}/100`;

	overallPercent.style.width = `${overall}%`;
	gameplayPercent.style.width = `${gameplay}%`;
	visualsPercent.style.width = `${visuals}%`;
	audioPercent.style.width = `${audio}%`;
	contentPercent.style.width = `${content}%`;
}

function setKevChart(gameplay,visuals,audio,content,overall){

	overallPercent = document.getElementById("kev-overall-progress");
	gameplayPercent = document.getElementById("kev-gameplay-progress");
	visualsPercent = document.getElementById("kev-visuals-progress");
	audioPercent = document.getElementById("kev-audio-progress");
	contentPercent = document.getElementById("kev-content-progress");

	document.getElementById("k-stat-overall").innerHTML = `Overall: ${overall}/100`;
	document.getElementById("k-stat-gameplay").innerHTML = `Gameplay: ${gameplay}/100`;
	document.getElementById("k-stat-visuals").innerHTML = `Visuals: ${visuals}/100`;
	document.getElementById("k-stat-audio").innerHTML = `Audio: ${audio}/100`;
	document.getElementById("k-stat-content").innerHTML = `Content: ${content}/100`;

	overallPercent.style.width = `${overall}%`;
	gameplayPercent.style.width = `${gameplay}%`;
	visualsPercent.style.width = `${visuals}%`;
	audioPercent.style.width = `${audio}%`;
	contentPercent.style.width = `${content}%`;
}

function expand(ele){
	let table = document.getElementById("rankings-table");
	let nodes = table.getElementsByClassName("rankings-table-row");

	for(let i = 0; i < nodes.length; i++){
		if (nodes[i] === ele && nodes[i].className != "rankings-table-row selected"){
			nodes[i].className = "rankings-table-row selected";
			nodes[i].nextSibling.className = "rankings-table-row-info expanded"
			continue;
		}
		
		nodes[i].className = "rankings-table-row";
		nodes[i].nextSibling.className = "rankings-table-row-info"
	}
}