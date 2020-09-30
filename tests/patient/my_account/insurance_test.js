module.exports = {
    beforeEach: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
    },

    "Edit Insurance information Successfully": function (browser) {
        const insurancePage = browser.page.patient.my_account.insurancePage()

        insurancePage.accessInsurancePage(browser.globals.email, browser.globals.password)
        insurancePage.openNewInsurance()
        insurancePage.checkToastAgreementRequired()
        insurancePage.checkToastDontUseInsurance()
        insurancePage.openNewInsurance()
        insurancePage.addNewInsurance()

    },

    afterEach: function (browser) {
        browser.end();
    }
};