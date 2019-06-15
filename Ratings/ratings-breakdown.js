var pOverallInt;
var pGameplayInt;
var pVisualsInt;
var pAudioInt;
var pContentInt;
var kOverallInt;
var kGameplayInt;
var kVisualsInt;
var kAudioInt;
var kContentInt;

function setPeteChart(gameplay,visuals,audio,content,overall){
	clearInterval(pOverallInt);
    clearInterval(pGameplayInt);
    clearInterval(pVisualsInt);
    clearInterval(pAudioInt);
	clearInterval(pContentInt);
	
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

	pOverallInt = transition(overallPercent,overall);
	pGameplayInt = transition(gameplayPercent,gameplay);
	pVisualsInt = transition(visualsPercent,visuals);
	pAudioInt = transition(audioPercent,audio);
	pContentInt = transition(contentPercent,content);
}

function setKevChart(gameplay,visuals,audio,content,overall){
	clearInterval(kOverallInt);
    clearInterval(kGameplayInt);
    clearInterval(kVisualsInt);
    clearInterval(kAudioInt);
	clearInterval(kContentInt);
	
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

	kOverallInt = transition(overallPercent,overall);
	kGameplayInt = transition(gameplayPercent,gameplay);
	kVisualsInt = transition(visualsPercent,visuals);
	kAudioInt = transition(audioPercent,audio);
	kContentInt = transition(contentPercent,content);
}

function transition(ele,val){
	var contentSlide = setInterval(frame,16.7);
	val = Math.round(val);
	return contentSlide;

	function frame(){
		var width = Number(ele.style.width.substring(0, ele.style.width.length - 1));
		if(	width == val){
			clearInterval(contentSlide);
		} else {
			if (width > val){
				ele.style.width = `${width-1}%`;
			}
			else if (width < val) {
				ele.style.width = `${width+1}%`;
			}
		}
	}
}