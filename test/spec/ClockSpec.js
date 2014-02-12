describe("nextBus", function() {
  
  // it("contains spec with an expectation", function() {
  //   setFixtures('<h1 id="time">00:00:00</h1>')
  //   // spyOn(Date.prototype, 'getHours').andReturn(01)
  //   // spyOn(Date.prototype, 'getMinutes').andReturn(02)
  //   // spyOn(Date.prototype, 'getSeconds').andReturn(03)
  //   // startClock();
  //   // expect($("#time").text()).toBe("01:02:03")
  // });

  it("returns the time of the next bus", function() {
    nextBus();
    expect($("#time").text()).toBe("01:02:03")
  });
});