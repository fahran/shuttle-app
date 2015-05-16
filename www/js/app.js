function isImminent(time) {
	return time.isLessThan(new Time(0,5,0));
}

function setUp() {
	var busDataElement = document.getElementById("busData");
	var stationToBathRoadBusService = new BusTimeService(busData[0].times.outbound);
    var bathRoadToStationBusService = new BusTimeService(busData[0].times.return);
    var busService = bathRoadToStationBusService

    var busTimes = busService.getTimes();
    renderBusTimes(busTimes);

    setInterval(function() {
    	var currentTime = new Time.parseDate(new Date());
    	var model = populateModel(busService, currentTime, busTimes);
    	render(model);
    }, 500);
}
window.setUp = setUp;

function populateModel(busService, currentTime) {
	var nextBusTime = busService.nextBusAfter(currentTime);
	var timeToNextBus = currentTime.timeUntil(nextBusTime);
	var imminent = isImminent(timeToNextBus);
	return {nextBusTime: nextBusTime.toSimpleTime(),
			timeToNextBus: timeToNextBus.toString(),
			imminent: imminent}
}

function renderBusTimes(busTimes) {
	for (i in busTimes) {
		var liNode = document.createElement("li");
		var timeNode = document.createElement("time");
		timeNode.innerHTML = busTimes[i];
		liNode.appendChild(timeNode);
		// liNode.className = "swiper-slide";
		document.getElementById("busTimes").appendChild(liNode)
	}	
}

function render(model) {
	document.querySelector("#timeToNextBus time").innerHTML = model.timeToNextBus;
	if (model.imminent) {
		document.getElementById("timeToNextBus").classList.add("imminent");	
	} else {
		document.getElementById("timeToNextBus").classList.remove("imminent");	
	}

	var nextTimeListItem = document.getElementById("nextBusTime");
	var currentNextTime = document.querySelectorAll("#nextBusTime time");
	
	if (currentNextTime == null || currentNextTime.innerHTML !== model.nextBusTime) {

		if (nextTimeListItem != null) {
			nextTimeListItem.removeAttribute("id");
		};
				
		var listItems = document.querySelectorAll("#busTimes li");
		for (var i in listItems) {
			if (listItems[i].innerHTML == "<time>" + model.nextBusTime + "</time>") {
				listItems[i].id = "nextBusTime";
				break;
			}
		}
	
		var busTimes = document.getElementById("busTimes");
		var nextTime = document.getElementById("nextBusTime");
		if (nextTime != null) {
			document.getElementById("busTimes").style.marginLeft = busTimes.offsetLeft - nextTime.offsetLeft + "px";	
		}
	}
}

