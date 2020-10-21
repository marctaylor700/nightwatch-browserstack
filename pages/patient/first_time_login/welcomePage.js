// Array with every piece of text available inside the welcome page
var TextFromPanel;

const elements = {

    btnUserProfile: `[data-test-id='userProfileButton']`,

    // Welcome items
    welcomeContainer: `[data-test-id="sceneContainer/Page/enrollment/EnrollmentSuccessPage"]`,
    welcomeImage: `.eVisitAppBasePageMainColumn .eVisitAppIconIcon`,
    btnContinue: `[data-test-id="continue"]`,
};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible(`@welcomeImage`, 15000)
    },

    /*
    *   Verify if welcome message is correct
    *   Input: None
    */
    checkWelcomeText() {
        this.waitForElementVisible(`@welcomeImage`, 15000)
        this.getText('@welcomeContainer', (result) => {
            // Save all text displayed in the panel as an array
            TextFromPanel = result.value.split("\n"); // Temporarily used to save the array
        })
        this.pause(500)
        this.perform(() => {
            // Compare welcome page message with expected value
            console.log("- Assertions to verify welcome page has all the expected texts:")

            this.assert.equal(TextFromPanel[1], 'Welcome to Omega!')
            this.assert.equal(TextFromPanel[2], 'You have successfully completed your account registration. You can now request to been seen virtually.')
        })

        return this
    },

    /*
    *   Skip welcome and go to the next page
    *   Input: None
    */
    skipWelcomePage() {
        this
            .waitForElementVisible(`@btnContinue`, 15000)
            .click('@btnContinue')
        return this
    },

}];

module.exports = {
    elements: elements,
    commands: commands
}