const elements = {
    tabWaitingRoom: `[data-test-id="waitingRoomTab"]`,
    tabPatients:`[data-test-id="patientsTab"]`,
    tabVisitHistory:`[data-test-id="visitHistoryTab"]`,
    tabScheduling: `[data-test-id="appointmentsTab"]`,

};

const commands = [{

    openScheduling(){
        this
            .waitForElementVisible('@tabWaitingRoom')
            .waitForElementNotVisible('.eVisitAppLoadingSpinner')
            .click('@tabScheduling')
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}