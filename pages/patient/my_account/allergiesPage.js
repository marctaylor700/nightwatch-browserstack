const elements = {
    //all menu items
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

    // Medication Allergies
    medicationAllergiesEditButton: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(1) [data-test-id="editMedicalRecord"]`,
    medicationAllergiesTitle: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBaseTitle`,
    medicationAllergiesList: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(1) .eVisitAppList`,
    medicationAllergiesSavedItems: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(1) .eVisitAppListItem`,

    // General Allergies
    generalAllergiesEditButton: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(2) [data-test-id="editMedicalRecord"]`,
    generalAllergiesTitle: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(2) .eVisitAppPanelBaseTitle`,
    generalAllergiesList: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(2) .eVisitAppList`,
    generalAllergiesSavedItems: `.eVisitAppPanelBase:nth-child(1) .eVisitAppPanelBase:nth-child(2) .eVisitAppListItem`,

    // Edit Items:

    // Input textfield caption : "Please list any known XXXXX"
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
    accessAllergiesPage(email, password) {
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
            .waitForElementVisible('@allergiesSection')
            .pause(1000)
            .click('@allergiesSection')
            .waitForElementVisible('@medicationAllergiesEditButton')
        return this
    },

    /*
    *   This function allows the test to continue without the need of login
    */
    openSectionfromMenu() {
        return this.waitForElementVisible('@allergiesSection')
            .click('@allergiesSection')
            .waitForElementVisible('@medicationAllergiesEditButton')
    },

    /*
    *    This function cleans any previous added entries in the health record data
    */
    cleanList(allergyType, message) {
        return this.api.elements(('@' + allergyType + 'SavedItems'), result => {
            const numElements = result.value.length;
            if (numElements > 0) {
                this.click(('@' + allergyType + 'EditButton'))
                this.waitForElementVisible(`@removeEntry`)
                for (i = 1; i <= numElements; i++) {
                    this.click('@removeEntry')
                }
                this.expect.element(`@btnToggle`).text.to.contain('Show list')
                this.click('@btnSave')
            }
            this.expect.element(('@' + allergyType + 'List')).text.to.contain(message)
        });
    },
    /*
    *    This function adds the first default option to the list
    */
    addDefaultEntry(allergyType) {
        return this.click(('@' + allergyType + 'EditButton'))
            .waitForElementVisible(`@btnToggle`,10000)
            .click(`[data-test-id='toggleSuggestions']`) //show
            .click('@addEntry')
            .click('@btnSave')
            .waitForElementVisible(('@' + allergyType + 'EditButton'),10000)
    },

    /*
    *    This function adds custom entry with any specified text
    */
    addCustomEntry(allergyType, customText) {
        return this.click(('@' + allergyType + 'EditButton'))
            .waitForElementVisible(`@btnToggle`,10000)
            .setValue('@inputField', customText)
            .click('@btnInput')
            .click('@btnSave')
            .waitForElementVisible(('@' + allergyType + 'EditButton'),10000)
    },

    /*
    *   This function checks if a certain number of elements is displayed in the list
    *   Input: Expected number of items in the list
    */
    count(allergyType, NumOfExpectedElementsInTheList) {
        return this.api.elements(('@' + allergyType + 'SavedItems'), result => {
            const numOfElementsInTheList = result.value.length;
            this.assert.equal(numOfElementsInTheList, NumOfExpectedElementsInTheList);
        });
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}