const elements = {
    btnUserProfile: `[data-test-id='userProfileButton']`,
    myAccountMenuItem: `[data-test-id='myAccountMenuItem']`,
    visitHistoryMenuItem: `[data-test-id="visitHistoryMenuItem"]`,
    SelectPatient: `[data-test-id='rowClick']`
};

const commands = [{

    selectMyAccount() {
        console.log("Accessing My Account")
        this
            //verify and click user profile button
            .waitForElementVisible('@SelectPatient')
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
    },

    selectVisitHistory() {
        console.log("Accessing My Account")
        this
            //verify and click user profile button
            .waitForElementVisible('@SelectPatient')
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@visitHistoryMenuItem')
            .pause(500)
            .verify.elementPresent('@visitHistoryMenuItem')
            .click('@visitHistoryMenuItem')
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}