// Variables used for questionnaire comparisons
var healthRecordsAnyLastUpdated;
var healthRecordsQuestionnaireAnswer1;
var healthRecordsQuestionnaireAnswer2;
var healthRecordsQuestionnaireAnswer1AfterMod;
var healthRecordsQuestionnaireAnswer2AfterMod;
var healthRecordsQuestionnaireLastUpdated;

// Array with every piece of text available inside the patient profile > visit history panel
var visitHistoryPanelArray;

const elements = {

    // Request a visit button
    requestVisitButton: `[data-test-id='requestVisit']`,

    // Alert banner on top if alert/success/failed action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    // Default loading spinner
    spinner: `.eVisitAppBasePageMainContainer .eVisitAppLoadingSpinner`,

    // Visit history page filters
    dateFilter: `[data-test-id="visitDateRangeFilterTestID"] [type="text"]`,
    searchFilter: `[data-test-id="visitSearchFilterTestID"]`,

    // The first visit entry row in the visit history page
    firstVisitRow: `[data-test-id="rowClick0"]`,

    // Sidepanel showing information about the visit history entry
    visitSidePanel: `.eVisitAppDrawer`,

    // General attachment identifier
    Attachment: `.eVisitAppAttachment`,

    // Sidepanel tabs
    visitDetailsIcon: `[data-test-id="visitDetailsSideBarTab"]`,
    patientProfileIcon: `[data-test-id="patientProfileSideBarTab"]`,
    attachmentIcon: `[data-test-id="attachmentsSideBarTab"]`,

    // Patient Profile tab
    patientProfilePersonalInfo: `[data-test-id="personalInfo"]`,
    patientProfileInsurance: `[data-test-id="insurance"]`,
    patientProfileHealthRecords: `[data-test-id="healthRecords"]`,
    patientProfileVisitHistory: `[data-test-id="visitHistory"]`,

    // Patient Profile > Personal Info
    personalInfoBackButton: `[data-test-id="panelBack"]`,
    personalInfoFirstName: `[data-test-id="firstName"]`,
    personalInfoMiddleName: `[data-test-id="middleName"]`,
    personalInfoLastName: `[data-test-id="lastName"]`,
    personalInfoFirstAddress: `[data-test-id="addressLine1"]`,
    personalInfoSecondAddress: `[data-test-id="addressLine2"]`,
    personalInfoCity: `[data-test-id="city"]`,
    personalInfoState: `[data-test-id="state"] [type="text"]`,
    personalInfoZip: `[data-test-id="zipCode"]`,
    personalInfoCell: `[data-test-id="phoneCell"]`,
    personalInfoDOB: `[data-test-id="dob"]`,
    personalInfoGender: `[data-test-id="gender"] [type="text"]`,
    personalInfoTimezone: `[data-test-id="timeZoneSelect"] [type="text"]`,

    // Patient Profile > Insurance
    insuranceBackButton: `[data-test-id="panelBack"]`,
    insuranceInsuranceCompany: `[data-test-id="question1"]`,
    insuranceRelationPolicyHolder: `[data-test-id="question2"] [type="text"]`,
    insuranceID: `[data-test-id="question6"]`,
    insuranceGroup: `[data-test-id="question7"]`,
    insurancePolicyType: `[data-test-id="question8"] [type="text"]`,
    insurancePhone: `[data-test-id="question9"]`,

    // Patient Profile > Health Records
    healthRecordsGeneralAllergies: `[data-test-id="allergiesGeneral"]`,
    healthRecordsMedicationAllergies: `[data-test-id="allergiesMedications"]`,
    healthRecordsMedications: `[data-test-id="medications"]`,
    healthRecordsConditions: `[data-test-id="conditions"]`,
    healthRecordsProcedures: `[data-test-id="procedures"]`,
    healthRecordsFamilyHistory: `[data-test-id="familyHistory"]`,
    healthRecordsQuestionnaire: `[data-test-id="questionnaire"]`,

    // Patient Profile > Health Records > Any health record type
    healthRecordsAnyPanel: `.eVisitAppPanelBase .eVisitAppPanelBase`,
    healthRecordsAnyItems: `.eVisitAppPagerPageContainer .eVisitAppList .eVisitAppListItem`,
    healthRecordsAnyBackButton: '[data-test-id="panelBack"]',
    healthRecordsAnyEditButton: `[data-test-id="editMedicalRecord"]`,
    healthRecordsAnySpinner: `.eVisitAppPanelBase .eVisitAppLoadingSpinner`,

    // Patient Profile > Health Records > Any health record type > Edit
    healthRecordsAnyInputField: `[data-test-id="listInput"]`,
    healthRecordsAnyInputAddButton: `.eVisitAppPagerPageContainer .eVisitAppTextFieldIcon`,
    healthRecordsAnyToggleButton: `[data-test-id="toggleSuggestions"]`,
    healthRecordsAnySaveButton: `[data-test-id="saveChanges"]`,
    healthRecordsAnyCancelButton: `[data-test-id="cancelChanges"]`,
    healthRecordsAnyAddEntry: `[data-test-id$="Add"]`,
    healthRecordsAnyRemoveEntry: `[data-test-id$="Remove"]`,

    // Patient Profile > Health Records > Questionnaire > Edit
    healthRecordsQuestionnaireEditButton: `[data-test-id="updateMiscQuestions"]`,
    healthRecordsQuestionnaireSidepanel: `.eVisitAppPanelBase .eVisitAppPanelBase`,
    healthRecordsQuestionnaireFirstQuestionText: `[data-test-id="DoYouSmokeTobaccoQuestion"]`,
    healthRecordsQuestionnaireSecondQuestionText: `[data-test-id="DoYouDrinkAlcoholQuestion"]`,
    healthRecordsQuestionnaireFirstQuestionNo: `[data-test-id='question1No']`,
    healthRecordsQuestionnaireFirstQuestionYes: `[data-test-id='question1Yes']`,
    healthRecordsQuestionnaireSecondQuestionNo: `[data-test-id='question2No']`,
    healthRecordsQuestionnaireSecondQuestionYes: `[data-test-id='question2Yes']`,
    // The div inside each button which contains the color property used to indicate active/inactive button
    healthRecordsQuestionnaireFirstQuestionNoColoredDiv: `[data-test-id="question1No"]>div`,
    healthRecordsQuestionnaireFirstQuestionYesColoredDiv: `[data-test-id="question1Yes"]>div`,
    healthRecordsQuestionnaireSecondQuestionNoColoredDiv: `[data-test-id="question2No"]>div`,
    healthRecordsQuestionnaireSecondQuestionYesColoredDiv: `[data-test-id="question2Yes"]>div`,

    // Patient Profile > Visit History
    visitHistoryPanel: `.eVisitAppPagerContainer .eVisitAppPagerPageContainer`,
    visitHistoryBackButton: `[data-test-id="panelBack"]`,
    visitHistoryDownloadButton: `[data-test-id="downloadVisitHistory"]`,

};

