
//to be used during scheduling
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
tomorrow.setHours(1, 1, 1, 1)

//to be used as asserts 
var PatientName;
var VisitTypeName;
var ProviderName;
var DateMonthDay;
var TimeSlot;

var DrawerPatientName;
var DrawerVisitTypeName;
var DrawerProviderName;
var DrawerDateMonthDay;
var DrawerTimeSlot;

const elements = {
    //user profile on top-right of the screen
    userProfile: `[data-test-id="userProfileButton"]`,

    //Main menu tabs
    tabWaitingRoom: `[data-test-id="waitingRoomTab"]`,
    tabPatients: `[data-test-id="patientsTab"]`,
    tabVisitHistory: `[data-test-id="visitHistoryTab"]`,
    tabScheduling: `[data-test-id="appointmentsTab"]`,

    //each of the necessary values to insert a new scheduled visit
    patientComboBox: `[data-test-id="editAppointmentPatient"]`,
    visitTypeComboBox: `[data-test-id="editAppointmentVisitType"]`,
    providerComboBox: `[data-test-id="editAppointmentProvider"]`,
    datePicker: `[data-test-id="editAppointmentDate"]`,
    timeComboBox: `[data-test-id="editAppointmentTime"]`,
    
    //button to create a new scheduled visit
    scheduleVisitButton: `[data-test-id="scheduleEditedAppointment"]`,

    //page filters
    visitStatusFilterComboBox: `[data-test-id="visitScheduledStatusFilterTestID"]`,
    dateRangeFilterComboBox: `[data-test-id="visitDateRangeFilterTestID"]`,
    searchFilter: `[data-test-id="visitSearchFilterTestID"]`,

    //scheduled visit actions buttons (first visit in the list)
    scheduledVisitDeclineButton: `[data-test-id="visitRowDecline0"]`,
    scheduledVisitRescheduleButton: `[data-test-id="visitRowReschedule0"]`,
    scheduledVisitMoreButton: `[data-test-id="visitRowMoreLess0"]`,
    scheduledVisitLessButton: `[data-test-id="visitRowMoreLess0"]`,

    //decline visit modal options
    declineScheduledVisitDenyButton: `[data-test-id="confirmModalDeny"]`,
    declineScheduledVisitConfirmButton: `[data-test-id="confirmModalConfirm"]`,

    //reason to cancel visit modal and options
    cancelingModal: `.eVisitAppModal`,
    cancelingSurveyOption1: `[data-field="i_am_no_longer_available"]`,
    cancelingSurveyOption1RadioButton: `[data-field="i_am_no_longer_available"] .raTouchable`,
    cancelingSurveyOption2: `[data-field="there_s_an_incorrect_patient_visit_or_provider"]`,
    cancelingSurveyOption3: `[data-field="i_am_having_technical_difficulties"]`,
    cancelingSurveyOption4: `[data-field="other"]`,
    cancelingSurveySubmitButton: `[data-test-id="visitCancelReasonModalSubmit"]`,

    //the first couple of options inside the patients combobox
    //this required a chain of css selectors to guarantee the correct element. A ticket for adding propper data-test-id is in development
    firstItemPatientComboBox: `.eVisitAppListItem:nth-child(2) .eVisitAppPopupMenuItem:nth-child(1)`,
    secondItemPatientComboBox: `.eVisitAppListItem:nth-child(2) .eVisitAppPopupMenuItem:nth-child(1)`,
    createNewPatientButton: `[data-test-id="createPatient"]`,

    //the fields to create a new patient in the patients combobox
    firstNameField: `[data-test-id="formFirstName"]`,
    lastNameField: `[data-test-id="formLastName"]`,
    dateBirthField: `[data-test-id="formDOB"]`,
    emailField: `[data-test-id="formEmail"]`,

    //the buttons to confirm or cancel the new patient creation
    confirmNewPatientButton: `[data-test-id="createPatient"]`,
    cancelNewPatientButton: `[data-test-id="cancelCreate"]`,

    //all options inside the visit type combobox
    firstItemVisitTypeComboBox: `[data-test-id="GeneralVisitOption"]`,
    secondItemVisitTypeComboBox: `[data-test-id="FollowUpVisitOption"]`,

    //the first couple of options inside the provider combobox
    //this needed a chain of css selectors to guarantee the correct element. A ticket for adding propper data-test-id is in development
    firstItemProviderComboBox: `.eVisitAppListItem:nth-child(2) .eVisitAppPopupMenuItem:nth-child(1)`,
    secondItemProviderComboBox: `.eVisitAppListItem:nth-child(2) .eVisitAppPopupMenuItem:nth-child(1)`,

    //useful elements to interact with the calendar
    tomorrowCalendar: '[data-test-id=calendarDay' + tomorrow.getDate() + ']',
    nextMonth: `[data-test-id='calendarNextMonth']`,

    //the first timeslot available in the list of timeslots
    firstTimeSlot: '[data-test-id*=timeSlot]:nth-child(1)',
    secondTimeSlot: '[data-test-id*=timeSlot]:nth-child(3)',

    //a general spinner used throughout the page 
    spinner: `.eVisitAppLoadingSpinner`,
    popupSpinner: `.eVisitAppPopupContainer .eVisitAppLoadingSpinner`,

    //the scheduled visits list
    firstRowScheduledVisits: `[data-test-id='rowClick0']`,
    listScheduledVisits: `[data-test-id*='rowClick']`,

    //general purpose toast message
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    //reschedule interface items before editing
    rescheduleAppDrawer: `.eVisitAppDrawer`,
    rescheduleVisitType: `.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(2)`,
    rescheduleProvider: `.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(4)`,
    rescheduleDate: `.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(6)`,
    rescheduleTime: `.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(8)`,
    rescheduleEditButton: `[data-test-id="editAppointment"]`,
    rescheduleCancelButton: `[data-test-id="cancelAppointment"]`,

    //reschedule combobox during editing of schedule
    rescheduleProviderComboBox: `.eVisitAppSideBarContent [data-test-id="editAppointmentProvider`,

    //options to save or cancel editing of schedule
    saveRescheduleChangesButton: '.eVisitAppPagerEastPageContainer [data-test-id="scheduleEditedAppointment"]',
    cancelRescheduleChangesButton: '.eVisitAppPagerEastPageContainer [data-test-id="cancelAppointmentEdit"]'

    


};

