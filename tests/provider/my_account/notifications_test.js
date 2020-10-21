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
            .editTextField('@textNotifField', "555-555-5555")
            .click('@saveChangesButton')
        
        //TODO: check confirmation toast when it exists - Bug #8aka6k

        //assert changes persistence
        notificationsPage.checkNotificationPersistence("test@evisit.com","555-555-5555", "555-555-5555")
    },

    //TODO: Add new notification channel

    "Toogle Notification Channels": function (browser) {
        notificationsPage.toggleNotifChannels()
        //TODO: check confirmation toast when it exists - Bug #8aka6k
        //TODO: check persistence - Depends on #275v9m
    },

    after: function (browser) {
        browser.end();
    }
};