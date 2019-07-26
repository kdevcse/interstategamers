function setPeteChart(gameplay,visuals,audio,content,overall){
	
}

function setKevChart(gameplay,visuals,audio,content,overall){
	
}

function expand(ele){
	let table = document.getElementById("rankings-table");
	let nodes = table.getElementsByClassName("rankings-table-row");

	for(let i = 0; i < nodes.length; i++){
		let charts = nodes[i].nextSibling.getElementsByClassName("charts")[0];
		let pRanks = nodes[i].nextSibling.getElementsByClassName("p-rank");
		let kRanks = nodes[i].nextSibling.getElementsByClassName("k-rank");

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