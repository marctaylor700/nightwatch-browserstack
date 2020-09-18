const elements = {
    settingsSection: `[data-test-id="settingsSection"]`,

    emailField: `[data-test-id="email"]`,
    currentPasswordForEmailField: `[data-test-id="currentPasswordForEmail"]`,
    UpdateEmailButton: `[data-test-id="updateEmail"]`,
    newPasswordField: `[data-test-id="newPassword"]`,
    confirmNewPasswordField: `[data-test-id="confirmNewPassword"]`,
    currentPasswordForPasswordField: `[data-test-id="currentPasswordForPassword"]`,
    updatePasswordButton: `[data-test-id="updatePassword"]`,
    
};

const commands = [{

    accessSettingsPage(email, password){
        this
            const loginPage = this.api.page.loginPage()
            const geolocationPage = this.api.page.geolocationPage()
            const landingPage = this.api.page.landingPage()

            loginPage
                .goToPracticeLoginPage()
                .patientLogin(email, password)
            geolocationPage.confirmGeolocation()
            landingPage.selectMyAccount();
        this
            .waitForElementVisible('@settingsSection')
            .click('@settingsSection')
        return this
    },
    changeEmail(new_email, password){
        this
            const personalInfoPage = this.api.page.patient.my_account.personalInfoPage()

            //this.elements.<page_object_element> references a local page object element when using other page object context
            personalInfoPage.editTextField(this.elements.emailField, new_email);
        this
            .setValue('@currentPasswordForEmailField', password)
            .waitForElementVisible('@UpdateEmailButton')
            .click('@UpdateEmailButton')
        return this
    },
    changePassword(new_password, old_password){
        this
            const personalInfoPage = this.api.page.patient.my_account.personalInfoPage()

            personalInfoPage.editTextField(this.elements.newPasswordField, new_password)
                .editTextField(this.elements.confirmNewPasswordField, new_password);
        this
            .setValue('@currentPasswordForPasswordField', old_password)
            .waitForElementVisible('@updatePasswordButton')
            .click('@updatePasswordButton')
        return this
    },


    
    
}];

module.exports = {
    elements: elements,
    commands: commands
}