const elements = {

    btnUserProfile: `[data-test-id='userProfileButton']`,

    // Alert banner on top if alert/success/failed action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    // Profile picture items
    btnBack: `[data-test-id="back"]`,
    btnUpload: `[data-test-id="upload"]`,
    btnSkip: `[data-test-id="skip"]`,
    btnContinue: `[data-test-id="continue"]`,
};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible(`@btnSkip`, 15000)
    },

    /*
    *   Skip profile picture and go to the next page
    *   Input: None
    */
    skipProfilePicture() {
        this
            .waitForElementVisible(`@btnSkip`, 15000)
            .click('@btnSkip')
        return this
    },

}];

module.exports = {
    elements: elements,
    commands: commands
}