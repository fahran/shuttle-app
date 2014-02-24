describe("app", function() {
  
    it("app.findNextBuses sets time elements to time of next buses", function() {
      setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<time id="nextBusTime"></time>');
      var busService = new BusTimeService("");
      spyOn(busService, 'nextBusAfter').and.returnValue(new Time(1,20,0));
      spyOn(busService, 'getTimes').and.returnValue([]);

      findNextBuses(busService, new Time(1,10,0));
      expect($("#nextBusTime").text()).toBe("01:20");
      expect($("#timeToNextBus").text()).toBe("00:10:00");
    });

    it("app.findNextBuses makes the time red when the bus is less than 5 mins away", function() {
      setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<time id="nextBusTime"></time>');
      var busService = new BusTimeService("");
      spyOn(busService, 'nextBusAfter').and.returnValue(new Time(1,20,0));
      spyOn(busService, 'getTimes').and.returnValue([]);

      findNextBuses(busService, new Time(1,15,1));
      expect($("#timeToNextBus")[0].classList.contains("imminent")).toBe(true);
    });

    it("app.findNextBuses displays all bus times for that day", function() {
      
});

describe("App.displayAllBusTimes()"), function() {
	it("displays all the bus time from the busService"), function() {
		setFixtures('<ol id="busTimes"></ol>');
      var busService = new BusTimeService("");
      spyOn(busService, 'getTimes').and.returnValue([new Time(1,20,0), new Time(1,40,0), new Time(2,20,0)]);

      displayAllBusTimes(busService);
      expect($("#busTimes time").length).toBe(3);
      expect($("#busTimes time")[0].innerHTML).toBe("01:20");
      expect($("#busTimes time")[1].innerHTML).toBe("01:40");
      expect($("#busTimes time")[2].innerHTML).toBe("02:20");
    });		
	});
});
