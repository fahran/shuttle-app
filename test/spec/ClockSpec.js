describe("time", function() {
  
  // it("contains spec with an expectation", function() {
  //   setFixtures('<h1 id="time">00:00:00</h1>')
  //   // spyOn(Date.prototype, 'getHours').andReturn(01)
  //   // spyOn(Date.prototype, 'getMinutes').andReturn(02)
  //   // spyOn(Date.prototype, 'getSeconds').andReturn(03)
  //   // startClock();
  //   // expect($("#time").text()).toBe("01:02:03")
  // });

  // it("has the correct time when constructed with a Date", function() {
  //   var date = new Date(Date.parse("Wed, 09 Jan 1995 01:02:03 UTC"));
  //   var time = new Time(date);
  //   expect(time.toString()).toBe("01:02:03");
  // });


    it("has the correct time when constructed with h, m, s", function() {
      var time = new Time(1, 2, 3);
      expect(time.hours).toBe(1);
      expect(time.minutes).toBe(2);
      expect(time.seconds).toBe(3);
    });


    it("can parse simpletimes (hh:mm)", function() {
      var time = Time.parseSimpleTime("10:05");
      expect(time).toEqual(new Time(10,5,0));
    });

    it("can parse midnight", function() {
      var time = Time.parseSimpleTime("00:00");
      expect(time).toEqual(new Time(0,0,0));
    });
});

describe("time.isAfter(time)", function() {
   it("returns true if provided time is after it", function() {
      var earlierTime = new Time(9,0,0);
      var laterTime = new Time(10,0,0);
      expect(laterTime.isAfter(earlierTime)).toBe(true);
    });

   it("returns false if provided time is before it", function() {
      var earlierTime = new Time(9,0,0);
      var laterTime = new Time(10,0,0);
      expect(earlierTime.isAfter(laterTime)).toBe(false);
    });

   it("returns true if provided time is just before it", function() {
      var earlierTime = new Time(9,0,0);
      var laterTime = new Time(9,0,1);
      expect(laterTime.isAfter(earlierTime)).toBe(true);
    });

   it("returns false if times are the same", function() {
      var earlierTime = new Time(9,0,0);
      var laterTime = new Time(9,0,0);
      expect(laterTime.isAfter(earlierTime)).toBe(false);
    });

   it("returns false if provided time is just after it", function() {
      var earlierTime = new Time(9,0,0);
      var laterTime = new Time(9,0,1);
      expect(earlierTime.isAfter(laterTime)).toBe(false);
    });
});

describe("time.toSimpleTime()", function() {
   it("can output a time as a simple time string", function() {
      var time = new Time(10,10,0);
      expect(time.toSimpleTime()).toBe("10:10");
    });

   it("can pad hours and minutes to two digits", function() {
      var time = new Time(1,2,0);
      expect(time.toSimpleTime()).toBe("01:02");
    });
});