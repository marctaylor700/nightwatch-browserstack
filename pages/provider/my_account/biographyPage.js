var providerName
var providerSpecialty
var providerAddress1
var providerAddress2
var providerAddress3

const elements = {
    // My Account menu items
    personalInfoSection: `[data-test-id='personalInfoSection']`,
    biographySection: `[data-test-id="myBioSection"]`,
    practiceSection: `[data-test-id="practiceSection"]`,
    availabilitySection: `[data-test-id="availabilitySection"]`,
    notificationsSection: `[data-test-id="notificationsSection"]`,
    reportsSection: `[data-test-id="reportsSection"]`,
    settingsSection: `[data-test-id="settingsSection"]`,

    // Biography page
    biographyContainer: `.eVisitAppPagerWestPageContainer`,
    biographyIcon: `.eVisitAppPagerWestPageContainer .eVisitAppIconIcon`,
    biographyText: `.eVisitAppVerbiageView`,
    unpublishButton: `[data-test-id="togglePublished"]`,
    bioGeneratorButton: `[data-test-id="beginBioGenerator"]`,
    bioHTMLButton: `[data-test-id="writeBio"]`,
    continueButton: `[data-test-id="continue"]`,

    // Bio Generator
    educationTab: `[data-test-id="educationTab"]`,
    specialtyTab: `[data-test-id="specialtyTab"]`,
    awardsTab: `[data-test-id="awardsRecognitionsTab"]`,
    hobbiesTab: `[data-test-id="hobbiesTab"]`,
    bioBackButton: `[data-test-id="bioGeneratorBack"]`,
    bioNextButton: `[data-test-id="bioGeneratorNext"]`, //Also "Generate" button
    bioAddSection: `[data-test-id="addSection"]`,
    bioDeleteSection: `.eVisitAppForm .eVisitAppIconIcon`, //Only available after adding section

    // Bio Generator > Education
    educationQuestion1: `[data-test-id="question1"]`,
    educationQuestion2: `[data-test-id="question2"]`,
    educationQuestion3: `[data-test-id="question3"]`,
    educationQuestion4: `[data-test-id="question4"]`,

    // Bio Generator > Specialty
    specialtyQuestion1: `[data-test-id="question1"]`,
    specialtyQuestion2: `[data-test-id="question2"]`, //Only available after adding section

    // Bio Generator > Awards
    awardsQuestion1: `[data-test-id="question1"]`,
    awardsQuestion2: `[data-test-id="question2"]`,
    awardsQuestion3: `[data-test-id="question3"]`,
    awardsQuestion4: `[data-test-id="question4"]`,

    // Bio Generator > Hobbies
    hobbiesQuestion1: `[data-test-id="question1"]`,
    hobbiesQuestion2: `[data-test-id="question2"]`,

    // HTML Editor
    textBox: `[title="Rich Text Area. Press ALT-0 for help."]`,
    boldButton: `[title="Bold"]`,
    italicButton: `[title="Italic"]`,
    textColorButton: `[title="Text color"]`,
    textColorPicker: `[title="Text color"] [role="presentation"]:nth-child(2)`,
    backgroundColorButton: `[title="Background color"]`,
    backgroundColorPicker: `[title="Background color"] [role="presentation"]:nth-child(2)`,
    saveNewBiography: `[data-test-id="saveProfile"]`,
    updateNewBiography: `[data-test-id="togglePublish"]`,

};

