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

    "Scheduling Test - New patient new schedule": function (browser) {
        const schedulerPage = browser.page.provider.schedulerPage()

        schedulerPage.accessSchedulerPage(browser.globals.providerEmail, browser.globals.providerPassword)
        schedulerPage.clearVisits()
        schedulerPage.scheduleNewPatient()
    },

    "Reschedule Test - Reschedule visit for one day later": function (browser) {
        const schedulerPage = browser.page.provider.schedulerPage()

        schedulerPage.accessSchedulerPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // The commands below can be used if you want to execute only this test instead of the complete suite
        // schedulerPage.clearVisits()
        // schedulerPage.scheduleExistingPatient()
        schedulerPage.rescheduleVisit()

    },

    afterEach: function (browser) {
        browser.end();
    }
};