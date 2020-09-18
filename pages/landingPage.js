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
            .verify.elementPresent('@btnUserProfile')
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@myAccountMenuItem')
            .verify.elementPresent('@myAccountMenuItem')
            .click('@myAccountMenuItem')
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}