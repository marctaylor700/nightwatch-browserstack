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

    


};

const commands = [{
    editPersonalInfo(firstNameValue, middleNameValue, lastNameValue, addressLine1Value, addressLine2Value, cityValue, stateValue,
                        zipCodeValue, phoneCellValue, dateOfBirthValue, genderValue, timeZoneValue) {
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
            .editComboboxField('@timeZone', timeZoneValue)
            .clickUpdateButton()
        return this
    },
    editTextField(locator, value) {
        return this
            .waitForElementVisible(locator)
            //.click(locator)
            .clearValue2(locator)
            .setValue(locator, value)
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
    checkToastMessage(message) {
        return this
            //.pause(3000)
            .waitForElementVisible('@toast')
            .verify.containsText('@toast', message)
    },
    checkPersistence(firstNameValue, middleNameValue, lastNameValue, addressLine1Value, addressLine2Value, cityValue, stateValue,
        zipCodeValue, phoneCellValue, dateOfBirthValue, genderValue, timeZoneValue){
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
            this.verify.attributeEquals('@timeZone','value', timeZoneValue)
            return this
        }
}];

module.exports = {
    elements: elements,
    commands: commands
}