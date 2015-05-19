shuttle-app
===========

I never know when the next shuttle bus will be. Perhaps now, I'll know!

================================

An experiment in JavaScript and HTML5, using Jasmine for unit testing and build.phonegap.com to make a cross-platform app 
without too much fuss.

Public page: https://build.phonegap.com/apps/768949/share

================================

### Project status
* Renders one of the journeys, but currently cannot swipe to view others. In the midst of a refactor to make this possible.

#### Parts that went well:

* The basic concerns separation worked well.
* Hey, I can do some JavaScript now!

#### Parts that went less well:

* This is the sort of project that would really benefit from using a framework to abstract the model away from the rendering concerns. Didn't realise this upfront, and I kind of wanted to see how far I could get without a framework. Good learning experience, but a framework would have helped. React.js looks to be a very good fit. As it is, my 'render' function is deeply unpleasant, and very hard to test.
* Not a fan of the Jasmine fixtures. It would be very easy for the tests to get out of sync with the layout of the actual page.
* Jasmine had one key weirdness; a syntax error sometimes results in an "all tests pass" page. Not great.  
* I mentioned the 'render' function, right? Eww.