const commands = [{

    /*
    *   This function will make sure the page is completelly loaded before continuing, using any specified element as a trait
    */
    accessSchedulerPage(email, password) {
        const loginPage = this.api.page.loginPage()
        const waitingRoomPage = this.api.page.provider.waitingRoomPage()
        loginPage
            .goToPracticeLoginPage()
            .userLogin(email, password)
        waitingRoomPage.openScheduling();
        this.waitForElementVisible('@patientComboBox') //trait
        return this
    },

    /*
    *   This function will decline any previous visits in the list in order to have a known state starting point
    */
    clearVisits() {
        this
            .waitForElementNotVisible('@spinner')
            .api.elements('@listScheduledVisits', result => {
                const numOfElementsInTheList = (result.value.length - 1);
                for (i = numOfElementsInTheList; i >= 0; i--) {
                    this.waitForElementVisible(`[data-test-id="visitRowDecline` + i + `"]`)
                        .click(`[data-test-id="visitRowDecline` + i + `"]`)
                        .waitForElementVisible('@declineScheduledVisitConfirmButton')
                        .click('@declineScheduledVisitConfirmButton')
                        .waitForElementVisible('@cancelingSurveyOption1RadioButton')
                        .click('@cancelingSurveyOption1RadioButton')
                        .waitForElementVisible('@cancelingSurveySubmitButton')
                        .click('@cancelingSurveySubmitButton')
                        .waitForElementNotPresent(`@cancelingModal`, 20000)
                }
            });
        return this
    },

    /*
    *   This function will add a new appointment to a provider and check if the correct info was used using a existing patient
    */
    scheduleExistingPatient() {
        this
            .selectExistingPatient()
            .selectVisitType(0)
            .selectProviderBySearch('@providerComboBox', "Automation")
            //ALSO AVAILABLE: .selectProviderInFirstPosition('@providerComboBox')
            .selectDateTime('@firstTimeSlot')

            //SAVING - save this schedule
            .click('@scheduleVisitButton')

            //FINAL ASSERTIONS - uses the values stored in previous callbacks to compare with the new scheduled entry
            .waitForElementVisible('@toast', 25000)
            .checkToastMessage("Visit successfully scheduled.")
            .perform(function () {
                console.log("- Comparing info from the visit row with the fields used during scheduling:")
                this.verify.containsText(`[data-test-id='rowClick0']`, PatientName)
                this.verify.containsText(`[data-test-id='rowClick0']`, VisitTypeName)
                this.verify.containsText(`[data-test-id='rowClick0']`, ProviderName)
                this.verify.containsText(`[data-test-id='rowClick0']`, ("Scheduled for " + months[tomorrow.getMonth()] + " " + tomorrow.getDate() + ", " + TimeSlot))
            })
        return this
    },

    /*
    *   This function will add a new appointment to a provider and check if the correct info was used using a newly created patient
    */
    scheduleNewPatient() {
        this
            .selectNewPatient()
            .selectVisitType(0)
            .selectProviderBySearch('@providerComboBox', "Automation")
            //ALSO AVAILABLE: .selectProviderInFirstPosition('@providerComboBox')
            .selectDateTime('@firstTimeSlot')

            //SAVING - save this schedule
            .click('@scheduleVisitButton')

            //FINAL ASSERTIONS - uses the values stored in previous callbacks to compare with the new scheduled entry
            .waitForElementVisible('@toast', 25000)
            .checkToastMessage("Visit successfully scheduled.")
            .perform(function () {
                console.log("- Comparing info from the visit row with the fields used during scheduling:")
                this.verify.containsText(`[data-test-id='rowClick0']`, PatientName)
                this.verify.containsText(`[data-test-id='rowClick0']`, VisitTypeName)
                this.verify.containsText(`[data-test-id='rowClick0']`, ProviderName)
                this.verify.containsText(`[data-test-id='rowClick0']`, ("Scheduled for " + months[tomorrow.getMonth()] + " " + tomorrow.getDate() + ", " + TimeSlot))
            })
        return this
    },

    /*
    *   Select the first already registered patient in the list
    */
    selectExistingPatient() {
        return this
            // PATIENT - choose the first existing patient
            .waitForElementVisible(`@patientComboBox`)
            .click(`@patientComboBox`)
            .waitForElementVisible(`@firstItemPatientComboBox`)
            .getText('@firstItemPatientComboBox', function (result) {
                //save a line of the value for future comparison
                PatientName = result.value.split("\n");
                PatientName = PatientName[1]
            })
            .click(`@firstItemPatientComboBox`)
    },

    /*
    *   Generate new user email with today's date and random number as part of the text
    */
    createNewPatientEmail() {
        var rando = Math.floor((Math.random() * 100000) + 1); // random number generator for email
        var email = `automation+${today.getMonth() + 1}+${today.getDate()}+${rando}@evisit.com`; // email variable
        return email;
    },

    /*
    *   Add a new patient and use them for the schedule proccess
    */
    selectNewPatient() {
        var email = this.createNewPatientEmail()
        PatientName = "Automation"

        return this
            // PATIENT - create a new patient
            .waitForElementVisible(`@patientComboBox`)
            .click(`@patientComboBox`)
            //click create new patient button
            .waitForElementVisible(`@createNewPatientButton`)
            .click(`@createNewPatientButton`)
            //include new patient details
            .setValue('@firstNameField', PatientName)
            .setValue('@lastNameField', "Test")
            .setValue('@dateBirthField', "01011992")
            .setValue('@emailField', email)
            //save new patient
            .click('@confirmNewPatientButton')
            //verify if new patient was successful

            // THE ASSERTION BELOW IS NO LONGER WORKING DUE TO A BUG THAT MAKES THE TOAST MESSAGE BE DISMISSED TOO FAST
            // .waitForElementVisible('@toast', 25000)
            // .checkToastMessage("Patient successfully created.")
    },

    /*
    *   Select the first visit type in the list
    */
    selectVisitType(item) {
        return this
            //VISIT TYPE - the visit type combobox will automatically open
            .waitForElementVisible(`@firstItemVisitTypeComboBox`)
            .getText('@firstItemVisitTypeComboBox', function (result) {
                //save a line of the value for future comparison
                VisitTypeName = result.value.split("\n");
                VisitTypeName = VisitTypeName[item]
            })
            .click(`@firstItemVisitTypeComboBox`)
    },

    /*
    *   Select the provider by keyword
    *   This provider must have availability configured beforehand
    */
    selectProviderBySearch(locator, desiredText) {
        this
            //PROVIDER - the provider combobox will not open unless the user focus on it with a click
            .click(locator)
            .setValue(locator, desiredText)
            .expect.element(`@firstItemProviderComboBox`).text.to.contain(desiredText).before(10000);
        this.getText('@firstItemProviderComboBox', function (result) {
            //save a line of the value for future comparison
            ProviderName = result.value.split("\n");
            ProviderName = ProviderName[1]
        })
            .click(`@firstItemProviderComboBox`)
        return this
    },

    /*
    *   Select the first provider in the list
    *   This provider must have availability configured beforehand
    *   In order to make sure the expected provider is the first in the list, change his name to "AAAA<NAME>"
    */
    selectProviderInFirstPosition(locator) {
        this
            //PROVIDER - the provider combobox will not open unless the user focus on it with a click
            .click(locator)
            .waitForElementNotPresent('@popupSpinner', 10000)
            .waitForElementVisible('@firstItemProviderComboBox')
        this.getText('@firstItemProviderComboBox', function (result) {
            //save a line of the value for future comparison
            ProviderName = result.value.split("\n");
            ProviderName = ProviderName[1]
        })
            .click(`@firstItemProviderComboBox`)
        return this
    },

    /*
    *   Select the day of tomorrow (considering also the last day of the month) and also the first time slot available
    */
    selectDateTime(locator) {
        this
            //DATE - the calendar will open automatically, this will select the first day of next month
            .waitForElementNotPresent('@popupSpinner', 10000)
        //in case tomorrow is a new month
        if (tomorrow.getDate() == 1) {
            this.click(`@nextMonth`)
            tomorrow.setMonth(tomorrow.getMonth() + 1)
        }
        this.waitForElementVisible('@tomorrowCalendar')
            .click('@tomorrowCalendar')

            //TIME - the time will open automatically, this will select the first one
            .waitForElementVisible(locator, 10000)
        this.getText(locator, function (result) {
            TimeSlot = result.value.split(" "); // Temporarily used to save the array
            //save the time displayed with the correct format to be used later, including consideration of one or two digits and AM/PM
                TimeSlot = TimeSlot[0] + " " + TimeSlot[1].toUpperCase()
        })
            .click(locator)
        return this
    },

    rescheduleVisit(){
        this
            .waitForElementNotVisible('@spinner')
            .getText('@firstRowScheduledVisits', function (result) {
                //Will save all info from the the first visit in the list in variables to be used later
                TimeSlot = result.value.split("\n"); //temporarily used to store an array
                VisitTypeName = TimeSlot[3] //save the visit type from the first visit in the list
                ProviderName = TimeSlot[4] //save the provider name from the first visit in the list
                TimeSlot = TimeSlot[5] //temporarily receive the complete text from the timestamp line. (Line Example: Scheduled for Oct 8, 12:00 AM)
                TimeSlot = TimeSlot.split(" ") //break the string into an array
                DateMonthDay = (TimeSlot[2])//save the month corresponding item from the array. 
                DateMonthDay = (new Date(Date.parse(DateMonthDay +" 1, 2012")).getMonth()+1) + "/" + TimeSlot[3].slice(0, -1) //transform the month from initials to number and add the day. Also removes the comma in the end
                TimeSlot = TimeSlot[4] + " " + TimeSlot[5]//save the time related items from the array, overwriting it.
            })


            this.click('@scheduledVisitRescheduleButton')
            .waitForElementVisible('@rescheduleEditButton')
            //assert that the sidepanel have the same info as the visit
            .perform(function () {
                console.log("- Comparing visit row with reschedule drawer:")
                this.verify.containsText('.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(2)', VisitTypeName);
                this.verify.containsText('.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(4)', ProviderName);
                this.verify.containsText('.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(6)', DateMonthDay);
                this.verify.containsText('.eVisitAppPagerEastPageContainer .eVisitAppPanelBase .RAText:nth-child(8)', TimeSlot);
            })

            //start edit process
            this.click('@rescheduleEditButton')

            //change provider and visit time
            .selectProviderBySearch('@rescheduleProviderComboBox', "AAAOmega")
            .selectDateTime('@secondTimeSlot')

            //save the changes
            .click('@saveRescheduleChangesButton')
            .waitForElementVisible('@toast', 25000)
            .checkToastMessage("Visit has been successfully updated.")

            //save the new info from the just updated visit directly from the reschedule interface
            .getText('@rescheduleAppDrawer', function (result) {
                var optionalFieldControl = 1 // In case the patient have email and phone the position needs to change
                DrawerTimeSlot = result.value.split("\n"); //temporarily used
                DrawerPatientName = DrawerTimeSlot[1] 

                if(DrawerTimeSlot[4] == 'Appointment'){
                    optionalFieldControl = optionalFieldControl + 1
                }
                
                DrawerVisitTypeName = DrawerTimeSlot[optionalFieldControl+4]
                DrawerProviderName = DrawerTimeSlot[optionalFieldControl+ 6]
                DrawerDateMonthDay = DrawerTimeSlot[optionalFieldControl+8].split("/")
                DrawerDateMonthDay = months[DrawerDateMonthDay[0]-1] + " " + DrawerDateMonthDay[1]
                DrawerTimeSlot = DrawerTimeSlot[optionalFieldControl+10]
            })

            //Final Assetions - Compare the updated info with the info from the editing interface
            .click('@scheduledVisitLessButton')
            .perform(function () {
                console.log("- Comparing reschedule drawer with updated visit row:")
                this.verify.containsText(`[data-test-id='rowClick0']`, DrawerPatientName)
                this.verify.containsText(`[data-test-id='rowClick0']`, DrawerVisitTypeName)
                this.verify.containsText(`[data-test-id='rowClick0']`, DrawerProviderName)
                this.verify.containsText(`[data-test-id='rowClick0']`, ("Scheduled for " + DrawerDateMonthDay + ", " + DrawerTimeSlot))
            })

            return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}