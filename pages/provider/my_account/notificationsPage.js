const elements = {
    notificationsSection: `[data-test-id="notificationsSection"]`,
    notificationsSectionSelected: `[data-test-id="notificationsSection"][class*='Active']`,

    emailNotifField: `[name*="default.email"]`,
    phoneNotifField: `[name*="default.voice"]`,
    textNotifField: `[name*="default.sms"]`,
    emailNotifToggle: `[data-test-id="emailToggle"]`,
    phoneNotifToggle: `[data-test-id="voiceToggle"]`,
    textNotifToggle: `[data-test-id="smsToggle"]`,
    saveChangesButton: `[data-test-id="saveNotificationChanges"]`
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