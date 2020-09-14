const elements = {
    confirmCheckBox: `[data-test-id='confirmCheckBox']`,
    btnContinue: `[data-test-id='continue']`
};

const commands = [{

    confirmGeolocation() {
        let self = this;
        this
            .api.element('@confirmCheckBox', function (result) {
                //check if geolocation is requested
                if (result.status != -1) {
                    console.log("Starting Geolocation Page")
                    //check and click confirm checkbox
                    self
                        .verify.elementPresent('@confirmCheckBox')
                        .click('@confirmCheckBox')
                        //check and click continue button
                        .verify.elementPresent('@btnContinue')
                        .click('@btnContinue')
                        //pause
                        .pause(6000)
                } else {
                    console.log("Skipping Geolocation Page")
                    self.pause(6000)
                }
            })
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}