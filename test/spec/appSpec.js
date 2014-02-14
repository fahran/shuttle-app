describe("app", function() {
  
    it("app.findNextBuses sets time elements to time of next buses", function() {
      setFixtures('<time id="nextOutboundBusTime"></time>' + 
      	'<time id="nextReturnBusTime"></time>' +
      	'<time id="timeToNextBus"></time>');

      var busService = new BusTimeService("");

      spyOn(busService, 'nextBusAfter').and.returnValue(new Time(1,2,3));

      findNextBuses(busService);
      expect($("#nextReturnBusTime").text()).toBe("01:02:03");
      // expect($("#timeToNextBus").text()).toBe("fuck knows");
    });
});
