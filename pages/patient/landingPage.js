const elements = {
    btnUserProfile: `[data-test-id='userProfileButton']`,
    myAccountMenuItem: `[data-test-id='myAccountMenuItem']`,
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
            .pause(500)
            .click('@btnUserProfile')
            .click('@btnUserProfile')//When Geolocation page appears, this menu will not open correctly with only one try sometimes
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