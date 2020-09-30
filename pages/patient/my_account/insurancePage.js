const elements = {
    //menu items
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
    requestVisitButton: `[data-test-id='requestVisit']`,

    //alert banner on top if prohibited action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    //button to close alert banner
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    //insurance fields
    noInsuranceCheckBox: `[data-test-id="noInsurance"]`,
    insuranceCompanyField: `[data-test-id="question2"]`,
    relationPolicyHolderComboBox: `[data-test-id="question3"]`,
    idNumberField: `[data-test-id="question7"]`,
    groupNumerField: `[data-test-id="question8"]`,
    policyTypeComboBox: `[data-test-id="question9"]`,
    insurancePhoneField: `[data-test-id="question10"]`,
    agreementCheckBox: `[data-test-id="acceptAgreement"]`,

    //update button
    updateInsuranceButton: `[data-test-id='updateInsurance']`,

    //Insurance name option
    //This ID only applies for the exact text "Automation Insurance Test", since the ID is generated dinamically for any text used
    insuranceCompanyText: `[data-test-id="NotundefinednFileAutomationInsuranceTestOption"]`,

    //Policy Holder relationship options
    relationPolicyHolderOption1: `[data-test-id="SelfOption"]`,
    relationPolicyHolderOption2: `[data-test-id="SpouseOption"]`,
    relationPolicyHolderOption3: `[data-test-id="FatherOption"]`,
    relationPolicyHolderOption4: `[data-test-id="MotherOption"]`,
    relationPolicyHolderOption5: `[data-test-id="BrotherOption"]`,
    relationPolicyHolderOption6: `[data-test-id="SisterOption"]`,
    relationPolicyHolderOption7: `[data-test-id="AuntOption"]`,
    relationPolicyHolderOption8: `[data-test-id="UncleOption"]`,
    relationPolicyHolderOption9: `[data-test-id="GrandfatherOption"]`,
    relationPolicyHolderOption10: `[data-test-id="GrandmotherOption"]`,
    relationPolicyHolderOption11: `[data-test-id="SonOption"]`,
    relationPolicyHolderOption12: `[data-test-id="DaughterOption"]`,
    relationPolicyHolderOption13: `[data-test-id="LegalundefinedustodianundefineduardianOption"]`,

    //Policy types options
    policyTypeOption1: `[data-test-id="EPOOption"]`,
    policyTypeOption1: `[data-test-id="HDHPOption"]`,
    policyTypeOption1: `[data-test-id="HMOOption"]`,
    policyTypeOption1: `[data-test-id="POSOption"]`,
    policyTypeOption1: `[data-test-id="PPOOption"]`,
    policyTypeOption1: `[data-test-id="OtherOption"]`,

};

const commands = [{

    /*
    *    This function make sure the page is completelly loaded before continuing, using any specified element as a trait
    */
    accessInsurancePage(email, password) {
        const loginPage = this.api.page.loginPage()
        const geolocationPage = this.api.page.patient.geolocationPage()
        const landingPage = this.api.page.patient.landingPage()
        loginPage
            .goToPracticeLoginPage()
            .patientLogin(email, password)
        geolocationPage.confirmGeolocation()
        landingPage.selectMyAccount();
        this
            .waitForElementVisible('@insuranceSection')
            .pause(500)
            .click('@insuranceSection')
            .waitForElementVisible('@updateInsuranceButton')
        return this
    },

    /*
    *    This function will make sure the option to not use insurance is not selected
    */
    openNewInsurance() {
        this.pause(1000)//this 1sec is necessary to load the page completely
            .api.element('@idNumberField', (result) => {
                //check if the insurance fields are available to edit
                if (result.status == -1) {//-1 means not present
                    this.api.element('@insuranceCompanyField', (result) => {
                        //check if the checkbox is selected
                        if (result.status == -1) {
                            this.click('@noInsuranceCheckBox')
                        }
                        this.editTextField('@insuranceCompanyField', "Automation Insurance Test")
                        this.waitForElementVisible('@insuranceCompanyText', 5000)
                        this.click('@insuranceCompanyText')
                        this.waitForElementVisible('@idNumberField')
                    })
                }
            })
        return this
    },

    /*
    *    This function will test the toast message when the user does not include all necessary info
    */
    checkToastAgreementRequired() {
        return this.waitForElementVisible('@updateInsuranceButton')
            .click('@updateInsuranceButton')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("You must accept the insurance agreement.")
            .click('@btnCloseToast')
    },

    /*
    *    This function will test the option to not use insurance
    */
    checkToastDontUseInsurance() {
        return this.waitForElementVisible('@updateInsuranceButton')
            .click('@noInsuranceCheckBox')
            .click('@updateInsuranceButton')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Successfully updated information!")
            .click('@btnCloseToast')
    },

    /*
    *    This function will add a new insurance company and save it
    */
    addNewInsurance() {
        return this
            .editComboboxField('@relationPolicyHolderComboBox', '@relationPolicyHolderOption1')
            .editTextField('@idNumberField', "123")
            .editTextField('@groupNumerField', "321")
            .editComboboxField('@policyTypeComboBox', '@policyTypeOption1')
            .editTextField('@insurancePhoneField', "5555555555")
            .click('@agreementCheckBox')
            .click('@updateInsuranceButton')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Successfully updated information!")
            .click('@btnCloseToast')
    },

    /*
    *    Auxiliary function to edit comboboxes
    */
    editComboboxField(locator, value) {
        return this
            .click(locator)
            .waitForElementVisible(locator)
            .click(value)
    },

}];

module.exports = {
    elements: elements,
    commands: commands
}
