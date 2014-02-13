(function(){

// function Time(date) {
//     this.hours = date.getHours();
//     this.minutes = date.getMinutes();
//     this.seconds = date.getSeconds();
// }

function Time(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
}
window.Time = Time;

Time.parseSimpleTime = function(time) {
    var splitTime = time.split(":");
    var hours = parseInt(splitTime[0], 10);
    var minutes = parseInt(splitTime[1], 10);
    return new Time(hours, minutes, 0);
}

Time.prototype.isAfter = function(otherTime) {
    var otherTimeInSeconds = 3600 * otherTime.hours + 60 * otherTime.minutes + otherTime.seconds;
    var thisTimeInSeconds = 3600 * this.hours + 60 * this.minutes + this.seconds;
    if (thisTimeInSeconds > otherTimeInSeconds) {
        return true;
    } else return false;
}

Time.prototype.toSimpleTime = function() {
    return _padToTwoDigits(this.hours) + ":" + _padToTwoDigits(this.minutes);
}

function _padToTwoDigits(number) {
    var stringNum = number.toString();
    if (stringNum.length == 1) {
        stringNum = "0" + stringNum
    }
    return stringNum
}

function findNextBus() {
    var busService = new BusTimeService(["10:00", "11:00", "12:00"])
    document.getElementById("nextBusTime").innerHTML = busService.nextBusAfter(new Time(10,30,0));
}
window.findNextBus = findNextBus;

//window.onload = function() {
//	startClock();
//};

})();