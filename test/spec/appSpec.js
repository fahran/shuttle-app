describe("app", function() {
  
    it("app.findNextBuses sets time elements to time of next buses", function() {
      setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<p id="nextBusTime"><time></time></p>');
      var busService = new BusTimeService("");
      spyOn(busService, 'nextBusAfter').and.returnValue(new Time(1,20,0));

      findNextBuses(busService, new Time(1,10,0));
      expect($("#nextBusTime").text()).toBe("01:20");
      expect($("#timeToNextBus").text()).toBe("00:10:00");
    });

    it("app.findNextBuses makes the time red when the bus is less than 5 mins away", function() {
      setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<p id="nextBusTime"><time></time></p>');
      var busService = new BusTimeService("");
      spyOn(busService, 'nextBusAfter').and.returnValue(new Time(1,20,0));

      findNextBuses(busService, new Time(1,15,1));
      expect($("#timeToNextBus")[0].classList.contains("imminent")).toBe(true);
    });

    it("app.findNextBuses does not make time red when bus is 5 mins or more away", function() {
      setFixtures('<p id="timeToNextBus" class="imminent"><time></time></p>' +  
                  '<p id="nextBusTime"><time></time></p>');
      var busService = new BusTimeService("");
      spyOn(busService, 'nextBusAfter').and.returnValue(new Time(1,20,0));

      findNextBuses(busService, new Time(1,15,0));
      expect($("#timeToNextBus")[0].classList.contains("imminent")).toBe(false);
    });
});
