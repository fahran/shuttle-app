describe("time", function() {
  
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

describe("time.toString()", function() {
   it("can output a time as a full time string", function() {
      var time = new Time(10,20,30);
      expect(time.toString()).toBe("10:20:30");
    });

   it("can pad hours and minutes to two digits", function() {
      var time = new Time(1,2,3);
      expect(time.toString()).toBe("01:02:03");
    });
});

describe("time.parseDate()", function() {
   it("can extract the Time from a javascript Date", function() {
      var date = new Date(Date.parse("Thu Feb 13 2014 12:11:35 GMT+0000 (GMT)"));
      var time = Time.parseDate(date);
      expect(time.hours).toBe(12);
      expect(time.minutes).toBe(11);
      expect(time.seconds).toBe(35);
    });

   it("can extract the Time from a javascript Date in BST", function() {
      var date = new Date(Date.parse("Wed Aug 13 2014 12:23:34 GMT+0100 (BST)"));
      var time = Time.parseDate(date);
      expect(time.hours).toBe(12);
      expect(time.minutes).toBe(23);
      expect(time.seconds).toBe(34);
    });

    it("can extract midnight in GMT", function() {
      var date = new Date(Date.parse("Thu Feb 13 2014 00:00:00 GMT+0000 (GMT)"));
      var time = Time.parseDate(date);
      expect(time.hours).toBe(0);
      expect(time.minutes).toBe(0);
      expect(time.seconds).toBe(0);
    });

   it("can extract midnight in BST", function() {
      var date = new Date(Date.parse("Wed Aug 13 2014 00:00:00 GMT+0100 (BST)"));
      var time = Time.parseDate(date);
      expect(time.hours).toBe(0);
      expect(time.minutes).toBe(0);
      expect(time.seconds).toBe(0);
    });
});


describe("Time.inSeconds()", function() {
   it("returns 0 for midnight", function() {
      var time = new Time(0,0,0);
      expect(time.inSeconds()).toBe(0);
    });

   it("calculates seconds correctly", function() {
      var time = new Time(0,0,15);
      expect(time.inSeconds()).toBe(15);
    });

   it("calculates minutes correctly", function() {
      var time = new Time(0,2,0);
      expect(time.inSeconds()).toBe(120);
    });

   it("calculates hours correctly", function() {
      var time = new Time(5,0,0);
      expect(time.inSeconds()).toBe(18000);
    });

   it("calculates the most extreme time correctly", function() {
      var time = new Time(23,59,59);
      expect(time.inSeconds()).toBe(86399);
    });
});

describe("Time.until(time)", function() {
    it("calculates the time between two times", function() {
        var time1 = new Time(0,0,0);
        var time2 = new Time(1,0,0);

        var result = time1.timeUntil(time2);
        expect(result.hours).toBe(1);
        expect(result.minutes).toBe(0);
        expect(result.seconds).toBe(0);
    });

    it("calculates the time between two non-trivial times", function() {
        var time1 = new Time(1,2,3);
        var time2 = new Time(4,7,9);
        
        var result = time1.timeUntil(time2);
        expect(result.hours).toBe(3);
        expect(result.minutes).toBe(5);
        expect(result.seconds).toBe(6);
    });
    
    it("shows zero difference between identical times", function() {
            var time1 = new Time(10,20,30);
            var time2 = new Time(10,20,30);
            
            var result = time1.timeUntil(time2);
            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(0);
            expect(result.seconds).toBe(0);
    });

    it("shows correct difference between maximally separated times", function() {
            var time1 = new Time(0,0,0);
            var time2 = new Time(23,59,59);
            
            var result = time1.timeUntil(time2);
            expect(result.hours).toBe(23);
            expect(result.minutes).toBe(59);
            expect(result.seconds).toBe(59);
    });

    it("shows correct difference if the time is the next day", function() {
            var time1 = new Time(2,0,0);
            var time2 = new Time(1,0,0);
            
            var result = time1.timeUntil(time2);
            expect(result.hours).toBe(23);
            expect(result.minutes).toBe(0);
            expect(result.seconds).toBe(0);
    });

    it("shows correct difference between maximally separated times across days", function() {
            var time1 = new Time(0,0,1);
            var time2 = new Time(0,0,0);
            
            var result = time1.timeUntil(time2);
            expect(result.hours).toBe(23);
            expect(result.minutes).toBe(59);
            expect(result.seconds).toBe(59);
    });
});
