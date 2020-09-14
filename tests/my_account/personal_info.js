module.exports = {
    before: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
    },
    //This test edit all fiedls of Personal Info considering the happy path
    "Edit Personal Info Successfully": function (browser) {
        const loginPage = browser.page.loginPage()
        const geolocationPage = browser.page.geolocationPage()
        const landingPage = browser.page.landingPage()
        const personalInfoPage = browser.page.personalInfoPage()

        loginPage
            .goToPracticeLoginPage()
            .patientLogin()
        geolocationPage.confirmGeolocation()
        landingPage.selectMyAccount()
        personalInfoPage.verify.elementPresent('@personalInfoSection')
        //edit fields in Personal Info form according to parameters values
        personalInfoPage.editPersonalInfo("First Name Edited", "Middle Name Edited","Last Name Edited", "Address 1 Edited",
        "Address 2 Edited", "City Edited", "WyomingOption", "12345", "123-456-7891", "09/06/1990", "femaleOption", "AmericaNoronha020200Option")
        //check Success toast
        personalInfoPage.checkToastMessage("Personal Info updated.")
        //check if all fields were saved as informed previously
        personalInfoPage.checkPersistence("First Name Edited", "Middle Name Edited","Last Name Edited", "Address 1 Edited",
        "Address 2 Edited", "City Edited", "Wyoming", "12345", "123-456-7891", "09/06/1990", "Female", "America/Noronha (-02 -0200)")
    },

    after: function (browser) {
        browser.end();
    }
};