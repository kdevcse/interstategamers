export class GameRankings {
	Rank: number;
	Title: string;
	Year: number;
	Platform: string;
	Overall: number;
	Gameplay: number;
	Aesthetics: number;
	Content: number;
	pOverall: number;
	kOverall: number;
	Info: any;

	//Feed JSON data to populate class
	constructor(game: any) {
		this.Rank = game["Rank"];
		this.Title = game["Ranking Info"]["Game"];
		this.Year = game["Ranking Info"]["Year"];
		this.Platform = game["Ranking Info"]["Platform"];
		this.Overall = game["Ranking Info"]["IG Score"].toFixed(2);
		this.Gameplay = game["Ranking Info"]["Gameplay"].toFixed(2);
		this.Aesthetics = game["Ranking Info"]["Aesthetics"].toFixed(2);
		this.Content = game["Ranking Info"]["Content"].toFixed(2);
		this.pOverall = game["Ranking Info"]["Peter's Rating"].toFixed(2);
		this.kOverall = game["Ranking Info"]["Kevin's Rating"].toFixed(2);
		this.Info = game;
	}

	insertInTable(table: HTMLTableElement) {

		let newRow = table.insertRow(-1);
		newRow.setAttribute("class", "rankings-table-row");
		newRow.setAttribute("game", this.Title);
		newRow.addEventListener("click", function () { expand(this) });

		//Create table data elements
		const r = new GameData("rank", `${this.Rank}`);
		const t = new GameData("title", `${this.Title}`, true);
		const titleE = t.create();

		if (this.Info["Ranking Info"]["Guest"]) {
			let icon = document.createElement("i");
			icon.className = "fas fa-user-plus";
			icon.title = "Guest Appearance";
			titleE.innerHTML = this.Title + " &nbsp; ";
			titleE.appendChild(icon);
		}

		const y = new GameData("year", `${this.Year}`);
		const p = new GameData("platform", `${this.Platform}`, true);
		const o = new GameData("overall", `${this.Overall}`);
		const g = new GameData("gameplay", `${this.Gameplay}`);
		const a = new GameData("aesthetics", `${this.Aesthetics}`);
		const c = new GameData("content", `${this.Content}`);
		const po = new GameData("p-overall", `${this.pOverall}`);
		const ko = new GameData("k-overall", `${this.kOverall}`);

		//Append table data and row for the game
		newRow.appendChild(r.create(true));
		newRow.appendChild(titleE);
		newRow.appendChild(y.create());
		newRow.appendChild(p.create());
		newRow.appendChild(o.create());
		newRow.appendChild(g.create());
		newRow.appendChild(a.create());
		newRow.appendChild(c.create());
		newRow.appendChild(po.create());
		newRow.appendChild(ko.create());
	}
}

export class GameBreakdown {
	PeterChart: RankingsChart;
	KevinChart: RankingsChart;
	GuestChart: RankingsChart;
	PublishDate: Date;
	Metacritic: number;
	Ign: number;
	ImageName: string;

	constructor(game: any) {
		//Peter Data
		let pGameplay = game["Ranking Info"]["P. Gameplay"].toFixed(2);
		let pVisuals = game["Ranking Info"]["P. Visuals"].toFixed(2);
		let pAudio = game["Ranking Info"]["P. Audio"].toFixed(2);
		let pContent = game["Ranking Info"]["P. Content"].toFixed(2);
		let pOverall = game["Ranking Info"]["Peter's Rating"].toFixed(2);

		//Kevin Data
		let kGameplay = game["Ranking Info"]["K. Gameplay"].toFixed(2);
		let kVisuals = game["Ranking Info"]["K. Visuals"].toFixed(2);
		let kAudio = game["Ranking Info"]["K. Audio"].toFixed(2);
		let kContent = game["Ranking Info"]["K. Content"].toFixed(2);
		let kOverall = game["Ranking Info"]["Kevin's Rating"].toFixed(2);

		this.PeterChart = new RankingsChart("Peter's Scores", pGameplay, pVisuals, pAudio, pContent, pOverall);
		this.KevinChart = new RankingsChart("Kevin's Scores", kGameplay, kVisuals, kAudio, kContent, kOverall);

		//Guest Data
		if (game["Ranking Info"]["Guest"]) {
			let guest = game["Ranking Info"]["Guest"];
			let gGameplay = game["Ranking Info"]["G. Gameplay"].toFixed(2);
			let gVisuals = game["Ranking Info"]["G. Visuals"].toFixed(2);
			let gAudio = game["Ranking Info"]["G. Audio"].toFixed(2);
			let gContent = game["Ranking Info"]["G. Content"].toFixed(2);
			let gOverall = game["Ranking Info"]["Guest Rating"].toFixed(2);
			this.GuestChart = new RankingsChart(`${guest}'s Scores`, gGameplay, gVisuals, gAudio, gContent, gOverall);
		}

		this.PublishDate = new Date(game["published_at"]);
		this.Metacritic = game["Ranking Info"]["Metacritic"];
		this.Ign = game["Ranking Info"]["IGN"];
		this.ImageName = game["Game Image"];
	}

