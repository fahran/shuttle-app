(function(){

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

Time.parseDate = function(date) {
	return new Time(date.getHours(), date.getMinutes(), date.getSeconds());
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

Time.prototype.toString = function() {
	return _padToTwoDigits(this.hours) + ":" + _padToTwoDigits(this.minutes) + ":" + _padToTwoDigits(this.seconds);	
}

Time.prototype.timeUntil = function(otherTime) {
	var remainingSeconds = otherTime.inSeconds() - this.inSeconds()
	if (remainingSeconds < 0) {
		remainingSeconds += (3600 * 24)
	}
	var hours = Math.floor(remainingSeconds / 3600)
	remainingSeconds -= hours * 3600
	var minutes = Math.floor(remainingSeconds / 60);
	remainingSeconds -= minutes * 60;
	return new Time(hours, minutes, remainingSeconds);
}

Time.prototype.inSeconds = function() {
	return 3600 * this.hours + 60* this.minutes + this.seconds
}

function _padToTwoDigits(number) {
    var stringNum = number.toString();
    if (stringNum.length == 1) {
        stringNum = "0" + stringNum
    }
    return stringNum
}


})();