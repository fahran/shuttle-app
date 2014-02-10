function setUpHTMLFixture() {
    setFixtures('<h1 id="time">00:00:00</h1>');
}

describe("clock suite", function() {
    beforeEach(function() {
        setUpHTMLFixture();
    });

    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});