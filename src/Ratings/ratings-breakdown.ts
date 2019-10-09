class RankingsChart {
	Title: string;
	Overall: string;
	Gameplay: string;
	Visuals: string;
	Audio: string;
	Content: string;

	constructor(title: string, gameplay: string, visuals: string, audio: string, content: string, overall: string){
		this.Title = title;
		this.Gameplay = gameplay;
		this.Visuals = visuals;
		this.Audio = audio;
		this.Content = content;
		this.Overall = overall;
	}

	create(){
		//Create main elements
		let chartEle = document.createElement("div");
		chartEle.className = "chart";
		
		let header = document.createElement("h3")
		header.innerHTML = this.Title;
		
		chartEle.appendChild(header);
		
		const o = new ProgressBar(this.Overall,"Overall");
		const g = new ProgressBar(this.Gameplay,"Gameplay");
		const v = new ProgressBar(this.Visuals,"Visuals");
		const a = new ProgressBar(this.Audio,"Audio");
		const c = new ProgressBar(this.Content,"Content");

		//Append elements
		chartEle.appendChild(o.createHeader());
		chartEle.appendChild(o.createProgressBar());
		chartEle.appendChild(g.createHeader());
		chartEle.appendChild(g.createProgressBar());
		chartEle.appendChild(v.createHeader());
		chartEle.appendChild(v.createProgressBar());
		chartEle.appendChild(a.createHeader());
		chartEle.appendChild(a.createProgressBar());
		chartEle.appendChild(c.createHeader());
		chartEle.appendChild(c.createProgressBar());

		return chartEle;
	}
}

class ProgressBar {

	Value: string;
	Type: string;

	constructor(val: string, type: string){
		this.Value = val;
		this.Type = type;
	}

	createHeader(){
		let stat = document.createElement("p");
		stat.className = "stat-category";

		stat.innerHTML = `${this.Type}: ${this.Value}/100`;
		return stat;
	}

	createProgressBar(){
		let rank = document.createElement("div");
		rank.className = "rank";
		
		let progress = document.createElement("div");
		progress.className = "progress";
		
		if (this.Type === "Overall"){
			rank.classList.add("overall");
			progress.classList.add("overall-progress");
		}

		progress.style.width = this.Value + "%";
	
		rank.appendChild(progress);
		return rank;
	}
}

function expand(ele: HTMLElement){
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