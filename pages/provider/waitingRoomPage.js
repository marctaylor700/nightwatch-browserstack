const elements = {
    tabWaitingRoom: `[data-test-id="waitingRoomTab"]`,
    tabPatients: `[data-test-id="patientsTab"]`,
    tabVisitHistory: `[data-test-id="visitHistoryTab"]`,
    tabScheduling: `[data-test-id="appointmentsTab"]`,
    btnUserProfile: `[data-test-id='userProfileButton']`,
    myAccountMenuItem: `[data-test-id='myAccountMenuItem']`,
    logoutMenuItem: `[data-test-id="logoutMenuItem"]`,

    // General modal locator for any modal on screen
    Modal: `.eVisitAppModal`,

    // Logout modal items
    logoutDeny: `[data-test-id="confirmModalDeny"]`,
    logoutAccept: `[data-test-id="confirmModalConfirm"]`,

};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible("@tabWaitingRoom", 15000)
    },

    /*
    *    This function make sure the page is completely loaded before continuing, using any specified element as a trait
    *   Input: Valid provider email and password
    */
    accessWaitingRoomPage(email, password) {
        this
        const loginPage = this.api.page.loginPage()
        loginPage
            .goToPracticeLoginPage()
            .userLogin(email, password)
        this.isOnPage();
        return this
    },

    /*
    *   This function will open the menu and click on Logout
    *   Input: None
    */
    selectLogout() {
        this
            //verify and click user profile button
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@logoutMenuItem')
            .pause(500)
            .click('@logoutMenuItem')
        return this
    },

    /*
    *   Check the logout modal text and cancel the proccess
    *   Input: None
    */
    denyLogout() {
        this
            .waitForElementVisible('@Modal')
            .expect.element(`@Modal`).text.to.contain("Are you sure you want to log out?")
        this.click('@logoutDeny')
            .waitForElementNotPresent('@Modal')
            .waitForElementVisible("@tabWaitingRoom")
        return this
    },

    /*
    *   Check the logout modal text and accept the proccess, checking if the login screen appears
    *   Input: None
    */
    acceptLogout() {
        const loginPage = this.api.page.loginPage()
        this
            .waitForElementVisible('@Modal')
            .expect.element(`@Modal`).text.to.contain("Are you sure you want to log out?")
        this.click('@logoutAccept')
            .waitForElementNotPresent('@Modal')
        loginPage.isOnPage()
        return this
    },

    /*
    *   Open the scheduling tab in the main menu
    *   Input: None
    */
    openScheduling() {
        this
            .waitForElementVisible('@tabWaitingRoom')
            .waitForElementNotVisible('.eVisitAppLoadingSpinner')
            .click('@tabScheduling')
        return this
    },

    /*
    *   This function will open the menu and click on my account
    *   Input: None
    */
    selectMyAccount() {
        console.log("Accessing My Account")
        this
            //verify and click user profile button
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@myAccountMenuItem')
            .pause(500)
            .verify.elementPresent('@myAccountMenuItem')
            .click('@myAccountMenuItem')
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}