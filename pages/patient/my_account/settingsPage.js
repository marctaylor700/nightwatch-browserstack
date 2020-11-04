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
    smsNotifField: `[name*="default.sms"]`,

    emailNotifToggle: `[data-test-id="emailToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`,
    phoneNotifToggle: `[data-test-id="voiceToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`,
    smsNotifToggle: `[data-test-id="smsToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`,

    saveChangesButton: `[data-test-id="saveNotificationChanges"]`,
    saveChangesSpinner: `[class="applicationActivityIndicator"]`,

    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,
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

    //Perform the logout, login and access Settings Page again
    accessSettingsSectionAfterLogout(email, password){
        this
            const loginPage = this.api.page.loginPage()
            const geolocationPage = this.api.page.patient.geolocationPage()
            const landingPage = this.api.page.patient.landingPage()
            // Logout and Login again to check persistence
            landingPage.selectLogout()
            landingPage.acceptLogout()
            this.pause(2000) //waits login page to load
            loginPage.userLogin(email, password)
            geolocationPage.confirmGeolocation()

            //access Settings Page
            landingPage.selectMyAccount()
            this.accessSettingsSection()
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
            .verify.attributeEquals('@smsNotifField', 'value', textNotifValue)
    },

    /* Check status of toggle
    Where value = 'right' means enabled, value = 'left' means disabled */
    checkToggleStatus(toggleLocator, value){
        return this.verify.attributeContains(toggleLocator, 'style', value)
    },

    /* Toggle all default channels and verify if their toggles changed the status after saving
    It requires that at least one toggle be enabled otherwise it will not be saved and it will fail */
    toggleNotifChannelsAndCheck() {
        var toggles = ['@smsNotifToggle', '@phoneNotifToggle', '@emailNotifToggle'];
        var togglesStatus = [];
        this.waitForElementVisible(toggles[0]);
        for ( i = 0; i < toggles.length ; i++) {
            var element = toggles[i];
            ( (elementVar) => { //start wrapper code (anonymous function)
            this.getAttribute(elementVar, 'style', (result) => {
                if (result.value.includes('right')) { //it means channel is enabled
                    togglesStatus.push('left');
                    this.click(elementVar) //toggle channel OFF
                }
                else if (result.value.includes('left')) { //it means channel is disabled
                    togglesStatus.push('right')
                    this.click(elementVar) //toggle channel ON
                }
            });
            })(element);//calling anonymous function passing the toggle element as variable
        }
        
        this.perform(() => {
            //Save changes
            this
            .click('@saveChangesButton')
            .waitForElementNotVisible('@saveChangesSpinner')

            //Check each toggle status after saving
            for (i = 0; i < toggles.length; i++) {
                this.checkToggleStatus(toggles[i], togglesStatus[i])
            }
        })
        return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}