const commands = [{

    /*
    *   This function make sure the page is completelly loaded before continuing, using any specified element as a trait
    *   Input: 
    *       - Patient's email
    *       - Patient's password
    */
    accessVisitHistoryPage(email, password) {
        // Load all the page objects necessary
        const loginPage = this.api.page.loginPage()
        const geolocationPage = this.api.page.patient.geolocationPage()
        const landingPage = this.api.page.patient.landingPage()

        loginPage
            .goToPracticeLoginPage()
            .userLogin(email, password)
        geolocationPage.confirmGeolocation()
        landingPage.selectVisitHistory();
        // Wait for a expected element from this page to be displayed
        this.waitForElementVisible('@dateFilter')
        return this
    },

    /*
    *   This function will make sure the date filter is adjusted to a specific date
    *   Input: Desired date
    */
    changeDateFilter(date) {
        return this
            .waitForElementNotPresent('@spinner')
            .editTextField('@dateFilter', date)
            // Sometimes the loading spinner takes a few seconds to appear on screen to signify the loading proccess
            .waitForElementPresent('@spinner', 10000)
            .waitForElementNotPresent('@spinner')
            // The visit that will be used is a known visit expected to be available in the selected date
            .waitForElementPresent('@firstVisitRow', 10000)
    },

    /*
    *   This function will verify all information in the visit history first row accordingly to information provided
    *   Input: 
    *       - Patient's name 
    *       - Patient's gender and age
    *       - Visit type
    *       - Provider's name
    *       - Date and time of visit accordingly to what is expected to be in the visit row
    */
    checkFirstRow(
        patientName, 
        genderAge, 
        visitType, 
        providerName, 
        dateTime
        ) {
        return this
            // The perform function used several times in this file will make sure, among other things, that the text log is displayed at the same time as the results in order to make the logs easier to read
            .perform(() => {
                console.log("- Comparing info from the visit row with expected values:")

                // Each of the meaningful information in the visit row is verified
                this.expect.element(`@firstVisitRow`).text.to.contain(patientName)
                this.expect.element(`@firstVisitRow`).text.to.contain(genderAge)
                this.expect.element(`@firstVisitRow`).text.to.contain(visitType)
                this.expect.element(`@firstVisitRow`).text.to.contain(providerName)
                this.expect.element(`@firstVisitRow`).text.to.contain(dateTime)
            })
    },

    /*
    *   This function will verify all information in the visit history's visit details accordingly to information provided
    *   Input: 
    *       - Short reason for request answer
    *       - Description of illness answer
    */
    checkVisitDetails(shortReason, descriptionIllness) {
        this
            .click('@firstVisitRow')
            .expect.element(`@visitSidePanel`).text.to.contain('Visit Details').before(10000);
        this.perform(() => {
            console.log("- Comparing info from the visit's Visit Details side panel with expected values:")

            this.expect.element(`@visitSidePanel`).text.to.contain('Short reason for request')
            this.expect.element(`@visitSidePanel`).text.to.contain(shortReason)
            this.expect.element(`@visitSidePanel`).text.to.contain('Description of illness')
            this.expect.element(`@visitSidePanel`).text.to.contain(descriptionIllness)
            this.expect.element(`@visitSidePanel`).text.to.contain('Visit Survey')
            this.expect.element(`@visitSidePanel`).text.to.contain('The survey was not taken.')
        })
        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   This function will verify all tabs inside visit history accordingly to what is expected
    *   Input: None
    */
    checkPatientProfile() {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
            // This assertion not only verified the title but also give it time to load in a single line of code
            .expect.element(`@visitSidePanel`).text.to.contain('Patient Profile').before(10000);
        this.perform(() => {
            console.log("- Checking if all expected Patient Profile options are available:")

            this.expect.element(`@patientProfilePersonalInfo`).text.to.contain('Personal Info')
            this.expect.element(`@patientProfileInsurance`).text.to.contain('Insurance')
            this.expect.element(`@patientProfileHealthRecords`).text.to.contain('Health Records')
            this.expect.element(`@patientProfileVisitHistory`).text.to.contain('Visit History')
        })
        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   This function will verify all fields saved in the personal info tab of the visit's patient
    *   Input: All fields from the personal info form (Full name, full address, date of birth, gender, timezone)
    *   The default inputs in this function are based in the test for the patient's personal info settings
    */
    checkPersonalInfo(
        personalInfoFirstName = 'First Name Edited',
        personalInfoMiddleName = 'Middle Name Edited',
        personalInfoLastName = 'Last Name Edited',
        personalInfoFirstAddress = 'Address 1 Edited',
        personalInfoSecondAddress = 'Address 2 Edited',
        personalInfoCity = 'City Edited',
        personalInfoState = 'Wyoming',
        personalInfoZip = '12345',
        personalInfoCell = '480-289-1576',
        personalInfoDOB = '09/06/1990',
        personalInfoGender = 'Female',
        personalInfoTimezone = 'America/Noronha (-02 -0200)'
    ) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
            .expect.element(`@visitSidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfilePersonalInfo')
            .waitForElementPresent['@personalInfoFirstName']
        this.perform(() => {
            console.log("- Comparing info from the visit's Personal Info side panel with expected values:")

            this.expect.element(`@personalInfoFirstName`).value.to.contain(personalInfoFirstName)
            this.expect.element(`@personalInfoMiddleName`).value.to.contain(personalInfoMiddleName)
            this.expect.element(`@personalInfoLastName`).value.to.contain(personalInfoLastName)
            this.expect.element(`@personalInfoFirstAddress`).value.to.contain(personalInfoFirstAddress)
            this.expect.element(`@personalInfoSecondAddress`).value.to.contain(personalInfoSecondAddress)
            this.expect.element(`@personalInfoCity`).value.to.contain(personalInfoCity)
            this.expect.element(`@personalInfoState`).value.to.contain(personalInfoState)
            this.expect.element(`@personalInfoZip`).value.to.contain(personalInfoZip)
            this.expect.element(`@personalInfoCell`).value.to.contain(personalInfoCell)
            this.expect.element(`@personalInfoDOB`).value.to.contain(personalInfoDOB)
            this.expect.element(`@personalInfoGender`).value.to.contain(personalInfoGender)
            this.expect.element(`@personalInfoTimezone`).value.to.contain(personalInfoTimezone)
        })
        this.click('@personalInfoBackButton') // Back button
        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   This function will verify all fields saved in the insurance tab of the visit's patient
    *   Input: All fields from the insurance form (Insurance company, Relation with policy holder, ID, Insurance Group, Policy Type, phone)
    *   The default inputs in this function are based in the test for the patient's insurance settings
    */
    checkInsurance(
        insuranceInsuranceCompany = 'Automation Insurance Test',
        insuranceRelationPolicyHolder = 'Self',
        insuranceID = '123',
        insuranceGroup = '321',
        insurancePolicyType = 'Other',
        insurancePhone = '5555555555'
        ) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
            .expect.element(`@visitSidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileInsurance')
            .waitForElementPresent['@insuranceInsuranceCompany']
        this.perform(() => {
            console.log("- Comparing info from the visit's Insurance side panel with expected values:")

            this.expect.element(`@insuranceInsuranceCompany`).value.to.contain(insuranceInsuranceCompany)
            this.expect.element(`@insuranceRelationPolicyHolder`).value.to.contain(insuranceRelationPolicyHolder)
            this.expect.element(`@insuranceID`).value.to.contain(insuranceID)
            this.expect.element(`@insuranceGroup`).value.to.contain(insuranceGroup)
            this.expect.element(`@insurancePolicyType`).value.to.contain(insurancePolicyType)
            this.expect.element(`@insurancePhone`).value.to.contain(insurancePhone)
        })
        this.click('@insuranceBackButton') // Back button
        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   This function will verify all options available for health records data
    *   Input: None
    */
    checkHealthRecordsSidepanel() {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
            .expect.element(`@visitSidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileHealthRecords')
        this.perform(() => {
            console.log("- Checking if all expected health records are available:")

            this.expect.element(`@healthRecordsGeneralAllergies`).text.to.contain('General Allergies')
            this.expect.element(`@healthRecordsMedicationAllergies`).text.to.contain('Medication Allergies')
            this.expect.element(`@healthRecordsMedications`).text.to.contain('Medications')
            this.expect.element(`@healthRecordsConditions`).text.to.contain('Conditions')
            this.expect.element(`@healthRecordsProcedures`).text.to.contain('Procedures')
            this.expect.element(`@healthRecordsFamilyHistory`).text.to.contain('Family History')
            this.expect.element(`@healthRecordsQuestionnaire`).text.to.contain('Questionnaire')
        })

        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   This function cleans any previous added entries in the health record data
    *   Input: None
    */
    cleanList() {
        // Count the number of available elements from a specific selector
        return this.api.elements('@healthRecordsAnyItems', result => {
            const numElements = result.value.length;

            // If there is elements on screen, delete them to guarantee a known state
            if (numElements > 0) {
                this.click(`@healthRecordsAnyEditButton`)
                    .waitForElementVisible(`@healthRecordsAnyRemoveEntry`)
                for (i = 1; i <= numElements; i++) {
                    this.click('@healthRecordsAnyRemoveEntry')
                }
                this.click('@healthRecordsAnySaveButton')
            }
        });
    },

    /*
    *   This function checks if a certain number of elements is displayed in the list
    *   Input: Expected number of items in the list
    */
    countListEntries(NumOfExpectedElementsInTheList) {
        return this.api.elements('@healthRecordsAnyItems', result => {
            var numOfElementsInTheList = result.value.length;
            console.log("- Numbers of elements in the list currently: " + numOfElementsInTheList + " | Numbers of expected elements in the list: " + NumOfExpectedElementsInTheList)
            
            // The 'equal' assert is very useful for checking the number of elements on screen is the desired number
            // This will allow the test to be trustworthy even not knowing the exact text of each element
            this.assert.equal(numOfElementsInTheList, NumOfExpectedElementsInTheList);
        });
    },

    /*
    *   This function adds a desired number of default options to the list
    *   Input: The quantity of default options that should be added. It uses 1 entry as default value
    */
    addDefaultEntries(quantity = 1) {
        this.click(`@healthRecordsAnyEditButton`)
            .waitForElementVisible(`@healthRecordsAnyToggleButton`)
            // Open 'Show List' of default entries
            .click(`@healthRecordsAnyToggleButton`) 
        // Will add the desired number of default entries
        for (count = 1; count <= quantity; count++) {
            this.click('@healthRecordsAnyAddEntry')
        }

        // Save and return to the health record panel with all entries
        this.click('@healthRecordsAnySaveButton')
            .waitForElementVisible(`@healthRecordsAnyEditButton`, 10000)
        return this
    },

    /*
    *   This function adds a custom entry with specified text
    *   Input: Text to be used as the entry's text
    */
    addCustomEntry(newCustomTxt) {
        return this.click(`@healthRecordsAnyEditButton`)
            .waitForElementVisible(`@healthRecordsAnyToggleButton`)

            // Add a new entry with custom text (Different option from the ones in the default list)
            .setValue('@healthRecordsAnyInputField', newCustomTxt)
            .click('@healthRecordsAnyInputAddButton')

            // Save and return to the health record panel with all entries
            .click('@healthRecordsAnySaveButton')
            .waitForElementVisible(`@healthRecordsAnyEditButton`, 10000)
    },

    /*
    *   This function compare the last updated text on screen with the expected text and values
    *   Input: The text currently on screen
    */
    checkLastUpdated(lastUpdatedOnScreen) {
        // Get today's date and time
        today = new Date();
        // Get day without 0 as the first digit for the first 9 days
        dd = String(today.getDate());
        // Get month without 0 as the first digit for the first 9 months
        mm = String(today.getMonth() + 1); //January is month 0
        // Get year with 4 digits
        yyyy = today.getFullYear();
        // Remove the first 2 digits from the year
        yy = yyyy.toString().substr(-2);
        // Get hours in 12-hour format
        hh = today.getHours() % 12 || 12
        // Get minutes and AM/PM
        min = today.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        // Remove the hour and the space between minutes and AM/PM. Also convert the letters to lower case
        min = min.substr(3, 2) + min.substr(6, 2).toLowerCase()
        // Create the final string with all the variables created above
        lastUpdatedExpected = 'Last updated - ' + mm + '/' + dd + '/' + yy + ' at ' + hh + ":" + min

        // If the expected value is different from what was gathered on screen, the test will try 1min before since it can change to the next minute in the time between saving the info and using it (not common but possible)
        if (lastUpdatedOnScreen == lastUpdatedExpected) {
            // Compare date on screen with the string created with real information
            this.assert.equal(lastUpdatedOnScreen, lastUpdatedExpected);
        } else {
            // Get today's date and time in another variable
            today2 = new Date(today);
            // Subtract one minute to this instance
            today2.setMinutes(today.getMinutes() - 1);
            // Do the same as before for the minutes and AM/PM but now with one less minute 
            min = today2.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            min = min.substr(3, 2) + min.substr(6, 2).toLowerCase()
            lastUpdatedExpected = 'Last updated - ' + mm + '/' + dd + '/' + yy + ' at ' + hh + ":" + min
            // Compare date on screen with the string created with real information
            this.assert.equal(lastUpdatedOnScreen, lastUpdatedExpected);
        }
        return this
    },

    /*
    *   This function will be used to edit a specific health record type
    *   Input: 
    *       - The type chosen (Ex: Medications), 
    *       - The number of entries from the list to be used
    *       - Custom text for the custom entry
    */
    editHealthRecordAnyType(type, defaultEntriesQuantity, customEntryText) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
            .expect.element(`@visitSidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileHealthRecords')
            .click('@healthRecords' + type)
            // Pause needed because sometimes the loading spinner don't appear right away
            .pause(1000)
            .waitForElementNotPresent('@healthRecordsAnySpinner')
        this.cleanList()
        // List should have 0 elements after cleanup
        this.countListEntries(0) 
        this.addDefaultEntries(defaultEntriesQuantity)
        // The list should have n default elements
        this.countListEntries(defaultEntriesQuantity) 
        this.addCustomEntry(customEntryText)
        // The list should have n default elements plus 1 custom element
        this.countListEntries(defaultEntriesQuantity + 1) 
        this.getText('@healthRecordsAnyPanel', (result) => {
            // Save all text displayed in the panel as an array
            TextFromPanel = result.value.split("\n"); // Temporarily used to save the array
            // Get the last item in the array, aka the last updated time
            healthRecordsAnyLastUpdated = TextFromPanel[TextFromPanel.length - 1] 
        })
        this.perform(() => {
            console.log("- Compare last updated message with real time message saved during last update:")

            this.checkLastUpdated(healthRecordsAnyLastUpdated)
        })
        this.click('@healthRecordsAnyBackButton') // Back button
            .click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   This function will be used to edit a few questions in the questionnaire health records page
    *   Input: None
    */
    editQuestionnaire() {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
            .expect.element(`@visitSidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileHealthRecords')
            .click('@healthRecordsQuestionnaire')
            .getText('@healthRecordsQuestionnaireSidepanel', (result) => {
                // Save the answers for the first two answers of the questionnaire questions
                TextFromPanel = result.value.split("\n"); //temporarily used to store an array
                healthRecordsQuestionnaireAnswer1 = TextFromPanel[2]
                healthRecordsQuestionnaireAnswer2 = TextFromPanel[4]

                console.log("- Before automated change - Questionnaire answer 1: " + healthRecordsQuestionnaireAnswer1 + " | Questionnaire answer 2: " + healthRecordsQuestionnaireAnswer2)
            })
        this.click(`@healthRecordsQuestionnaireEditButton`)

        //Edit the answers of the first two questions by changing from NO to YES or vice-versa
        this.perform(() => {
            if (healthRecordsQuestionnaireAnswer1 == 'No') {
                this.click('@healthRecordsQuestionnaireFirstQuestionYes')
            } else {
                this.click('@healthRecordsQuestionnaireFirstQuestionNo')
            }

            if (healthRecordsQuestionnaireAnswer2 == 'No') {
                this.click('@healthRecordsQuestionnaireSecondQuestionYes')
            } else {
                this.click('@healthRecordsQuestionnaireSecondQuestionNo')
            }
        })
        this.click('@healthRecordsAnySaveButton')
            .waitForElementVisible(`@healthRecordsQuestionnaireEditButton`, 10000)
            .getText('@healthRecordsQuestionnaireSidepanel', (result) => {
                // Save the now updated answers for the first two answers of the questionnaire questions
                TextFromPanel = result.value.split("\n"); //temporarily used to store an array
                healthRecordsQuestionnaireAnswer1AfterMod = TextFromPanel[2]
                healthRecordsQuestionnaireAnswer2AfterMod = TextFromPanel[4]

                console.log("- After automated change - Questionnaire answer 1: " + healthRecordsQuestionnaireAnswer1AfterMod + " | Questionnaire answer 2: " + healthRecordsQuestionnaireAnswer2AfterMod)
            
                // Also save the last updated text to be used later for comparison
                healthRecordsQuestionnaireLastUpdated = TextFromPanel[TextFromPanel.length - 1]
            })
        this.perform(() => {
            //Final assertions between answers before and after editing them
            console.log("- Assertions to compare before and after automated change in answers:")

            this.assert.not.equal(healthRecordsQuestionnaireAnswer1, healthRecordsQuestionnaireAnswer1AfterMod);
            this.assert.not.equal(healthRecordsQuestionnaireAnswer2, healthRecordsQuestionnaireAnswer2AfterMod);
        })
        this.perform(() => {
            // Check if the last updated text corresponds with the reality
            console.log("- Compare last updated message with real time message saved during last update:")

            this.checkLastUpdated(healthRecordsQuestionnaireLastUpdated)
        })
            .click('@healthRecordsAnyBackButton') // Back button
            .click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   Counts how many attachments are available on screen and compares it with a expected value
    *   Input: The quantity of attachments expected to be on screen
    */
    countAttachments(attachmentsExpectedQuantity) {
        this.api.elements('@Attachment', result => {
            numElements = result.value.length;

            console.log("- Verify that the number of attachments on screen are the same as the expected:")

            this.assert.equal(numElements, attachmentsExpectedQuantity);
        });
    },

    /*
    *   Check meaningful information inside a visit history entry available in the patient profile sidepanel
    *   Input:
    *       - The date of the visit history entry that should be used (will use the first entry with this date)
    *       - Answer of the first question of the visit details
    *       - Answer of the second question of the visit details
    *       - The text for the prescription
    *       - The text of the payment
    *       - The text of the chat usage
    *       - The number of attachments that is expected to be in this visit
    */
    checkVisitHistoryListed(
        visitHistoryDate, 
        shortReason, 
        descriptionIllness, 
        prescriptionText, 
        payment, 
        chatMessage, 
        attachmentsExpectedQuantity
        ) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
            .expect.element(`@visitSidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileVisitHistory')

        // This will use xpath to find the visit entry with the specific date asked
        this.useXpath()
        this.click("//*[contains(text(), '" + visitHistoryDate + "')]")
        this.useCss()

            .expect.element(`@visitHistoryPanel`).text.to.contain('Visit Details').before(10000);

        this.getText('@visitHistoryPanel', (result) => {
            // Save all text in the visit history panel as an array
            visitHistoryPanelArray = result.value.split("\n"); // Temporarily used to store an array
        })
        this.perform(() => {
            // Compare visit details queestions and answers with expected values
            console.log("- Assertions to verify visit details of visit history entry of the patient profile:")

            visitdetailsIndex = visitHistoryPanelArray.indexOf('Visit Details')
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 2], 'Short reason for request')
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 3], shortReason)
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 4], 'Description of illness')
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 5], descriptionIllness)
        })

        // Compare the number of attachments on screen with the expected amount
        this.countAttachments(attachmentsExpectedQuantity)

        this.perform(() => {
            // Compare the prescription text with expected value
            console.log("- Assertions to verify any prescription of visit history entry of the patient profile:")

            PrescriptionsIndex = visitHistoryPanelArray.indexOf('Prescriptions')
            this.assert.equal(visitHistoryPanelArray[PrescriptionsIndex + 1], prescriptionText)
        })
        this.perform(() => {
            // Compare the payment message with the expected message
            console.log("- Assertions to verify any payment of visit history entry of the patient profile:")

            PaymentsIndex = visitHistoryPanelArray.indexOf('Payments')
            this.assert.equal(visitHistoryPanelArray[PaymentsIndex + 1], payment)
        })
        this.perform(() => {
            // Compare the chat message with the expected message
            console.log("- Assertions to verify the use of chat of visit history entry of the patient profile:")

            ChatIndex = visitHistoryPanelArray.indexOf('Chat')
            this.assert.equal(visitHistoryPanelArray[ChatIndex + 1], chatMessage)
        })

        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   Open the attachments sidepanel and verify if the expected amount of attachments are available
    *   Input: The quantity of attachments expected to be on screen
    */
    checkAttachments(attachmentsExpectedQuantity) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@attachmentIcon']
        this.click('@attachmentIcon')
            .expect.element(`@visitSidePanel`).text.to.contain('Attachments').before(10000);
        this.countAttachments(attachmentsExpectedQuantity)

        this.click('@firstVisitRow') // Close panel
        return this
    },
}];

module.exports = {
    elements: elements,
    commands: commands
}
