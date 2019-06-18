function setPeteChart(gameplay,visuals,audio,content,overall){
	
}

function setKevChart(gameplay,visuals,audio,content,overall){
	
}

function expand(ele){
	let table = document.getElementById("rankings-table");
	let nodes = table.getElementsByClassName("rankings-table-row");

	for(let i = 0; i < nodes.length; i++){
		let pBreakdown = nodes[i].nextSibling.getElementsByClassName("peteChart")[0];
		let pRanks = nodes[i].nextSibling.getElementsByClassName("p-rank");
		let kBreakdown = nodes[i].nextSibling.getElementsByClassName("kevChart")[0];
		let kRanks = nodes[i].nextSibling.getElementsByClassName("k-rank");

		if (nodes[i] === ele && nodes[i].className != "rankings-table-row selected"){
			//Mark the two rows as selected
			nodes[i].className = "rankings-table-row selected";
			nodes[i].nextSibling.className = "rankings-table-row-info expanded"

			//Set individual charts to expand
			pBreakdown.className = "peteChart expanded-breakdown";
			kBreakdown.className = "kevChart expanded-breakdown";

			//Set ranking categories to expand
			for(let j = 0; j < pRanks.length; j++){
				if (pRanks[j].className.includes("overall")){
					pRanks[j].className = "p-rank expanded-rank overall";
					continue;
				}
				pRanks[j].className = "p-rank expanded-rank";
			}
			
			for(let j = 0; j < kRanks.length; j++){
				if (kRanks[j].className.includes("overall")){
					kRanks[j].className = "k-rank expanded-rank overall";
					continue;
				}
				kRanks[j].className = "k-rank expanded-rank";
			}
			continue;
		}
		
		//Mark the two rows as unselected
		nodes[i].className = "rankings-table-row";
		nodes[i].nextSibling.className = "rankings-table-row-info"

		//Minimize individual charts
		pBreakdown.className = "peteChart";
		kBreakdown.className = "kevChart";

		//Minimize ranking categories
		for(let j = 0; j < pRanks.length; j++){
			if (pRanks[j].className.includes("overall")){
				pRanks[j].className = "p-rank overall";
				continue;
			}
			pRanks[j].className = "p-rank";
		}

		for(let j = 0; j < kRanks.length; j++){
			if (kRanks[j].className.includes("overall")){
				kRanks[j].className = "k-rank overall";
				continue;
			}
			kRanks[j].className = "k-rank";
		}
	}
}