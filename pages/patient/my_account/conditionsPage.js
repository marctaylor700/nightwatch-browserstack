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

    //page title : "Conditions"
    title: '.eVisitAppPanelBaseTitle',

    //main list of items
    list: '.eVisitAppList',

    //each entry in the list of items
    itemListSaved: '.eVisitAppListItem',

    //Edit button
    btnEdit: `[data-test-id='editMedicalRecord']`,

    //Input textfield caption : "Please list any known conditions"
    inputCaption: '.eVisitAppTextFieldCaption',

    //Input field to add new entries
    inputField: `[data-test-id='listInput']`,

    //Input add button
    btnInput: '.eVisitAppTextFieldIcon',

    //toggle button - Show/Hide list
    btnToggle: `[data-test-id='toggleSuggestions']`,

    //Add and remove entry buttons - This will only consider the last letters from the element, since they can change
    addEntry: `[data-test-id$="Add"]`,
    removeEntry: `[data-test-id$="emove"]`,

    //Save and Cancel buttons for entry changes
    btnSave: `[data-test-id="saveChanges"]`,
    btnCancel: `[data-test-id="cancelChanges"]`

};

const commands = [{

    /*
    *    This function make sure the page is completelly loaded before continuing, using any specified element as a trait
    */
    accessConditionsPage(email, password){
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
            .waitForElementVisible('@conditionsSection')
            .pause(1000)
            .click('@conditionsSection')
            .waitForElementVisible('@btnEdit')
        return this
    },

    /*
    *   This function allows the test to continue without the need of login
    */
    openSectionfromMenu(){
        return this.waitForElementVisible('@conditionsSection')
        .click('@conditionsSection')
        .waitForElementVisible('@btnEdit')
    },

    /*
    *    This function cleans any previous added entries in the health record data
    */
    cleanList() {
        return this.api.elements('@itemListSaved', result => {
            const numElements = result.value.length;

            if (numElements > 0) {
                this.click(`@btnEdit`)
                this.waitForElementVisible(`@removeEntry`)
                for (i = 1; i <= numElements; i++) {
                    this.click('@removeEntry')
                }
                this.expect.element(`@btnToggle`).text.to.contain('Show list')
                this.click('@btnSave')
            }
            this.expect.element('@list').text.to.contain('No known conditions')
        });
    },

    /*
    *    This function adds the first default option to the list
    */
    addDefaultEntry() {
        return this.click(`@btnEdit`)
            .waitForElementVisible(`@btnToggle`)
            .click(`[data-test-id='toggleSuggestions']`) //show
            .click('@addEntry')
            .click('@btnSave')
            .waitForElementVisible(`@btnEdit`,10000)
    },

    /*
    *    This function adds custom entry with text "Conditions - Automation"
    */
    addCustomEntry() {
        var newCustomText = "Conditions - Automation"
        return this.click(`@btnEdit`)
            .waitForElementVisible(`@btnToggle`)
            .setValue('@inputField', newCustomText)
            .click('@btnInput')
            .click('@btnSave')
            .waitForElementVisible(`@btnEdit`,10000)
    },

    /*
    *   This function checks if a certain number of elements is displayed in the list
    *   Input: Expected number of items in the list
    */
    count(NumOfExpectedElementsInTheList) {
        return this.api.elements('@itemListSaved', result => {
            const numOfElementsInTheList = result.value.length;
            this.assert.equal(numOfElementsInTheList, NumOfExpectedElementsInTheList);
        });
    },

}];

module.exports = {
    elements: elements,
    commands: commands
}