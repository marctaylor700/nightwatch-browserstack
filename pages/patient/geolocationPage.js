const elements = {
    confirmCheckBox: `[data-test-id='confirmCheckBox']`,
    btnContinue: `[data-test-id='continue']`,
    btnUserProfile: `[data-test-id='userProfileButton']`,
};

const commands = [{

    confirmGeolocation() {
        let self = this;
        this
            .waitForElementVisible(`@btnUserProfile`, 15000)
            .api.element('@confirmCheckBox', function (result) {
                //check if geolocation is requested
                if (result.status != -1) {
                    console.log("Starting Geolocation Page")
                    //check and click confirm checkbox
                    self
                        .verify.elementPresent('@confirmCheckBox')
                        .click('@confirmCheckBox')
                        .pause(500)
                        //check and click continue button
                        .verify.elementPresent('@btnContinue')
                        .click('@btnContinue')
                } else {
                    console.log("Skipping Geolocation Page")
                }
            })
        return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}