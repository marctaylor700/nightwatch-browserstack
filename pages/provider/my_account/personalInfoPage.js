const elements = {
    personalInfoSection: `[data-test-id='personalInfoSection']`,

    firstName: `[data-test-id='firstName']`,
    middleName: `[data-test-id='middleName']`,
    lastName: `[data-test-id='lastName']`,
    addressLine1: `[data-test-id='addressLine1']`,
    addressLine2: `[data-test-id='addressLine2']`,
    city: `[data-test-id='city']`,
    state: `[data-test-id="state"]`,
    zipCode: `[data-test-id="zipCode"]`,
    phoneCell: `[data-test-id="phoneCell"]`,
    state: `input[data-test-id="state"]`,
    dateOfBirth: `[data-test-id="dob"]`,
    gender: `[data-test-id="gender"][name="sex"]`,
    timeZone: `[data-test-id="timeZoneSelect"][name="timezone"]`,
    specialty: `[data-test-id="specialty"]`,
    
    btnUpdate: `div.eVisitAppNavigationButtons:nth-child(3) > div:nth-child(1) > div:nth-child(1)`,
};

const commands = [{
    
    accessPersonalInfoPage(){
        this
            const loginPage = this.api.page.loginPage()
            const waitingRoomPage = this.api.page.provider.waitingRoomPage()

            loginPage
                .goToPracticeLoginPage()
                .patientLogin(this.api.globals.providerEmail, this.api.globals.providerPassword)
                waitingRoomPage.selectMyAccount();
        this.verify.elementPresent('@personalInfoSection')
        return this
    },

    editPersonalInfo(firstNameValue, middleNameValue, lastNameValue, addressLine1Value, addressLine2Value, cityValue, stateValue,
                        zipCodeValue, phoneCellValue, dateOfBirthValue, genderValue, specialty, timeZoneValue) {
        this
            .editTextField('@firstName', firstNameValue)
            .editTextField('@middleName', middleNameValue)
            .editTextField('@lastName', lastNameValue)
            .editTextField('@addressLine1', addressLine1Value)
            .editTextField('@addressLine2', addressLine2Value)
            .editTextField('@city', cityValue)
            .editComboboxField('@state', stateValue)
            .editTextField('@zipCode', zipCodeValue)
            .editTextField('@phoneCell', phoneCellValue)
            .editTextField('@dateOfBirth', dateOfBirthValue)
            .editComboboxField('@gender', genderValue)
            .editTextField('@specialty', specialty)
            .editComboboxField('@timeZone', timeZoneValue)
            .clickUpdateButton()
        return this
    },
    editComboboxField(locator, value) {
        return this
            .click(locator)
            .waitForElementVisible(locator)
            .click(`[data-test-id=${value}]`)
    },
    clickUpdateButton() {
        return this
            .pause(2000)
            .click('@btnUpdate')
            .pause(2000)
    },
    checkPersistence(firstNameValue, middleNameValue, lastNameValue, addressLine1Value, addressLine2Value, cityValue, stateValue,
        zipCodeValue, phoneCellValue, dateOfBirthValue, genderValue, specialtyValue, timeZoneValue){
            this.verify.attributeEquals('@firstName', 'value', firstNameValue);
            this.verify.attributeEquals('@middleName','value', middleNameValue);
            this.verify.attributeEquals('@lastName','value', lastNameValue);
            this.verify.attributeEquals('@addressLine1','value', addressLine1Value);
            this.verify.attributeEquals('@addressLine2','value', addressLine2Value);
            this.verify.attributeEquals('@city','value', cityValue);
            this.verify.attributeEquals('@state','value', stateValue);
            this.verify.attributeEquals('@zipCode','value', zipCodeValue);
            this.verify.attributeEquals('@phoneCell','value', phoneCellValue);
            this.verify.attributeEquals('@dateOfBirth','value', dateOfBirthValue);
            this.verify.attributeEquals('@gender','value', genderValue);
            this.verify.attributeEquals('@specialty','value', specialtyValue);
            this.verify.attributeEquals('@timeZone','value', timeZoneValue)
            return this
        }
}];

module.exports = {
    elements: elements,
    commands: commands
}