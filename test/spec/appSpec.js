describe("App.render()", function() {
	it("renders the time to next bus", function() {
		setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                    '<ol id="busTimes"></ol>');
        var model = {timeToNextBus: "10:00:00"}
		render(model);
		expect($("#timeToNextBus time")[0].innerHTML).toBe("10:00:00");
	});

    it("adds the imminent class to timeToNextBus if imminent is true", function() {
      setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<time id="nextBusTime"></time>');
      render({imminent: true});
      expect($("#timeToNextBus")[0].classList.contains("imminent")).toBe(true);
    });

    it("does not add the imminent class to timeToNextBus if imminent is false", function() {
      setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<time id="nextBusTime"></time>');
      render({imminent: false});
      expect($("#timeToNextBus")[0].classList.contains("imminent")).toBe(false);
    });

    it("renders the next bus time in the times list", function() {
        setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<ol id="busTimes"></ol>');
        var busTimes = ["10:00"];
        var nextBusTime = "10:00";
        render({nextBusTime: nextBusTime, busTimes: busTimes});
        expect($("#busTimes")[0].innerHTML).toBe('<li><time id="nextBusTime">10:00</time></li>');
    });

    it("renders the list of bus times with the next bus time given id nextBusTime", function() {
        setFixtures('<p id="timeToNextBus"><time></time></p>' +  
                  '<ol id="busTimes"></ol>');
        var busTimes = ["10:00", "11:00", "12:00"];
        var nextBusTime = "11:00";
        render({nextBusTime: nextBusTime, busTimes: busTimes});
        expect($("#busTimes")[0].innerHTML).toBe('<li><time>10:00</time></li><li><time id="nextBusTime">11:00</time></li><li><time>12:00</time></li>');
    });
});

describe("isImminent", function() {
    it("returns true when bus is less than 5 mins away", function() {
        expect(isImminent(new Time(0,4,59))).toBe(true);
        expect(isImminent(new Time(0,5,0))).toBe(false); 
    });
});

describe("populateModel", function() {
    it("populates model using correct services", function() {
        var busService = new BusTimeService("");
        var currentTime = new Time(1,0,0);
        var nextBusTime = new Time(1,3,0);
        var busTimes = ["01:03", "01:06"]

        spyOn(busService, "nextBusAfter").and.returnValue(nextBusTime);
        var result = populateModel(busService, currentTime, busTimes); 
        expect(result.nextBusTime).toBe("01:03");
        expect(result.timeToNextBus).toBe("00:03:00");
        expect(result.imminent).toBe(true);
        expect(result.busTimes[0]).toBe("01:03"); 
        expect(result.busTimes[1]).toBe("01:06"); 
    })
});