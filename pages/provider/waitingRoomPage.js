const elements = {
    tabWaitingRoom: `[data-test-id="waitingRoomTab"]`,
    tabPatients:`[data-test-id="patientsTab"]`,
    tabVisitHistory:`[data-test-id="visitHistoryTab"]`,
    tabScheduling: `[data-test-id="appointmentsTab"]`,
    btnUserProfile: `[data-test-id='userProfileButton']`,
    myAccountMenuItem: `[data-test-id='myAccountMenuItem']`,

};

const commands = [{

    openScheduling(){
        this
            .waitForElementVisible('@tabWaitingRoom')
            .waitForElementNotVisible('.eVisitAppLoadingSpinner')
            .click('@tabScheduling')
        return this
    },

    selectMyAccount() {
        console.log("Accessing My Account")
        this
            //verify and click user profile button
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(500)
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