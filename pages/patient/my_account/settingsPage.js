const elements = {
    settingsSection: `[data-test-id="settingsSection"]`,
    settingsSectionSelected: `[data-test-id="settingsSection"][class*='Active']`,

    emailField: `[data-test-id="email"]`,
    currentPasswordForEmailField: `[data-test-id="currentPasswordForEmail"]`,
    UpdateEmailButton: `[data-test-id="updateEmail"]`,
    newPasswordField: `[data-test-id="newPassword"]`,
    confirmNewPasswordField: `[data-test-id="confirmNewPassword"]`,
    currentPasswordForPasswordField: `[data-test-id="currentPasswordForPassword"]`,
    updatePasswordButton: `[data-test-id="updatePassword"]`,

    emailNotifField: `[name*="default.email"]`,
    phoneNotifField: `[name*="default.voice"]`,
    textNotifField: `[name*="default.sms"]`,
    emailNotifToggle: `[data-test-id="emailToggle"]`,
    phoneNotifToggle: `[data-test-id="voiceToggle"]`,
    textNotifToggle: `[data-test-id="smsToggle"]`,
    saveChangesButton: `[data-test-id="saveNotificationChanges"]`
};

const commands = [{

    accessSettingsPage(email, password){
        this
            const loginPage = this.api.page.loginPage()
            const geolocationPage = this.api.page.patient.geolocationPage()
            const landingPage = this.api.page.patient.landingPage()

            loginPage
                .goToPracticeLoginPage()
                .patientLogin(email, password)
            geolocationPage.confirmGeolocation()
            landingPage.selectMyAccount()
        this
            .waitForElementVisible('@settingsSection')
            .pause(3000)
            .click('@settingsSection')
            .waitForElementVisible('@settingsSectionSelected')
        return this
    },
    //Access Settings Section considering that My Account page is opened
    accessSettingsSection(){
        this
            .waitForElementVisible('@settingsSection')
            .pause(3000)
            .click('@settingsSection')
            .waitForElementVisible('@settingsSectionSelected')
        return this
    },

    changeEmail(new_email, password){
        return this
            .editTextField('@emailField', new_email)
            .setValue('@currentPasswordForEmailField', password)
            .waitForElementVisible('@UpdateEmailButton')
            .click('@UpdateEmailButton')
    },

    changePassword(new_password, old_password){
        return this
            .editTextField('@newPasswordField', new_password)
            .editTextField('@confirmNewPasswordField', new_password)
            .setValue('@currentPasswordForPasswordField', old_password)
            .waitForElementVisible('@updatePasswordButton')
            .click('@updatePasswordButton')
    },

    checkNotificationPersistence(emailNotifValue, phoneNotifValue, textNotifValue){
        return this
            .verify.attributeEquals('@emailNotifField', 'value', emailNotifValue)
            .verify.attributeEquals('@phoneNotifField', 'value', phoneNotifValue)
            .verify.attributeEquals('@textNotifField', 'value', textNotifValue)
    },
    
    toggleNotifChannels(){
        return this
            .click('@emailNotifToggle')
            .click('@phoneNotifToggle')
            .click('@textNotifToggle')
            .click('@saveChangesButton')
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}