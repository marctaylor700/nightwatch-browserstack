var temp_email = "temporary@evisit.com"
var temp_password = "Temporary123!"
let settingsPage;

module.exports = {
    
    beforeEach: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
        settingsPage = browser.page.patient.my_account.settingsPage();
    },
    //Change email and password
    "Edit Settings Successfully": function (browser) {
        settingsPage.accessSettingsPage(browser.globals.email, browser.globals.password)
            .changeEmail(temp_email, browser.globals.password)
            .checkToastMessage("Email updated successfully.")
            .changePassword(temp_password, browser.globals.password)
            .checkToastMessage("Password updated successfully.")
    },
    "Check persistence and revert credentials change": function (browser) {
        //log in with changed credentials
        settingsPage.accessSettingsPage(temp_email, temp_password)
            //change back to default email
            .changeEmail(browser.globals.email, temp_password)
            .checkToastMessage("Email updated successfully.")
            //change back to default password
            .changePassword(browser.globals.password, temp_password)
            .checkToastMessage("Password updated successfully.")
    },

    afterEach: function (browser) {
        browser.end();
    }
};