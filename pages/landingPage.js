const elements = {
    btnUserProfile: `[data-test-id='userProfileButton']`,
    myAccountMenuItem: `[data-test-id='myAccountMenuItem']`
};

const commands = [{

    selectMyAccount() {
        console.log("Accessing My Account")
        this
            //verify and click user profile button
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .click('@btnUserProfile')
            //expect and click my account menu item
            .verify.elementPresent('@myAccountMenuItem')
            .click('@myAccountMenuItem')
            .pause(3000)
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}