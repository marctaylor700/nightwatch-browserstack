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

    emailNotifToggle: `[data-test-id="emailToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`,
    phoneNotifToggle: `[data-test-id="voiceToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`,
    textNotifToggle: `[data-test-id="smsToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`,

    saveChangesButton: `[data-test-id="saveNotificationChanges"]`,
    saveChangesSpinner: `[class="applicationActivityIndicator"]`
};

const commands = [{
    //Access Settings Page from Patient login
    accessSettingsPage(email, password){
        this
            const loginPage = this.api.page.loginPage()
            const geolocationPage = this.api.page.patient.geolocationPage()
            const landingPage = this.api.page.patient.landingPage()

            loginPage
                .goToPracticeLoginPage()
                .userLogin(email, password)
            geolocationPage.confirmGeolocation()
            landingPage.selectMyAccount()
        this.accessSettingsSection()
        return this
    },
    //Access Settings Page from Provider login
    accessProviderSettingsPage(email, password){
        this
            const loginPage = this.api.page.loginPage()
            const waitingRoomPage = this.api.page.provider.waitingRoomPage()

            loginPage
                .goToPracticeLoginPage()
                .userLogin(email, password)
                waitingRoomPage.selectMyAccount();
        this.accessSettingsSection()
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

    /* Check status of toggle
    Where value = 'right' means enabled, value = 'left' means disabled */
    checkToggleStatus(toggleLocator, value){
        return this.verify.attributeContains(toggleLocator, 'style', value)
    },

    //Toggle channel and verify if the toggle has the new status after saving
    toggleNotifChannelandCheck(toggleLocator){
        return this.getAttribute(toggleLocator, 'style', (result) => {
            if(result.value.includes('right')){ //it means channel is enabled
                this.click(toggleLocator) //toggle channel OFF
                    .click('@saveChangesButton')
                    .waitForElementNotVisible('@saveChangesSpinner')
                    .checkToggleStatus(toggleLocator, 'left') //check if channel is disabled
            }
            else if(result.value.includes('left')){ //it means channel is disabled
                this.click(toggleLocator) //toggle channel ON
                    .click('@saveChangesButton')
                    .waitForElementNotVisible('@saveChangesSpinner')
                    .checkToggleStatus(toggleLocator, 'right') //check if channel is enabled
           }
        })
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}