module.exports = {
    beforeEach: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
    },

    "Forgot Password - Valid Email": function (browser) {
        const loginPage = browser.page.loginPage()

        //Open login page
        loginPage.goToPracticeLoginPage()
        loginPage.forgotPasswordKnownEmail(browser.globals.email)
        
    },

    "Forgot Password - Invalid Email": function (browser) {
        const loginPage = browser.page.loginPage()

        //Open login page
        loginPage.goToPracticeLoginPage()
        loginPage.forgotPasswordUnknownEmail()
        
    },

    afterEach: function (browser) {
        browser.end();
    }
};