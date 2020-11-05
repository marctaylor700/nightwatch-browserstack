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
   
    //Toggles of fixed notification channels
    smsNotifToggle: {selector: `[data-test-id="smsToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 0},
    phoneNotifToggle: {selector: `[data-test-id="voiceToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 0},
    emailNotifToggle: {selector: `[data-test-id="emailToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 0},

    //Toggles of first custom notification channels
    customSmsNotifToggle: {selector: `[data-test-id="smsToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 1},
    customPhoneNotifToggle: {selector: `[data-test-id="voiceToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 1},
    customEmailNotifToggle: {selector: `[data-test-id="emailToggle"] [class="RAView eVisitAppSwitchFieldKnob"]`, index: 1},

    removeChannelButton: `[data-test-id="notificationModalRemove"]`,

    //Notify Me When checkboxes
    selectAllNotifyMe: `[data-test-id="selectAllProviderOptions"] [class="RAView"]`,
    leftCheckbox1: `[data-test-id="visit_submitted_by_patientCheckBox"] [class="RAView"]`,
    leftCheckbox2: `[data-test-id="scheduled_visit_ready_to_joinCheckBox"] [class="RAView"]`,
    leftCheckbox3: `[data-test-id="visit_canceled_by_patientCheckBox"] [class="RAView"]`,
    leftCheckbox4: {selector:`[data-test-id="new_visit_scheduled_by_patientCheckBox"] [class="RAView"]`, index: 0},
    leftCheckbox5: {selector:`[data-test-id="patient_reschedules_scheduled_visitCheckBox"] [class="RAView"]`, index: 0},
    leftCheckbox6: {selector: `[data-test-id="scheduled_visit_canceled_by_patientCheckBox"] [class="RAView"]`, index:0 },

    //Notify My Patients checkboxes
    selectAllNotifyMyPatients: `[data-test-id="selectAllPatientOptions"] [class="RAView"]`,
    rightCheckbox1: {selector:`[data-test-id="new_visit_scheduled_by_patientCheckBox"] [class="RAView"]`, index: 1},
    rightCheckbox2: {selector:`[data-test-id="patient_reschedules_scheduled_visitCheckBox"] [class="RAView"]`, index: 1},
    rightCheckbox3: `[data-test-id="provider_schedules_visit_for_exisiting_patientCheckBox"] [class="RAView"]`,
    rightCheckbox4: `[data-test-id="provider_reschedules_scheduled_visitCheckBox"] [class="RAView"]`,
    rightCheckbox5: {selector: `[data-test-id="scheduled_visit_canceled_by_patientCheckBox"] [class="RAView"]`, index:1 },
    rightCheckbox6: `[data-test-id="scheduled_visit_reminder_a_day_beforeCheckBox"] [class="RAView"]`,
    rightCheckbox7: `[data-test-id="scheduled_visit_reminder_on_the_day_of_visitCheckBox"] [class="RAView"]`,
    rightCheckbox8: `[data-test-id="visit_started_by_physicianCheckBox"] [class="RAView"]`,
    rightCheckbox9: `[data-test-id="visit_requeued_by_physicianCheckBox"] [class="RAView"]`,
    rightCheckbox10: `[data-test-id="visit_completed_by_physicianCheckBox"] [class="RAView"]`,

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
    //Access Notification Section considering the current page is My Account
    accessNotificationsSection(){
        this
            .waitForElementVisible('@notificationsSection')
            .pause(3000)
            .click('@notificationsSection')
            .waitForElementVisible('@notificationsSectionSelected')
        return this
    },

    //Perform the logout, login and access Notification Page again
    accessNotificationsSectionAfterLogout(email, password){
        this
            const loginPage = this.api.page.loginPage()
            const waitingRoomPage = this.api.page.provider.waitingRoomPage()
            // Logout and Login again to check persistence
            waitingRoomPage.selectLogout()
            waitingRoomPage.acceptLogout()
            this.pause(2000) //waits login page to load
            loginPage.userLogin(email, password)

            //access Notifications Page
            waitingRoomPage.selectMyAccount()
            this.accessNotificationsSection()
        return this
    },

    //checks if the first 3 channels have the values equals to the ones sent by parameter
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
                this.pause(1000)
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
    },

    //Add Email Notification Channel
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

    //Add Phone Notification Channel
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

    //Add SMS Notification Channel
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

    //Remove a given channel (only works with custom channels)
    removeChannel(toggleLocator){
        return this
            .click(toggleLocator)
            .click(toggleLocator)
            .waitForElementVisible('@removeChannelButton')
            .click('@removeChannelButton')
    },

    //Remove the added custom channels and verify if they are not present anymore
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
    },

    //Check if the checkbox has 'selected' color in case isSelect == true OR 'not selected' color if isSelected == false
    //Using 'assert' to prevent test continuing if the first verified checkbox is not as expected
    assertCheckboxStatus(checkbox, selectedStatus) {
        if (selectedStatus == true) {
            this.assert.cssProperty(checkbox, 'border-color', 'rgb(42, 178, 188)')
        }
        else if (selectedStatus == false) {
            this.assert.cssProperty(checkbox, 'border-color', 'rgb(173, 177, 179)')
        }
        return this
    },

    //Click on Select All checkbox and isSelected gets the new status of checkbox
    selectAll(checkbox, isSelected){
        this
            .waitForElementVisible(checkbox)
            //gets the status of Select All checkbox (selected/unselected)
            .getAttribute(checkbox, 'style', (result) => {
                if(result.value.includes('border-color: rgb(42, 178, 188)')){ //it means checkbox is selected
                    this.click(checkbox)
                        .click('@saveChangesButton')
                        .waitForElementNotVisible('@saveChangesSpinner')
                    isSelected (false); // receives false because it will change to UNSELECTED after click
                }
                else { //it means checkbox is not selected
                    this.click(checkbox)
                        .click('@saveChangesButton')
                        .waitForElementNotVisible('@saveChangesSpinner')
                    isSelected (true); // receives true because it will change to SELECTED after click
                }
            }) 
        return this
    },

    //Check if checkboxes changed its color according to isSelected status
    checkPersistenceOfSelectAllNotifyMe(isSelected){
        console.log("Checking changes in un/selected checkboxes")
        this.assertCheckboxStatus('@selectAllNotifyMe', isSelected)
        this.assertCheckboxStatus('@leftCheckbox1', isSelected)
        this.assertCheckboxStatus('@leftCheckbox2', isSelected)
        this.assertCheckboxStatus('@leftCheckbox3', isSelected)
        this.assertCheckboxStatus('@leftCheckbox4', isSelected)
        this.assertCheckboxStatus('@leftCheckbox5', isSelected)
        this.assertCheckboxStatus('@leftCheckbox6', isSelected)
        return this
    },

    //Check if checkboxes changed its color according to isSelected status
    checkPersistenceOfSelectAllNotifyMyPatients(isSelected){
        console.log("Checking changes in un/selected checkboxes")
        this.assertCheckboxStatus('@selectAllNotifyMyPatients', isSelected)
        this.assertCheckboxStatus('@rightCheckbox1', isSelected)
        this.assertCheckboxStatus('@rightCheckbox2', isSelected)
        this.assertCheckboxStatus('@rightCheckbox3', isSelected)
        this.assertCheckboxStatus('@rightCheckbox4', isSelected)
        this.assertCheckboxStatus('@rightCheckbox5', isSelected)
        this.assertCheckboxStatus('@rightCheckbox6', isSelected)
        this.assertCheckboxStatus('@rightCheckbox7', isSelected)
        this.assertCheckboxStatus('@rightCheckbox8', isSelected)
        this.assertCheckboxStatus('@rightCheckbox9', isSelected)
        this.assertCheckboxStatus('@rightCheckbox10', isSelected)
        return this
    },

    //Select a checkbox and disable the correspondent Select All checkbox to let only the given checkbox selected
    selectOnlyOne(checkbox,checkboxAll){
        this
            .waitForElementVisible(checkboxAll)
            //gets the status of Select All checkbox (selected/unselected)
            .getAttribute(checkboxAll, 'style', (result) => {
                if(result.value.includes('border-color: rgb(42, 178, 188)')){ //it means the Select All checkbox  is selected
                    this.click(checkboxAll) //Unselect All
                        .click(checkbox) //Select only the target checkbox
                        .click('@saveChangesButton')
                        .waitForElementNotVisible('@saveChangesSpinner')
                }
                else { //it means the Select All checkbox is not selected
                    this.click(checkboxAll) //Select All
                        .click(checkboxAll) //Unselect All again to make sure no other checkbox was selected
                        .click(checkbox) //Select only the target checkbox
                        .click('@saveChangesButton')
                        .waitForElementNotVisible('@saveChangesSpinner')
                }
            }) 
        return this
    },
    /* 
    This method checks if only the previously selected checkbox is enabled
    To this test we consider that only the first checkbox is selected
    */
    checkPersistenceOfSelectOnlyOneNotifyMe(){
        console.log("Checking changes after selecting only one checkbox")
        this.assertCheckboxStatus('@selectAllNotifyMe', false)
        this.assertCheckboxStatus('@leftCheckbox1', true)
        this.assertCheckboxStatus('@leftCheckbox2', false)
        this.assertCheckboxStatus('@leftCheckbox3', false)
        this.assertCheckboxStatus('@leftCheckbox4', false)
        this.assertCheckboxStatus('@leftCheckbox5', false)
        this.assertCheckboxStatus('@leftCheckbox6', false)
        return this
    },
    /* 
    This method checks if only the previously selected checkbox is enabled
    To this test we consider that only the first checkbox is selected
    */
    checkPersistenceOfSelectOnlyOneNotifyMyPatients(){
        console.log("Checking changes after selecting only one checkbox")
        this.assertCheckboxStatus('@selectAllNotifyMyPatients', false)
        this.assertCheckboxStatus('@rightCheckbox1', true)
        this.assertCheckboxStatus('@rightCheckbox2', false)
        this.assertCheckboxStatus('@rightCheckbox3', false)
        this.assertCheckboxStatus('@rightCheckbox4', false)
        this.assertCheckboxStatus('@rightCheckbox5', false)
        this.assertCheckboxStatus('@rightCheckbox6', false)
        this.assertCheckboxStatus('@rightCheckbox7', false)
        this.assertCheckboxStatus('@rightCheckbox8', false)
        this.assertCheckboxStatus('@rightCheckbox9', false)
        this.assertCheckboxStatus('@rightCheckbox10', false)
        return this
    },

}];

module.exports = {
    elements: elements,
    commands: commands
}