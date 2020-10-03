module.exports = {
    beforeEach: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
    },

    "Scheduling Test - Existing patient new schedule": function (browser) {
        const schedulerPage = browser.page.provider.schedulerPage()

        schedulerPage.accessSchedulerPage(browser.globals.providerEmail, browser.globals.providerPassword)
        schedulerPage.clearVisits()
        schedulerPage.scheduleExistingPatient()
    },

    afterEach: function (browser) {
        browser.end();
    }
};