const commands = [{

    /*
    *   Will make sure the page is completely loaded before continuing, using any specified element as a trait
    *   Input: None
    */
    accessBiographyPage() {
        this
        const loginPage = this.api.page.loginPage()
        const waitingRoomPage = this.api.page.provider.waitingRoomPage()
        loginPage
            .goToPracticeLoginPage()
            .userLogin(this.api.globals.providerEmail, this.api.globals.providerPassword)
        waitingRoomPage.selectMyAccount();
        this
            .waitForElementVisible('@biographySection')
            .pause(1000)
            .click('@biographySection')
            .waitForElementVisible('@biographyIcon')

        return this
    },

    /*
    *   Will check all information in the provider information section of the biography page
    *   Input: Name, specialty and address expected to be on screen
    */
    checkProviderInfo(name, specialty, address1, address2, address3) {

        this.getText('@biographyContainer', (result) => {
            // Save all text displayed in the panel as an array
            TextFromPanel = result.value.split("\n"); // Temporarily used to save the array
            providerName = TextFromPanel[2]
            providerSpecialty = TextFromPanel[3]
            providerAddress1 = TextFromPanel[4]
            providerAddress2 = TextFromPanel[5]
            providerAddress3 = TextFromPanel[6]
        })

        this.perform(() => {
            // Compare biography information on screen with expected values
            console.log("- Assertions to verify biography information on screen:")
            this.assert.equal(providerName, name)
            this.assert.equal(providerSpecialty, specialty)
            this.assert.equal(providerAddress1, address1)
            this.assert.equal(providerAddress2, address2)
            this.assert.equal(providerAddress3, address3)
        })

        return this
    },

    /*
    *   Erase all text available inside the HTML textbox
    *   Input: None
    */
    cleatHTMLTextbox() {
        this
            // Get the dinamic ID for the textbox
            .getAttribute('@textBox', 'id', (result) => {
                // Change focus to another frame on the page. The textbox in this case
                this.api.frame(result.value)
                    // Get the text that should be erased
                    // Cant use element mapping inside a different iFrame
                    .getText('[data-id*="tiny"]', (result) => {
                        // Generate an array with the same number of backspaces as the text inside the textbox
                        let backspace = new Array(result.value.length + 1).join('\u0008');
                        // Set the textbox as this new array, therefore erasing the text with the correct amount of backspaces
                        this.setValue('[data-id*="tiny"]', backspace)
                    })
                // Change back to the default frame of the page
                this.api.frame()
            });
        return this
    },

    /*
    *   Erase all text saved as biography and save it
    *   Input: None
    */
    clearBiography() {
        // Consider if there is a biography already saved to click on "Unpublish and edit"
        this.api.element('@unpublishButton', (result) => {
            if (result.status != -1) {
                this.click('@unpublishButton')
            }
        })
        // Expect the textbox to appear on screen with up to 10 seconds of loading time
        this.waitForElementPresent('@textBox', 10000)

            //Make sure the textbox is empty
            .cleatHTMLTextbox()

        // Click on 'Update'
        this.click('@updateNewBiography')
            // Expect the 'Unpublish' button to appear meaning the action was saved correctly
            .waitForElementPresent('@unpublishButton')
        // Make sure the text is 'undefined', which is the expected empty value
        this.expect.element(`@biographyText`).text.to.contain('undefined')
        return this
    },

    /*
    *   Start the bio generator proccess and answer all questions, adding sections and making sure the final text is the one expected
    *   Input: None
    */
    addBioGenerator() {
        this
            // Open bio generator
            .waitForElementPresent('@unpublishButton')
            .click('@unpublishButton')
            .waitForElementPresent('@bioGeneratorButton')
            .click('@bioGeneratorButton')
            .click('@continueButton')

            // Add responses for the first tab - Education
            .editTextField('@educationQuestion1', 'Education Question 1')
            .editTextField('@educationQuestion2', 'Education Question 2')
            .editTextField('@educationQuestion3', 'Education Question 3')
            .editTextField('@educationQuestion4', 'Education Question 4')
            .click('@bioNextButton')

            // Add responses for the second tab - Specialty
            .editTextField('@specialtyQuestion1', 'Specialty Question 1')
            .click('@bioAddSection')
            .editTextField('@specialtyQuestion2', 'Specialty Question 2')
            .click('@bioNextButton')

            // Add responses for the third tab - Awards
            .editTextField('@awardsQuestion1', 'Awards Question 1')
            .editTextField('@awardsQuestion2', 'Awards Question 2')
            .click('@bioAddSection')
            .editTextField('@awardsQuestion3', 'Awards Question 3')
            .editTextField('@awardsQuestion4', 'Awards Question 4')
            .click('@bioNextButton')

            // Add responses for the forth tab - Hobbies
            .editTextField('@hobbiesQuestion1', 'Hobbies Question 1')
            .click('@bioAddSection')
            .editTextField('@hobbiesQuestion2', 'Hobbies Question 2')
            // Delete the section included
            .click('@bioDeleteSection')
            .click('@bioNextButton')

            // Wait for the textbox to appear
            .waitForElementPresent('@textBox', 10000)

        // Click on 'Update'
        this.click('@updateNewBiography')
            // Expect the 'Unpublish' button to appear meaning the action was saved correctly
            .waitForElementPresent('@unpublishButton')
        // Make sure the text is the one expected with all answers accordingly to the automated inputs
        this.expect.element(`@biographyText`).text.to.contain('Automation Provider is a Specialty Question 1, Specialty Question 2 specialist who received her undergraduate degree from Education Question 1 in Education Question 2. After Education Question 1, she completed her medical school education at Education Question 3 in Education Question 4. Automation Provider has been recognized for Awards Question 1 in Awards Question 2 and Awards Question 3 in Awards Question 4. She enjoys Hobbies Question 1')
        return this
    },


    /*
    *   Add text in the HTML textbox
    *   Input: The text that should be included
    */
    addTextHTMLTextbox(text) {
        this
            // Get the dinamic ID for the textbox
            .getAttribute('@textBox', 'id', (result) => {
                // Change focus to another frame on the page. The textbox in this case
                this.api.frame(result.value)
                // Insert new value in textbox
                // Cant use element mapping inside a different iFrame
                this.setValue('[data-id*="tiny"]', text)
                // Change back to the default frame of the page
                this.api.frame()
            });
        return this
    },

    /*
    *   This function will add a custom text to the HTML editor and save it
    *   Input: The font color and background color that should be used
    */
    addBioHTML(textColor, backgroundColor) {
        this
            .waitForElementPresent('@unpublishButton')
            .click('@unpublishButton')
            .waitForElementPresent('@bioHTMLButton')
            .click('@bioHTMLButton')
            .click('@continueButton')

            // Make sure there is no text inside the textbox
            .cleatHTMLTextbox()

            // Add simple text
            .addTextHTMLTextbox("Automation ")

            // Add text in bold
            .click('@boldButton')
            .addTextHTMLTextbox("Automation_Bold \n")

            // Add text in bold and italic
            .click('@italicButton')
            .addTextHTMLTextbox("Automation_Bold_Italic ")

            // Add text in italic
            .click('@boldButton')
            .addTextHTMLTextbox("Automation_Italic \n")

            // Add text in selected font color
            .click('@italicButton')
            .click('@textColorPicker')
            .click('[title="' + textColor + '"]')
            .addTextHTMLTextbox("Automation_Colored_Text \n")

            // Add text in selected background color
            .click('@backgroundColorPicker')
            .click('[title="' + backgroundColor + '"]')
            .addTextHTMLTextbox("Automation_Colored_Text_Colored_Background ")

        // Click on 'Update'
        this.click('@updateNewBiography')
            // Expect the 'Unpublish' button to appear meaning the action was saved correctly
            .waitForElementPresent('@unpublishButton')
        // Make sure the text corresponds to all the text included
        this.expect.element(`@biographyText`).text.to.contain('Automation Automation_Bold \nAutomation_Bold_Italic Automation_Italic \nAutomation_Colored_Text \nAutomation_Colored_Text_Colored_Background ')
        
        return this
    },
}];

module.exports = {
    elements: elements,
    commands: commands
}