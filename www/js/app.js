function setUp() {
	var busDataElement = document.getElementById("busData");
	var stationToBathRoadBusService = new BusTimeService(busData[0].times.outbound);
    var bathRoadToStationBusService = new BusTimeService(busData[0].times.return);
    var busServices = bathRoadToStationBusService

    setInterval(function() {
    	var currentTime = new Time.parseDate(new Date());
    	findNextBuses(busServices, currentTime);
    }, 500);
}
window.setUp = setUp;

function findNextBuses(busService, time) {	
	var nextReturnTime = busService.nextBusAfter(time);
	var timeToNextBus = time.timeUntil(nextReturnTime); 

	document.querySelector("#nextBusTime time").innerHTML = nextReturnTime.toSimpleTime();
	document.querySelector("#timeToNextBus time").innerHTML = timeToNextBus;

	if (timeToNextBus.isLessThan(new Time(0,5,0))) {
		document.getElementById("timeToNextBus").classList.add("red");	
	}
}

