//Handle scroll icons
window.addEventListener('scroll', function () { checkScrollIndicators() });
window.addEventListener('resize', function () { checkScrollIndicators() });
window.addEventListener('load', function () { loadData() });

function checkScrollIndicators() {
	let pos = window.scrollX;
	let indicators = document.getElementById("scroll-indicators");
	let left = document.getElementById("scroll-indicator-left");
	let right = document.getElementById("scroll-indicator-right");

	let maxWidth = document.documentElement.scrollWidth - document.documentElement.clientWidth;

	if (pos > 0) {
		left.style.visibility = "visible";
	} else if (pos === 0) {
		left.style.visibility = "hidden";
	}

	if (pos === maxWidth) {
		right.style.visibility = "hidden";
	} else {
		right.style.visibility = "visible";
	}

	if (pos === maxWidth && pos === 0) {
		indicators.style.visibility = "hidden";
	}
	else {
		indicators.style.visibility = "visible";
	}
}

function loadData() {
	//Get data from server json file
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let data = JSON.parse(this.responseText);
			//Sort by rank and insert each row into the table
			sortEpisodesByRank(data);
			for (let i = 0; i < data.length; i++) {
				tableInsert(data[i]);
			}
			//Add event listener to search box
			let searchBox = document.getElementById("options-searchbox");
			searchBox.addEventListener("input", function () { search(<HTMLTextAreaElement>this) });
			searchBox.addEventListener("change", function () { search(<HTMLTextAreaElement>this) });
			checkScrollIndicators();
		}
	};
	xmlhttp.open("GET", "../database/data.json", true);
	xmlhttp.send();
}

function sortEpisodesByRank(episodes: any) {
	for (let i = 0; i < episodes.length; i++) {
		if (!episodes[i]["Rank"]) {
			episodes.splice(i, 1);
			i -= 1;
		}
	}
	episodes.sort(function (a: any, b: any) {
		return Number(b["Rank"]) - Number(a["Rank"]);
	});
	episodes.reverse();
	return episodes;
}

function resetTableRows(saveId: string) {
	let table = <HTMLTableElement>document.getElementById("rankings-table");
	let rows = table.rows;

	//reset ascending attributes
	let headers = rows[0].getElementsByTagName("th");
	for (let h = 0; h < headers.length; h++) {
		if (headers[h].id === saveId && headers[h].classList.contains("sorted"))
			break;

		if (headers[h].classList.contains("descender"))
			headers[h].setAttribute("ascending", "");
		else
			headers[h].removeAttribute("ascending");
	}

	//reset sorted class
	for (let i = 0; i < (rows.length); i++) {
		let sorts = rows[i].getElementsByClassName("sorted");
		for (let j = 0; j < sorts.length; j++) {
			sorts[j].classList.remove("sorted");
		}
	}
}

function sortTableByCategory(ele: HTMLElement, category: string) {
	//Set row to sorted class identifier
	resetTableRows(ele.id);
	ele.classList.add("sorted");

	let canSwitch = true;
	let table = <HTMLTableElement>document.getElementById("rankings-table").childNodes[1];
	let rows = table.rows;
	let ascending = ele.getAttribute("ascending") !== null;
	let sortIcon = ele.getElementsByTagName("svg")[0];

	if (!ascending) {
		ele.setAttribute("ascending", "");
		sortIcon.classList.remove("fa-sort-down");
		sortIcon.classList.add("fa-sort-up");
	}
	else if (ascending) {
		ele.removeAttribute("ascending");
		sortIcon.classList.remove("fa-sort-up");
		sortIcon.classList.add("fa-sort-down");
	}

	//Swap sort algorithm
	while (canSwitch) {
		canSwitch = false;
		for (let i = 2; i < rows.length; i++) {
			if (rows[i].className.includes("rankings-row-info") || !rows[i + 2])
				continue;

			let x = rows[i].getElementsByClassName(`rankings-table-${category}`)[0];
			x.setAttribute("class", `rankings-table-${category} sorted`);
			let y = rows[i + 2].getElementsByClassName(`rankings-table-${category}`)[0];
			y.setAttribute("class", `rankings-table-${category} sorted`);
			if (!ascending && Number(x.innerHTML) > Number(y.innerHTML)) {
				canSwitch = true;
				table.insertBefore(rows[i + 2], rows[i]);
				table.insertBefore(rows[i + 3], rows[i + 1]);
				break;
			}
			else if (ascending && Number(x.innerHTML) < Number(y.innerHTML)) {
				canSwitch = true;
				table.insertBefore(rows[i + 2], rows[i]);
				table.insertBefore(rows[i + 3], rows[i + 1]);
				break;
			}
		}
	}
}

function sortTableByName(ele: HTMLElement, type: string) {
	//Set row to sorted class identifier
	resetTableRows(ele.id);
	ele.classList.add("sorted");

	let canSwitch = true;
	let table = <HTMLTableElement>document.getElementById("rankings-table").childNodes[1];
	let rows = table.rows;
	let ascending = ele.getAttribute("ascending") !== null;
	let sortIcon = ele.getElementsByTagName("svg")[0];

	if (!ascending) {
		ele.setAttribute("ascending", "");
		sortIcon.classList.remove("fa-sort-down");
		sortIcon.classList.add("fa-sort-up");
	}
	else if (ascending) {
		ele.removeAttribute("ascending");
		sortIcon.classList.remove("fa-sort-up");
		sortIcon.classList.add("fa-sort-down");
	}

	//Swap sort algorithm
	while (canSwitch) {
		canSwitch = false;
		for (let i = 2; i < rows.length; i++) {
			if (rows[i].className.includes("rankings-row-info") || !rows[i + 2])
				continue;

			let x = rows[i].getElementsByClassName(`rankings-table-${type}`)[0];
			x.setAttribute("class", `rankings-table-${type} sorted`);
			let y = rows[i + 2].getElementsByClassName(`rankings-table-${type}`)[0];
			y.setAttribute("class", `rankings-table-${type} sorted`);
			if (ascending && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				canSwitch = true;
				table.insertBefore(rows[i + 2], rows[i]);
				table.insertBefore(rows[i + 3], rows[i + 1]);
				break;
			}
			else if (!ascending && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				canSwitch = true;
				table.insertBefore(rows[i + 2], rows[i]);
				table.insertBefore(rows[i + 3], rows[i + 1]);
				break;
			}
		}
	}
}

//Insert Game Information into table
function tableInsert(game: any) {
	//Make sure game has ranking information
	if (!game["Ranking Info"]) {
		return;
	}

	const table = <HTMLTableElement>document.getElementById("rankings-table");
	const data = new GameRankings(game);
	const breakdown = new GameBreakdown(game);

	data.insertInTable(table);
	breakdown.insertInTable(table);
}

function search(searchbox: HTMLTextAreaElement) {
	unselectAll();
	let txt = searchbox.value.toLowerCase();
	let table = document.getElementById("rankings-table").childNodes[1].childNodes;
	for (let i = 0; i < table.length; i++) {
		let row = <HTMLElement>table[i];
		if (row.className && row.className.includes("rankings-table-row")) {
			let data = row.getElementsByTagName("td");
			let save = false;
			for (let j = 0; j < data.length; j++) {
				if (data[j].innerText.toLowerCase().includes(txt))
					save = true;
			}
			if (save)
				row.style.display = "table-row";
			else
				row.style.display = "none";
		}
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

class GameRankings {
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

class GameBreakdown {
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

class GameData {
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

class GameCritic{
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
