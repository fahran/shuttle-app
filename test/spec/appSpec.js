describe("app", function() {
  
    it("app.findNextBuses sets time elements to time of next buses", function() {
      setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<p id="nextBusTime"><time></time></p>');

      var busService = new BusTimeService("");

      spyOn(busService, 'nextBusAfter').and.returnValue(new Time(1,2,3));

      findNextBuses(busService);
      expect($("#nextBusTime").text()).toBe("01:02:03");
      // expect($("#timeToNextBus").text()).toBe("fuck knows");
    });
});
