const elements = {


    selectStateField: `[data-test-id="stateSelect"]`,
    FloridaOption: `[data-test-id="FloridaOption"]`,
    confirmCheckBox: `[data-test-id='confirmCheckBox']`,
    btnContinue: `[data-test-id='continue']`,
    btnUserProfile: `[data-test-id='userProfileButton']`,
};

const commands = [{

    confirmGeolocation() {
        this
            .waitForElementVisible(`@btnUserProfile`, 15000)
            .api.element('@confirmCheckBox', (result) => {
                //check if geolocation is requested
                if (result.status != -1) {
                    console.log("Starting Geolocation Page")
                    //check and click confirm checkbox
                    this
                        .click('@selectStateField')
                        .click('@FloridaOption')
                        .click('@confirmCheckBox')
                        .pause(500)
                        .click('@btnContinue')
                        .pause(1000)//not ideal but will make sure the page is properly loaded
                } else {
                    console.log("- Skipping Geolocation Page Assertions")
                }
            })
        return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}