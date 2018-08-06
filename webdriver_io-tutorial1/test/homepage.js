var assert = require('assert');
var request = require('request');

describe('webdriver.io page', function() {
    it('should have the right title - the fancy generator way', function() {
        browser.url('/');
        var title = browser.getTitle();
        assert.equal(title, 'WebdriverIO - WebDriver bindings for Node.js');
    });


    describe('API page', function() {
        it('should have a link to it from the homepage', function() {
            browser.url('/');
            var hasAPILink = browser.isExisting('=API');
            //browser.isExisting('a[href="/api.html"]');

            assert(hasAPILink);
        })

        it('should have a link to the API page', function() {
            browser.url('/');
            browser.click('=API');

            var title = browser.getTitle();
            assert.equal(title, 'WebdriverIO - API Docs');

            //browser.pause(2000);
            //browser.debug();

        })

        it('should filter search results', function() {
            browser.url('/api.html');

            browser.setValue('input[name="search"]', 'debug');

            //browser.screenshot();

            // save screenshot to file and receive as Buffer
            browser.saveScreenshot('snapshot.png');

            //request.post("vrt-service.com", {})

        })
    })
});