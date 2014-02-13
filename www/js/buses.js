(function(){
	
function BusTimeService(busTimeJson) {
	var timeList = [];
	for (var busTimeIndex in busTimeJson) {
		timeList.push(Time.parseSimpleTime(busTimeJson[busTimeIndex]))
	}
	this.busTimes = timeList;
}
window.BusTimeService = BusTimeService;

BusTimeService.prototype.nextBusAfter = function(time) {
	for (var i in this.busTimes) {
		var busTime = this.busTimes[i]
		if (busTime.isAfter(time)) {
			return busTime.toSimpleTime();
		}	
	}
	return "no more buses";
}

})();