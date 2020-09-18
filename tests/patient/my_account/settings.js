var temp_email = "temporary@evisit.com"
var temp_password = "Temporary123!"

module.exports = {
    
    beforeEach: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
    },
    //Change email and password
    "Edit Settings Successfully": function (browser) {
        const settingsPage = browser.page.patient.my_account.settingsPage()
        const personalInfoPage = browser.page.patient.my_account.personalInfoPage()

        settingsPage.accessSettingsPage(browser.globals.email, browser.globals.password)
            .changeEmail(temp_email, browser.globals.password)
        personalInfoPage.checkToastMessage("Email updated successfully.")
        settingsPage.changePassword(temp_password, browser.globals.password)
        personalInfoPage.checkToastMessage("Password updated successfully.")
    },
    "Check persistence and revert credentials change": function (browser) {
        const settingsPage = browser.page.patient.my_account.settingsPage()
        const personalInfoPage = browser.page.patient.my_account.personalInfoPage()
        
        //log in with changed credentials
        settingsPage.accessSettingsPage(temp_email, temp_password)
            //change back to default email
            .changeEmail(browser.globals.email, temp_password)
        personalInfoPage.checkToastMessage("Email updated successfully.")
        //change back to default password
        settingsPage.changePassword(browser.globals.password, temp_password)
        personalInfoPage.checkToastMessage("Password updated successfully.")
    },

    afterEach: function (browser) {
        browser.end();
    }
};