function isImminent(time) {
	return time.isLessThan(new Time(0,5,0));
}

function setUp() {
	var busDataElement = document.getElementById("busData");
	var stationToBathRoadBusService = new BusTimeService(busData[0].times.outbound);
    var bathRoadToStationBusService = new BusTimeService(busData[0].times.return);
    var busService = bathRoadToStationBusService

    var busTimes = busService.getTimes();

    setInterval(function() {
    	var currentTime = new Time.parseDate(new Date());
    	var model = populateModel(busService, currentTime, busTimes);
    	render(model);
    }, 500);
}
window.setUp = setUp;

function populateModel(busService, currentTime, busTimes) {
	var nextBusTime = busService.nextBusAfter(currentTime);
	var timeToNextBus = currentTime.timeUntil(nextBusTime);
	var imminent = isImminent(timeToNextBus);
	return {nextBusTime: nextBusTime.toSimpleTime(),
			timeToNextBus: timeToNextBus.toString(),
			imminent: imminent,
			busTimes: busTimes}
}

function render(model) {
	document.querySelector("#timeToNextBus time").innerHTML = model.timeToNextBus;
	if (model.imminent) {
		document.getElementById("timeToNextBus").classList.add("imminent");	
	} else {
		document.getElementById("timeToNextBus").classList.remove("imminent");	
	}

	for (i in model.busTimes) {
		var liNode = document.createElement("li");
		var timeNode = document.createElement("time");
		timeNode.innerHTML = model.busTimes[i];
		if (model.nextBusTime === model.busTimes[i]) {
			timeNode.id = "nextBusTime";
		}
		liNode.appendChild(timeNode);
		document.getElementById("busTimes").appendChild(liNode)
	}
}