	insertInTable(table: HTMLTableElement) {
		//Initialize game breakdown row
		let newRowInfo = table.insertRow(-1);
		newRowInfo.setAttribute("class", "rankings-row-info");

		//Create table data element for game breakdown
		let infoData = document.createElement("td");
		infoData.setAttribute("class", "rankings-table-info");
		infoData.setAttribute("colspan", "10");
		infoData.appendChild(this.populate());

		//Append game breakdown to table
		newRowInfo.appendChild(infoData);
	}

	private populate() {
		//Create div container
		var chartContainer = document.createElement("div");
		chartContainer.className = "charts";

		//Append Kev and Pete breakdown
		chartContainer.appendChild(this.createInfo());
		chartContainer.appendChild(this.PeterChart.create());
		chartContainer.appendChild(this.KevinChart.create());

		//Add guest if needed
		if(this.GuestChart){
			chartContainer.appendChild(this.GuestChart.create());
		}

		return chartContainer;
	}

	private createInfo() {
		//Create Info Div
		let info = document.createElement("div");
		info.className = "breakdown-info";
		let day = document.createElement("p");
		day.className = "breakdown-day";
		day.innerText = `Reviewed: ${this.PublishDate.getMonth() + 1}/${this.PublishDate.getDate()}/${this.PublishDate.getFullYear()}`;
		info.appendChild(day);

		//Show img if needed
		if (this.ImageName) {
			let img = document.createElement("img");
			img.classList.add("breakdown-img");
			let name = this.ImageName;
			img.src = `../Images/${name}`;
			info.appendChild(img);
		}

		//Create Metacritic Scores
		let scores = document.createElement("div");
		scores.className = "breakdown-scores";

		//Metacritic
		const metaDiv = new GameCritic("Metacritic",this.Metacritic,"MetaLogo.png").createElement();
		scores.appendChild(metaDiv);

		//IGN
		const ignDiv = new GameCritic("IGN",this.Ign,"IgnLogo.png").createElement();
		scores.appendChild(ignDiv);

		info.appendChild(scores);
		return info;
	}
}

export class RankingsChart {
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

export class ProgressBar {

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

export class GameData {
	Type: string;
	Value: string;
	IncludeTitle: boolean;

	constructor(type: string, val: string, includeTitle: boolean = false) {
		this.Type = type.toLowerCase();
		this.Value = val;
		this.IncludeTitle = includeTitle;
	}

	create(sort: boolean = false) {
		let tableData = document.createElement("td");
		tableData.classList.add(`rankings-table-${this.Type}`);
		tableData.innerHTML = this.Value;
		if (sort) {
			tableData.classList.add("sorted");
		}
		if (this.IncludeTitle) {
			tableData.title = this.Value;
		}
		return tableData;
	}
}

export class GameCritic{
	Score: number;
	ContainerClass: string;
	ImageName: string;
	ImageClass: string;
	Title: string;
	TextClass: string;

	constructor(title: string, score: number, imageName: string){
		this.Score = score;
		this.ImageName = imageName;
		this.Title = title;
		if(this.Title.toLowerCase() === "metacritic"){
			this.ContainerClass = "meta-container";
			this.ImageClass = "meta-logo";
			this.TextClass = "meta-score";
		} else if (this.Title.toLowerCase() === "ign"){
			this.ContainerClass = "ign-container";
			this.ImageClass = "ign-logo";
			this.TextClass = "ign-score";
		}
	}

	createElement(){
		let criticContainer = document.createElement("div");
		criticContainer.className = this.ContainerClass;
		criticContainer.title = `${this.Title} Score`;
		let logo = document.createElement("img");
		logo.src = `../Images/${this.ImageName}`;
		logo.className = this.ImageClass;
		let span = document.createElement("span");
		span.className = this.TextClass;
		span.innerText = `${this.Score}`;
		criticContainer.appendChild(logo);
		criticContainer.appendChild(span);
		return criticContainer;
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