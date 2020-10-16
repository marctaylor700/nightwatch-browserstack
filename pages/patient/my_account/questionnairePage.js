const elements = {
    personalInfoSection: `[data-test-id='personalInfoSection']`,
    insuranceSection: `[data-test-id='insuranceSection']`,
    allergiesSection: `[data-test-id='allergiesSection']`,
    medicationsSection: `[data-test-id='medicationsSection']`,
    conditionsSection: `[data-test-id='conditionsSection']`,
    proceduresSection: `[data-test-id='proceduresSection']`,
    familyHistorySection: `[data-test-id='familyHistorySection']`,
    questionnaireSection: `[data-test-id='questionnaireSection']`,
    pharmacySection: `[data-test-id='pharmacySection']`,
    paymentsSection: `[data-test-id='paymentsSection']`,
    settingsSection: `[data-test-id='settingsSection']`,

    //request a visit button
    btnRequestVisit: `data-test-id=['requestVisit']`,

    //page title : "Questionnaire"
    title: '.eVisitAppPanelBaseTitle',

    //Edit button
    btnEdit: `[data-test-id='updateMiscQuestions']`,

    //Answers buttons
    firstQuestionNo: `[data-test-id='question1No']`,
    firstQuestionYes: `[data-test-id='question1Yes']`,
    secondQuestionNo: `[data-test-id='question2No']`,
    secondQuestionYes: `[data-test-id='question2Yes']`,

    //The div inside each button which contains the color property used to indicate active/inactive button
    firstQuestionNoColoredDiv: `[data-test-id="question1No"]>div`,
    firstQuestionYesColoredDiv: `[data-test-id="question1Yes"]>div`,
    secondQuestionNoColoredDiv: `[data-test-id="question2No"]>div`,
    secondQuestionYesColoredDiv: `[data-test-id="question2Yes"]>div`,

    //alert banner on top if prohibited action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    //button to close alert banner
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    //Save and Cancel buttons for entry changes
    btnSave: `[data-test-id="saveChanges"]`,
    btnCancel: `[data-test-id="cancelChanges"]`

};

const commands = [{

    /*
    *    This function make sure the page is completelly loaded before continuing, using any specified element as a trait
    */
    accessQuestionnairePage(email, password) {
        this
        const loginPage = this.api.page.loginPage()
        const geolocationPage = this.api.page.patient.geolocationPage()
        const landingPage = this.api.page.patient.landingPage()
        loginPage
            .goToPracticeLoginPage()
            .userLogin(email, password)
        geolocationPage.confirmGeolocation()
        landingPage.selectMyAccount();
        this
            .waitForElementVisible('@questionnaireSection')
            .pause(1000)
            .click('@questionnaireSection')
            .waitForElementVisible('@btnEdit')
        return this
    },

    /*
    *   This function will test the toast message in case there are no responses yet in the questionnaire
    */
    checkEventualToastMessage() {
        this
            .click('@btnEdit')
            .api.element('css selector', `.eVisitAppDynamicFieldList [style*='background-color: rgb(42, 178, 188);']`, (result) => {
                //in case there is no element selected yet
                if (result.status == -1) {
                    this.click('@btnSave')
                    this.waitForElementVisible('@toast')
                    this.expect.element('@toast').text.to.contain('There is more than one field that is required.')
                    this.click('@btnCloseToast')
                    this.click('@btnCancel')
                    //or else just ignore it and revert to previous state
                } else {
                    this.click('@btnCancel')
                }
            })
        return this
    },

    /*
    *   This function will change all responses to "Yes"
    */
    setAnswersToYes() {
        return this.click('@btnEdit')
            .waitForElementVisible('@btnSave')
            .click('@firstQuestionYes')
            .click('@secondQuestionYes')
            .click('@btnSave')
    },

    /*
    *   This function will change all responses to "No"
    */
    setAnswersToNo() {
        return this.click('@btnEdit')
            .waitForElementVisible('@btnSave')
            .click('@firstQuestionNo')
            .click('@secondQuestionNo')
            .click('@btnSave')
    },

    /*
    *   This function will make sure all questions have "Yes" as answer
    */
    verifyAnswersAreYes() {
        this.waitForElementVisible('@btnEdit')
        this.click('@btnEdit')
        this.expect.element('@firstQuestionNoColoredDiv').to.have.css('background-color').which.equals('rgba(255, 255, 255, 1)')
        this.expect.element('@firstQuestionYesColoredDiv').to.have.css('background-color').which.equals('rgba(42, 178, 188, 1)')
        this.expect.element('@secondQuestionNoColoredDiv').to.have.css('background-color').which.equals('rgba(255, 255, 255, 1)')
        this.expect.element('@secondQuestionYesColoredDiv').to.have.css('background-color').which.equals('rgba(42, 178, 188, 1)')
        this.click('@btnSave')
        return this
    },

    /*
    *   This function will make sure all questions have "No" as answer
    */
    verifyAnswersAreNo() {
        this.waitForElementVisible('@btnEdit')
        this.click('@btnEdit')
        this.expect.element('@firstQuestionNoColoredDiv').to.have.css('background-color').which.equals('rgba(42, 178, 188, 1)')
        this.expect.element('@firstQuestionYesColoredDiv').to.have.css('background-color').which.equals('rgba(255, 255, 255, 1)')
        this.expect.element('@secondQuestionNoColoredDiv').to.have.css('background-color').which.equals('rgba(42, 178, 188, 1)')
        this.expect.element('@secondQuestionYesColoredDiv').to.have.css('background-color').which.equals('rgba(255, 255, 255, 1)')
        this.click('@btnSave')
        return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}