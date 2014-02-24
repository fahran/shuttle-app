function setUp() {
	var busDataElement = document.getElementById("busData");
	var stationToBathRoadBusService = new BusTimeService(busData[0].times.outbound);
    var bathRoadToStationBusService = new BusTimeService(busData[0].times.return);
    var busService = bathRoadToStationBusService

    displayAllBusTimes(busService);

    setInterval(function() {
    	var currentTime = new Time.parseDate(new Date());
    	findNextBuses(busService, currentTime);
    }, 500);
}
window.setUp = setUp;

function displayAllBusTimes(busService) {
	var busTimes = busService.getTimes();


	for (i in busTimes) {
		var liNode = document.createElement("li");
		var timeNode = document.createElement("time");
		timeNode.innerHTML = busTimes[i].toSimpleTime();
		liNode.appendChild(timeNode);
		document.getElementById("busTimes").appendChild(liNode)
	}
}

function findNextBuses(busService, time) {	
	var nextReturnTime = busService.nextBusAfter(time);
	var timeToNextBus = time.timeUntil(nextReturnTime);

	document.querySelector("#nextBusTime").innerHTML = nextReturnTime.toSimpleTime();
	document.querySelector("#timeToNextBus time").innerHTML = timeToNextBus;

	if (timeToNextBus.isLessThan(new Time(0,5,0))) {
		document.getElementById("timeToNextBus").classList.add("imminent");	
	} else {
		document.getElementById("timeToNextBus").classList.remove("imminent");	
	}
}

