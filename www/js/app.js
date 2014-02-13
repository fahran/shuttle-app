function setUp() {
	var busDataElement = document.getElementById("busData");
	var stationToBathRoadBusService = new BusTimeService(busData[0].times.outbound);
    var bathRoadToStationBusService = new BusTimeService(busData[0].times.return);
    var busServices = [stationToBathRoadBusService, bathRoadToStationBusService]

    setInterval(function() {
    	findNextBuses(busServices)
    }, 500);
}
window.setUp = setUp;

function findNextBuses(busServices) {	
	var currentTime = Time.parseDate(new Date());

	var nextOutboundTime = busServices[0].nextBusAfter(currentTime);
	document.getElementById("nextOutboundBusTime").innerHTML = nextOutboundTime;

	var nextReturnTime = busServices[1].nextBusAfter(currentTime);
	document.getElementById("nextReturnBusTime").innerHTML = nextReturnTime;
	
	document.getElementById("currentTime").innerHTML = currentTime.toString();
}
