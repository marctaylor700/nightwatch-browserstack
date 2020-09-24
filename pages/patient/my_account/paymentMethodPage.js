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
    btnRequestVisit: `data-test-id=['requestVisit']`,

    //saved credit card
    textFieldCaption: `.eVisitAppTextFieldCaption`,
    savedCCNumber: `[name='number']`,
    btnUpdateBilling: `[data-test-id='updateBillingInformation']`,

    //MODALS:
    //modal to erase saved credit card
    modal: `.eVisitAppModal`,
    btnConfirmModal: `[data-test-id="confirmModalConfirm"]`,
    btnDenyModal: `[data-test-id="confirmModalDeny"]`,
    //modal with CVC help
    btnCloseHelpModal: `[data-test-id="cvcLocationModalClose"]`,

    //add new card screen elements
    ccName: `[data-test-id="cardHolderName"]`,
    ccNumber: `[data-test-id="ccNumber"]`,
    ccDate: `[data-test-id="expiryDate"]`,
    ccCvc: `[data-test-id="cvcField"]`,
    ccCvcHelp: `[data-test-id="cvcWhere"]`,
    saveNewCreditCard: `[data-test-id="saveCreditCard"]`,

    //alert banner on top if prohibited action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    //button to close alert banner
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

};

const commands = [{

    /*
    *    This function make sure the page is completelly loaded before continuing, using any specified element as a trait
    */
    accessPaymentMethodPage(email, password) {
        const loginPage = this.api.page.loginPage()
        const geolocationPage = this.api.page.patient.geolocationPage()
        const landingPage = this.api.page.patient.landingPage()
        loginPage
            .goToPracticeLoginPage()
            .patientLogin(email, password)
        geolocationPage.confirmGeolocation()
        landingPage.selectMyAccount();
        this
            .waitForElementVisible('@paymentsSection')
            .pause(500)
            .click('@paymentsSection')
            .pause(1000)//This pause is necessary since there is no element to use as a trait in this page
        return this
    },

    /*
    *    This function will make sure there is no card registered
    */
    eraseRegisteredCard() {
        this
            .api.element(`@btnUpdateBilling`, (result) => {
                if (result.status != -1) {
                    this.click('@btnUpdateBilling')
                    this.waitForElementVisible('@modal')
                    this.click('@btnConfirmModal')
                    this.waitForElementVisible('@ccName')
                    this.pause(2000)
                }
            })
        return this
    },

    /*
    *   Try to save a credit card without any information filled in
    */
    checkToastFieldsRequired() {
        return this.click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("There is more than one field that is required.")
            .click('@btnCloseToast')
    },

    /*
    *    Try to save a credit card without the name of the credit card holder
    */
    checkToastNameRequired() {
        return this.clearValue2(`@ccName`)
            .editTextField('@ccNumber', "4111111111111111")
            .editTextField('@ccDate', '12/2025')
            .editTextField('@ccCvc', '123')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Name on Card required.")
            .click('@btnCloseToast')
            .setValue('@ccName', "Card Holder")
    },

    /*
    *   Try to save a credit card without the number
    */
    checkToastNumberRequired() {
        return this.clearValue2(`@ccNumber`)
            .editTextField('@ccDate', '12/2025')
            .editTextField('@ccCvc', '123')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Card Number required.")
            .click('@btnCloseToast')
    },

    /*
    *   Try to save a credit card with a invalid number
    */
    checkToastNumberInvalid() {
        return this.editTextField('@ccNumber', "4321")
            .editTextField('@ccDate', '12/2025')
            .editTextField('@ccCvc', '123')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("The card number is not a valid credit card number.")
            .click('@btnCloseToast')
    },

    /*
    *   Try to save a credit card without the date
    */
    checkToastDateRequired() {
        return this.editTextField('@ccNumber', "4111111111111111")
            .clearValue2(`@ccDate`)
            .editTextField('@ccCvc', '123')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Expiration date required.")
            .click('@btnCloseToast')
    },

    /*
    *   Try to save a credit card with a invalid date
    */
    checkToastDateInvalid() {
        return this.editTextField('@ccNumber', "4111111111111111")
            .editTextField('@ccDate', '12/20')
            .editTextField('@ccCvc', '123')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Invalid date specified for Expiration Date.")
            .click('@btnCloseToast')
    },

    /*
    *   Try to save a credit card with a expired date (any date before today would work here)
    */
    checkToastDateExpired() {
        return this.editTextField('@ccNumber', "4111111111111111")
            .editTextField('@ccDate', '12/2011')
            .editTextField('@ccCvc', '123')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Your card's expiration year is invalid.")
            .click('@btnCloseToast')
    },

    /*
    *   Try to save a credit card without the cvc
    */
    checkToastCvcRequired() {
        return this.editTextField('@ccNumber', "4111111111111111")
            .editTextField('@ccDate', '12/2025')
            .clearValue2(`@ccCvc`)
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Security Code required.")
            .click('@btnCloseToast')
    },

    /*
    *   Try to save a credit card with a invalid cvc
    */
    checkToastCvcInvalid() {
        return this.editTextField('@ccNumber', "4111111111111111")
            .editTextField('@ccDate', '12/2025')
            .editTextField('@ccCvc', '12')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@toast', 15000)
            .checkToastMessage("Your card's security code is invalid.")
            .click('@saveNewCreditCard')
            .click('@btnCloseToast')
    },

    /*
    *   This function will check the behaviour and texts of the CVC's help modal
    */
    checkCvcHelpModal() {
        this.click('@ccCvcHelp')
            .waitForElementVisible('@btnCloseHelpModal')
        this.expect.element('@modal').text.to.contain('Where is CVC?')

        this.click('@btnCloseHelpModal')
        return this
    },

    /*
    *   This function will insert all info needed for a credit card and save it
    */
    saveNewCreditCard() {
        this.editTextField('@ccNumber', "4242424242424242")
            .editTextField('@ccDate', '12/2025')
            .editTextField('@ccCvc', '1234')
            .click('@saveNewCreditCard')
            .waitForElementVisible('@btnUpdateBilling', 15000)
        this.expect.element('@savedCCNumber').value.to.contain('xxxx xxxx xxxx 4242')
        return this
    },
}];

module.exports = {
    elements: elements,
    commands: commands
}
