describe("App.render()", function() {
    it("renders the time to next bus", function() {
		setFixtures('<p class="timeToNextBus"><time></time></p>' +  
                    '<ol id="busTimes"><li id="nextBusTime"><time>00:00</time></li></ol>');
    var model = {timeToNextBus: "10:00:00", nextBusTime: "00:00"};
		render(model);
		expect($(".timeToNextBus time")[0].innerHTML).toBe("10:00:00");
	});

    it("adds the imminent class to timeToNextBus if imminent is true", function() {
      setFixtures('<p class="timeToNextBus"><time></time></p>' +  
                  '<ol id="busTimes"><li id="nextBusTime"><time>00:00</time></li></ol>');
      render({imminent: true, nextBusTime: "00:00"});
      expect($(".timeToNextBus")[0].classList.contains("imminent")).toBe(true);
    });

    it("does not add the imminent class to timeToNextBus if imminent is false", function() {
      setFixtures('<p class="timeToNextBus"><time></time></p>' +  
                  '<ol id="busTimes"><li id="nextBusTime"><time>00:00</time></li></ol>');
      render({imminent: false, nextBusTime: "00:00"});
          debugger;
      expect($(".timeToNextBus")[0].classList.contains("imminent")).toBe(false);
    });

    it("adds id nextBusTime to the nextBusTime", function() {
        setFixtures('<p class="timeToNextBus"><time></time></p>' +  
                  '<ol id="busTimes"><li><time>10:00</time></li><li><time>11:00</time></li><li><time>12:00</time></li></ol>');
        render({nextBusTime: "11:00"});
        expect($("#busTimes")[0].innerHTML).toBe('<li><time>10:00</time></li><li id="nextBusTime"><time>11:00</time></li><li><time>12:00</time></li>');
    });

    it("moves the id nextBusTime to the right element", function() {
        setFixtures('<p class="timeToNextBus"><time></time></p>' +  
                  '<ol id="busTimes"><li id="nextBusTime"><time>10:00</time></li><li><time>11:00</time></li><li><time>12:00</time></li></ol>');
        render({nextBusTime: "11:00"});
        expect($("#busTimes")[0].innerHTML).toBe('<li><time>10:00</time></li><li id="nextBusTime"><time>11:00</time></li><li><time>12:00</time></li>');
    });

    it("centres the nextBusTime in the list of busTimes", function() {
        setFixtures('<p class="timeToNextBus"><time></time></p>' +  
                  '<ol id="busTimes">' + 
                  '<li><time>10:00</time></li>' +
                  '<li><time>11:00</time></li>' +
                  '<li><time>12:00</time></li>' +
                  '<li><time>13:00</time></li>' +
                  '<li><time>14:00</time></li>' +
                  '<li><time>15:00</time></li>' +
                  '</ol>');

        render({nextBusTime: "11:00"});
        var listElement = ($("#busTimes"))[0]
        expect(listElement.style.marginLeft).toBe("-40px");
    });
});

describe("App.renderBusTimes()", function() {
    it("renders the bus times in the busTimes list", function() {
        setFixtures('<ol id="busTimes"></ol>');
        var busTimes = ["10:00", "11:00", "12:00"];
        renderBusTimes(busTimes);    
        expect($("#busTimes")[0].innerHTML).toBe('<li><time>10:00</time></li><li><time>11:00</time></li><li><time>12:00</time></li>');
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
        var busService1 = new BusTimeService("");
        var busService2 = new BusTimeService("");
        var nextBusTime1 = new Time(1,3,0);
        var nextBusTime2 = new Time(2,4,0);
        var currentTime = new Time(1,0,0);

        spyOn(busService1, "nextBusAfter").and.returnValue(nextBusTime1);
        spyOn(busService2, "nextBusAfter").and.returnValue(nextBusTime2);

        var result = populateModel([busService1, busService2], currentTime); 
        expect(result[0].nextBusTime).toBe("01:03");
        expect(result[0].timeToNextBus).toBe("00:03:00");
        expect(result[0].imminent).toBe(true);

        expect(result[1].nextBusTime).toBe("02:04");
        expect(result[1].timeToNextBus).toBe("01:04:00");
        expect(result[1].imminent).toBe(false);        
    })
});