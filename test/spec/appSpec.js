describe("app", function() {
  
    it("app.findNextBuses sets time elements to time of next buses", function() {
      setFixtures('<time id="nextOutboundBusTime"></time>
      	<time id="nextReturnBusTime"></time>
      	<time id="currentTime"></time>');

      var serviceOne = new BusTimeService("");
      var serviceTwo = new BusTimeService("");

      spyOn(serviceOne, 'nextBusAfter').and.returnValue("service one time");
      spyOn(serviceTwo, 'nextBusAfter').and.returnValue("service two time");

      findNextBuses([serviceOne, serviceTwo]);
      expect($("#nextOutboundBusTime").text()).toBe("service one time");
      expect($("#nextReturnBusTime").text()).toBe("service two time");
    });
});
