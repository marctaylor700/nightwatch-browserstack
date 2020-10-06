
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
var TimeSlot;

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
    scheduledVisitDMoreButton: `[data-test-id="visitRowMoreLess0"]`,

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
    firstTimeSlot: '[data-test-id*=timeSlot]',

    //a general spinner used throughout the page 
    spinner: `.eVisitAppLoadingSpinner`,
    popupSpinner: `.eVisitAppPopupContainer .eVisitAppLoadingSpinner`,

    //the scheduled visits list
    firstRowScheduledVisits: `[data-test-id='rowClick0']`,
    listScheduledVisits: `[data-test-id*='rowClick']`,

    //general purpose toast message
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`
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
            .providerLogin(email, password)
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
            .selectProviderBySearch("Automation")
            //ALSO AVAILABLE: .selectProviderInFirstPosition()
            .selectDateTime()

            //SAVING - save this schedule
            .click('@scheduleVisitButton')

            //FINAL ASSERTIONS - uses the values stored in previous callbacks to compare with the new scheduled entry
            .waitForElementVisible('@toast', 25000)
            .checkToastMessage("Visit successfully scheduled.")
            .perform(function () {
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
            .selectProviderBySearch("Automation")
            //ALSO AVAILABLE: .selectProviderInFirstPosition()
            .selectDateTime()

            //SAVING - save this schedule
            .click('@scheduleVisitButton')

            //FINAL ASSERTIONS - uses the values stored in previous callbacks to compare with the new scheduled entry
            .waitForElementVisible('@toast', 25000)
            .checkToastMessage("Visit successfully scheduled.")
            .perform(function () {
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
                PatientName = PatientName[2]
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
            .waitForElementVisible('@toast', 25000)
            .checkToastMessage("Patient successfully created.")
    },

    /*
    *   Select the first visit type in the list
    */
    selectVisitType(position) {
        return this
            //VISIT TYPE - the visit type combobox will automatically open
            .waitForElementVisible(`@firstItemVisitTypeComboBox`)
            .getText('@firstItemVisitTypeComboBox', function (result) {
                //save a line of the value for future comparison
                VisitTypeName = result.value.split("\n");
                VisitTypeName = VisitTypeName[position]
            })
            .click(`@firstItemVisitTypeComboBox`)
    },

    /*
    *   Select the provider by keyword
    *   This provider must have availability configured beforehand
    */
    selectProviderBySearch(providerName) {
        this
            //PROVIDER - the provider combobox will not open unless the user focus on it with a click
            .click('@providerComboBox')
            .setValue('@providerComboBox', providerName)
            .expect.element(`@firstItemProviderComboBox`).text.to.contain(providerName).before(10000);
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
    selectProviderInFirstPosition() {
        this
            //PROVIDER - the provider combobox will not open unless the user focus on it with a click
            .click('@providerComboBox')
            .waitForElementNotPresent('@popupSpinner', 10000)
            .waitForElementVisible(`@firstItemProviderComboBox`)
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
    selectDateTime() {
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
            .waitForElementVisible('@firstTimeSlot', 10000)
        this.getText('@firstTimeSlot', function (result) {
            //save the time displayed with the correct format to be used later
            TimeSlot = (result.value.slice(0, 5) + " " + result.value.slice(5, 7)).toUpperCase()
        })
            .click(`@firstTimeSlot`)
        return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}