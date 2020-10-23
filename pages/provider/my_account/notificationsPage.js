const elements = {
    notificationsSection: `[data-test-id="notificationsSection"]`,
    notificationsSectionSelected: `[data-test-id="notificationsSection"][class*='Active']`,

    smsNotifField: `[name*="default.sms"]`,
    phoneNotifField: `[name*="default.voice"]`,
    emailNotifField: `[name*="default.email"]`,
    
    addNotificationButton: `[class*="raTouchable RAView eVisitAppIconButton"]`,
    
    //model opened when click on Add Notification Button
    addNotificationModal: `[class^="RAView eVisitAppModal"]`,
    
    //icons of each type of notification channel that can be added, selected by index while their data-test-id are not available
    viaEmailButton: {selector:`[class*="raTouchable RAView eVisitAppIconButton"]`, index: 1},
    viaPhoneButton: {selector:`[class*="raTouchable RAView eVisitAppIconButton"]`, index: 2},
    viaSMSButton: {selector:`[class*="raTouchable RAView eVisitAppIconButton"]`, index: 3},

    //the first customs fields
    customSMSNotifField: `[name^="custom.sms"]`,
    customPhoneNotifField:`[name^="custom.voice"]`,    
    customEmailNotifField:`[name^="custom.email"]`,
   
    //Toggles of fixed notifications channels and the first custom channels
    smsNotifToggle: {selector: `[data-test-id="smsToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 0},
    phoneNotifToggle: {selector: `[data-test-id="voiceToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 0},
    emailNotifToggle: {selector: `[data-test-id="emailToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 0},
    customSmsNotifToggle: {selector: `[data-test-id="smsToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 1},
    customPhoneNotifToggle: {selector: `[data-test-id="voiceToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 1},
    customEmailNotifToggle: {selector: `[data-test-id="emailToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 1},

    removeChannelButton: `[data-test-id="notificationModalRemove"]`,

    saveChangesButton: `[data-test-id="saveNotificationChanges"]`,
    saveChangesSpinner: `[class="applicationActivityIndicator"]`
};

const commands = [{
    //Access Notifications Page from Provider login
    accessNotificationsPage(email, password){
        this
            const loginPage = this.api.page.loginPage()
            const waitingRoomPage = this.api.page.provider.waitingRoomPage()

            loginPage
                .goToPracticeLoginPage()
                .userLogin(email, password)
                waitingRoomPage.selectMyAccount();
        this.accessNotificationsSection()
        return this
    },

    accessNotificationsSection(){
        this
            .waitForElementVisible('@notificationsSection')
            .pause(3000)
            .click('@notificationsSection')
            .waitForElementVisible('@notificationsSectionSelected')
        return this
    },
    //checks if the first 3 channels have the values equals to the ones sent by parameter
    checkNotificationPersistence(emailNotifValue, phoneNotifValue, textNotifValue){
        return this
            .verify.attributeEquals('@emailNotifField', 'value', emailNotifValue)
            .verify.attributeEquals('@phoneNotifField', 'value', phoneNotifValue)
            .verify.attributeEquals('@smsNotifField', 'value', textNotifValue)
    },

    //value = 'right' means enabled, value = 'left' means disabled
    checkToggleStatus(toggleLocator, value){
        return this.verify.attributeContains(toggleLocator, 'style', value)
    },
    
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
    },
    
    addEmailNotification(email){
        return this
            .click('@addNotificationButton')
            .waitForElementVisible('@addNotificationModal')
            .click('@viaEmailButton')
            .waitForElementVisible('@customEmailNotifField')
            .setValue(`@customEmailNotifField`, email)
            .click(`@saveChangesButton`)
            .waitForElementNotVisible('@saveChangesSpinner')
            .verify.attributeEquals('@customEmailNotifField', 'value', email)
    },

    addPhoneNotification(phone){
        return this
            .waitForElementVisible('@addNotificationButton')
            .click('@addNotificationButton')
            .waitForElementVisible('@addNotificationModal')
            .click('@viaPhoneButton')
            .waitForElementVisible('@customPhoneNotifField')
            .setValue(`@customPhoneNotifField`, phone)
            .click(`@saveChangesButton`)
            .waitForElementNotVisible('@saveChangesSpinner')
            .verify.attributeEquals('@customPhoneNotifField', 'value', phone)
    },

    addSMSNotification(phone){
        return this
            .waitForElementVisible('@addNotificationButton')
            .click('@addNotificationButton')
            .waitForElementVisible('@addNotificationModal')
            .click('@viaSMSButton')
            .waitForElementVisible('@customSMSNotifField')
            .setValue(`@customSMSNotifField`, phone)
            .click(`@saveChangesButton`)
            .waitForElementNotVisible('@saveChangesSpinner')
            .verify.attributeEquals('@customSMSNotifField', 'value', phone)
    },

    removeChannel(toggleLocator){
        return this
            .click(toggleLocator)
            .click(toggleLocator)
            .waitForElementVisible('@removeChannelButton')
            .click('@removeChannelButton')
    },

    removeCustomChannels(){
        return this
            .removeChannel('@customSmsNotifToggle')
            .removeChannel('@customPhoneNotifToggle')
            .removeChannel('@customEmailNotifToggle')
            .click('@saveChangesButton')
            .waitForElementNotVisible('@saveChangesSpinner')
            .waitForElementNotPresent('@customSmsNotifToggle')
            .waitForElementNotPresent('@customPhoneNotifToggle')
            .waitForElementNotPresent('@customEmailNotifToggle')
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}