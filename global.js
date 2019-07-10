function menuDropdown(){
	let nav = document.getElementById("mobile-nav-list");
	let icon = document.getElementById("mobile-nav-icon");
	if (nav.style.display === "block") {
	  nav.style.display = "none";
	  icon.classList.remove("fa-times");
	  icon.classList.add("fa-bars");
	} else {
	  nav.style.display = "block";
	  icon.classList.remove("fa-bars");
	  icon.classList.add("fa-times");
	}
}