let settingsPage;

module.exports = {
    
    before: function (browser) {
        browser.resizeWindow(1920, 1080);
        '@tags:'['test']
        notificationsPage = browser.page.provider.my_account.notificationsPage();
    },
    
    "Edit Notification Channels": function (browser) {
        
        notificationsPage.accessNotificationsPage(browser.globals.providerEmail, browser.globals.providerPassword)
            //edit notification fields
            .editTextField('@emailNotifField', "test@evisit.com")
            .editTextField('@phoneNotifField', "555-555-5555")
            .editTextField('@smsNotifField', "555-555-5555")
            .click('@saveChangesButton')
        
        //TODO: check confirmation toast when it exists - Bug #8aka6k

        //assert changes persistence
        notificationsPage.checkNotificationPersistence("test@evisit.com","555-555-5555", "555-555-5555")
    },

    "Toogle Notification Channels": function (browser) {
        //notificationsPage.accessNotificationsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        notificationsPage.toggleNotifChannelandCheck('@smsNotifToggle')
        notificationsPage.toggleNotifChannelandCheck('@phoneNotifToggle')
        notificationsPage.toggleNotifChannelandCheck('@emailNotifToggle')
        
        //TODO: check confirmation toast when it exists - Bug #8aka6k
    },

    "Add Notifications Channels": function (browser){
        //notificationsPage.accessNotificationsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        notificationsPage.addEmailNotification("newchannel@evisit.com")
        notificationsPage.addPhoneNotification("111-111-1111")
        notificationsPage.addSMSNotification("222-222-2222")
    },

    "Remove Notification Channels": function (browser) {
        //notificationsPage.accessNotificationsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        notificationsPage.removeCustomChannels()
    },

    after: function (browser) {
        browser.end();
    }
};