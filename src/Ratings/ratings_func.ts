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

function sortTableByCategory(ele: HTMLElement, category: string) {
	//Set row to sorted class identifier
	resetTableRows(ele.id);
	ele.classList.add("sorted");

	let canSwitch = true;
	let table = <HTMLTableElement> document.getElementById("rankings-table").childNodes[1];
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