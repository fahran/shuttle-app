describe("BusTimeService constructor", function() {

  it("takes json list of bus times and serialises to Times", function() {
    var busTimes = ["10:00", "11:00"];
    var busService = new BusTimeService(busTimes);
    var expectedTimes = [new Time(10,0,0), new Time(11,0,0)];
    expect(busService.busTimes).toEqual(expectedTimes);
  });
});

describe("BusTimeService nextBusTime", function() {

  it("returns the time of the next bus", function() {
    var busTimes = ["10:00", "11:00"];
    var currentTime = new Time(9,0,0);
    
    var busService = new BusTimeService(busTimes);
    expect(busService.nextBusAfter(currentTime)).toEqual(new Time(10,0,0));
  });

  it("returns the time of the non-trivial next bus", function() {
    var busTimes = ["10:00", "11:00", "12:00"];
    var currentTime = new Time(10,30,0);
    
    var busService = new BusTimeService(busTimes);
    expect(busService.nextBusAfter(currentTime)).toEqual(new Time(11,0,0));
  });

  it("at the time the bus leaves, suggest the bus after that", function() {
    var busTimes = ["10:00", "11:00", "12:00"];
    var currentTime = new Time(11,0,0);
    
    var busService = new BusTimeService(busTimes);
    expect(busService.nextBusAfter(currentTime)).toEqual(new Time(12,0,0));
  });

  it("if there are no more buses, return the first bus the next day", function() {
    var busTimes = ["10:00", "11:00", "12:00"];
    var currentTime = new Time(13,0,0);
    
    var busService = new BusTimeService(busTimes);
    expect(busService.nextBusAfter(currentTime)).toEqual(new Time(10,0,0));
  });
});