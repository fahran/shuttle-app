function setUp() {
	var busDataElement = document.getElementById("busData");
	var stationToBathRoadBusService = new BusTimeService(busData[0].times.outbound);
    var bathRoadToStationBusService = new BusTimeService(busData[0].times.return);
    var busServices = bathRoadToStationBusService

    setInterval(function() {
    	findNextBuses(busServices)
    }, 500);
}
window.setUp = setUp;

function findNextBuses(busService) {	
	var currentTime = new Time.parseDate(new Date());

	var nextReturnTime = busService.nextBusAfter(currentTime);
	var timeToNextBus = currentTime.timeUntil(nextReturnTime); 
	
	document.getElementById("nextReturnBusTime").innerHTML = nextReturnTime;
	document.getElementById("timeToNextBus").innerHTML = timeToNextBus;
}

