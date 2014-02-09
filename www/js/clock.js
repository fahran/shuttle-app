function startClock() {
	var currentdate = new Date();
	document.getElementById("time").innerHTML = currentdate;
}

function init() {
	alert("triggered");
	startClock();
}

window.onload = init

