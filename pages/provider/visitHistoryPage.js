// Variables used for questionnaire comparisons
var healthRecordsAnyLastUpdated;
var healthRecordsQuestionnaireAnswer1;
var healthRecordsQuestionnaireAnswer2;

// Arrays and variables to be used as a convertion from date in numbers to text
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dateSplit;

// Array with every piece of text available inside the patient profile > visit history panel
var visitHistoryPanelArray;
// Array with information about the pharmacy to be saved
var PharmacyEntryArray;

const elements = {

    // Alert banner on top if alert/success/failed action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    // Default loading spinner
    spinner: `.eVisitAppBasePageMainContainer .eVisitAppLoadingSpinner`,

    // Visit History page filters
    visitStatusFilter: `[data-test-id="visitCompletedStatusFilterTestID"] [type='text']`,
    visitKindFilter: `[data-test-id="visitKindFilterTestID"] [type='text']`,
    providerFilter: `[data-field='provider'] [type='text']`,
    dateFilter: `[data-test-id="visitDateRangeFilterTestID"] [type="text"]`,
    searchFilter: `[data-test-id="visitSearchFilterTestID"]`,

    // Visit status page filter options
    visitStatusAllOption: `[data-test-id="allCompletedStatusOptionTestID"]`,
    visitStatusCompleteOption: `[data-test-id="completeCompletedStatusOptionTestID"]`,
    visitStatusIncompleteOption: `[data-test-id="incompleteCompletedStatusOptionTestID"]`,

    // Visit Kind page filter options
    visitKindAllOption: `[data-test-id="allKindOptionTestID"]`,
    visitKindOnDemandOption: `[data-test-id="onDemandKindOptionTestID"]`,
    visitKindScheduledOption: `[data-test-id="scheduledKindOptionTestID"]`,

    // Result that will appear when a provider name is searched for
    providerSearchResult: `.eVisitAppPopupMenu .eVisitAppListItem:nth-child(2)`,

    // The first patient row in the visit history page
    firstVisitRow: `[data-test-id="rowClick0"]`,
    firstVisitRowIcon: `[data-test-id="visitRowMoreLess0"]`,

    // Sidepanel showing information about the visit history entry
    visitHistorySidePanel: `.eVisitAppDrawer`,

    // General attachment identifier
    Attachment: `.eVisitAppAttachment`,

    // Sidepanel tabs
    visitDetailsIcon: `[data-test-id="visitDetailsSideBarTab"]`,
    patientProfileIcon: `[data-test-id="patientProfileSideBarTab"]`,
    attachmentIcon: `[data-test-id="attachmentsSideBarTab"]`,
    chartIcon: `[data-test-id="chartSideBarTab"]`,
    eprescribeIcon: `[data-test-id="eprescribeSideBarTab"]`,
    paymentsIcon: `[data-test-id="paymentsSideBarTab"]`,

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
    healthRecordsAnyItems: `.eVisitAppPanelBase .eVisitAppPanelBase .eVisitAppList .eVisitAppListItem`,
    healthRecordsAnyBackButton: '[data-test-id="panelBack"]',
    healthRecordsAnyEditButton: `[data-test-id="editMedicalRecord"]`,
    healthRecordsAnySpinner: `.eVisitAppPanelBase .eVisitAppLoadingSpinner`,

    // Patient Profile > Health Records > Any health record type > Edit
    healthRecordsAnyInputField: `[data-test-id="listInput"]`,
    healthRecordsAnyInputAddButton: `.eVisitAppPagerEastPageContainer .eVisitAppTextFieldIcon`,
    healthRecordsAnyToggleButton: `[data-test-id="toggleSuggestions"]`,
    healthRecordsAnySaveButton: `[data-test-id="saveChanges"]`,
    healthRecordsAnySaveDenyButton: `[data-test-id="confirmModalDeny"]`,
    healthRecordsAnySaveConfirmButton: `[data-test-id="confirmModalConfirm"]`,
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
    visitHistoryPanel: `.eVisitAppPagerContainer .eVisitAppPagerEastPageContainer`,
    visitHistoryBackButton: `[data-test-id="panelBack"]`,

    // Chart Options
    chartChiefComplaint: `[data-test-id="cheifComplaint"]`,
    chartHistoryPresentIllness: `[data-test-id="question1"]`,
    chartAssessment: `[data-test-id="question2"]`,
    chartPlan: `[data-test-id="question3"]`,
    chartRobust: `[data-test-id="question4"]`,
    chartRobustCompleted: `[data-test-id="question5"]`,
    chartRobustThreeDots: `[data-field="robust_test"] .eVisitAppIcon`,
    chartRobustAllOption: `[data-test-id="testOption"]`,

    // Chart Options > Robust Template
    chartRobustNo: `[data-test-id="question1No"]`,
    chartRobustYes: `[data-test-id="question1Yes"]`,
    chartRobustQuestion1: `[data-test-id="question2"]`,
    chartRobustSignature: `[data-test-id="question3"]`,

    // Eprescribe options
    savedPharmacyEntry: `[data-test-id="rowClick"]`,
    savedPharmacyEditIcon: `[data-test-id="pharmacyEdit"]`,
    addPrescription: `[data-test-id="addMedicationSupply"]`,
    savedPrescriptionEntry: `.eVisitAppListItem [data-test-id='rowClick']`,
    savedPrescriptionEntryEditButton: `.eVisitAppList [data-test-id='rowClick'] .eVisitAppIconButton`,
    savedPrescriptionEntryEditConfirmationNoButton: `[data-test-id="confirmModalDeny"]`,
    savedPrescriptionEntryEditConfirmationYesButton: `[data-test-id="confirmModalConfirm"]`,

    // Eprescribe options > Edit Pharmacy
    editPharmacyAddressField: `[data-test-id="addressLine1"]`,  // Valid zip codes with pharmacies: 47374, 85210
    editPharmacyListedPharmacies1: `[data-test-id="pharmacyRow0"]`,
    editPharmacyMapIcon: `[data-test-id="mapIcon"]`,
    editPharmacyListIcon: `[data-test-id="listIcon"]`,
    editPharmacyConfirmationNoButton: `[data-test-id="confirmModalDeny"]`,
    editPharmacyConfirmationYesButton: `[data-test-id="confirmModalConfirm"]`,
    editPharmacyCancelButton: `[data-test-id="cancelEditPharmacy"]`,

    // Eprescribe > Add new Prescription
    medicationIcon: `[data-test-id="medicationIconButton"]`,
    supplyIcon: `[data-test-id="supplyIconButton"]`,
    prescriptionAddSaveButton: `[data-test-id="saveRX"]`,
    prescriptionAddCancelButton: `[data-test-id="cancelEditRX"]`,
    prescriptionEditDeleteButton: `[data-test-id="deleteRX"]`,

    // Eprescribe > Add new Prescription (Medication)
    medicationSearchField: `[data-test-id="medicationName"]`,
    medicationSearchResultOption1: `[data-test-id*="Option"]`,
    medicationStrengthCombobox: `[data-test-id="medicationStrength"]`,
    medicationStrengthOption1: `[data-test-id*="Option"]`,
    medicationStrengthOption1Text: `[data-test-id*="Option"] span`,
    medicationFrequencyCombobox: `[data-test-id="medicationFrequency"]`,
    medicationFrequencyOption1: `[data-test-id*="Option"]`,
    medicationDoseField: `[data-test-id="medicationDose"]`,
    medicationUnitCombobox: `[data-test-id="medicationUnit"] [type="text"]`,
    medicationUnitOption1: `[data-test-id*="Option"]`,
    medicationDurationField: `[data-test-id="duration"]`,
    medicationDispenseField: `[data-test-id="medicationDispense"]`,
    medicationRefillsField: `[data-test-id="refills"]`,
    medicationSubstitutionsAllowedCheckbox: `[data-test-id="substitutionsAllowed"]`,
    medicationDirectionsPatientField: `[data-test-id="directionsToPatient"]`,
    medicationDirectionsPharmacyField: `[data-test-id="directionsToPharmacy"]`,
    medicationFavoriteCheckbox: `[data-test-id="addToFavorites"]`,

    // Eprescribe > Add new Prescription (Supply)
    supplySearchField: `[data-test-id="supplyName"]`,
    supplySearchResultOption1: `[data-test-id*="Option"]`,
    supplyTypeCombobox: `[data-test-id="supplyType"]`,
    supplyTypeComboboxText: `[data-test-id="supplyType"] [type="text"]`,
    supplyTypeOption1: `[data-test-id*="Option"]`,
    supplyDispenceField: `[data-test-id="supplyDispense"]`,
    supplyUnitCombobox: `[data-test-id="supplyUnit"]`,
    supplyUnitComboboxText: `[data-test-id="supplyUnit"] [type="text"]`,
    supplyUnitOption1: `[data-test-id*="Option"]`,
    supplyDurationField: `[data-test-id="duration"]`,
    supplyRefillsField: `[data-test-id="refills"]`,
    supplySubstitutionsAllowedCheckbox: `[data-test-id="substitutionsAllowed"]`,
    supplyDirectionsPatientField: `[data-test-id="directionsToPatient"]`,
    supplyDirectionsPharmacyField: `[data-test-id="directionsToPharmacy"]`,
    supplyFavoriteCheckbox: `[data-test-id="addToFavorites"]`,
    supplyConfirmPrescriptionSubstancesCheckbox: `[data-test-id="confirmPrescriptionSubstances"]`,
};

const commands = [{

    /*
    *   This function will make sure the page is completelly loaded before continuing, using any specified element as a trait
    *   Input: Provider's email and password
    */
    accessVisitHistoryPage(email, password) {
        const loginPage = this.api.page.loginPage()
        const waitingRoomPage = this.api.page.provider.waitingRoomPage()
        loginPage
            .goToPracticeLoginPage()
            .userLogin(email, password)
        waitingRoomPage.openVisitHistory();
        // Sometimes the loading spinner takes a few seconds to appear on screen to signify the loading proccess
        this.waitForElementPresent('@spinner', 10000)
        .waitForElementNotPresent('@spinner')
        this.waitForElementVisible('@firstVisitRow') // Trait
        return this
    },

    /*
    *   This function will change the combobox filters
    *   Input: The combobox and option that should be selected
    */
    changeFilters(combobox, option) {
        return this
            .waitForElementNotPresent('@spinner')
            .click('@' + combobox + 'Filter')
            .waitForElementVisible('@' + combobox + option + 'Option')
            .click('@' + combobox + option + 'Option')
            .waitForElementPresent('@firstVisitRow', 15000)
            // Sometimes the loading spinner takes a few seconds to appear on screen to signify the loading proccess
            .pause(3000) // This pause is necessary because it usually takes a couple of seconds for the spinner to appear, but sometimes it doesn't appear altogether
            .waitForElementNotPresent('@spinner',20000)
    },

    /*
    *   This function will change the provider filter
    *   Input: The name of the provider that should be selected in the list
    */
    changeProviderFilter(providerKeyword) {
        return this
            .waitForElementNotPresent('@spinner')
            .editTextField('@providerFilter', providerKeyword)
            .waitForElementPresent('@providerSearchResult', 10000)
            .pause(500)
            .click('@providerSearchResult')
            .waitForElementPresent('@firstVisitRow', 10000)
            // Sometimes the loading spinner takes a few seconds to appear on screen to signify the loading proccess
            .pause(3000) // This pause is necessary because it usually takes a couple of seconds for the spinner to appear, but sometimes it doesn't appear altogether
            .waitForElementNotPresent('@spinner')
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
            .pause(3000) // This pause is necessary because it usually takes a couple of seconds for the spinner to appear, but sometimes it doesn't appear altogether
            .waitForElementNotPresent('@spinner', 10000)
            // The visit that will be used is a known visit expected to be available in the selected date
            .waitForElementPresent('@firstVisitRow', 10000)
    },

    /*
    *   Search for a specific term using the searchbox
    *   Input: The keyword that should be used in the search
    */
    changeSearch(keyword) {
        return this
            .waitForElementNotPresent('@spinner')
            .editTextField('@searchFilter', keyword)
            // Sometimes the loading spinner takes a few seconds to appear on screen to signify the loading proccess
            .pause(3000) // This pause is necessary because it usually takes a couple of seconds for the spinner to appear, but sometimes it doesn't appear altogether
            .waitForElementNotPresent('@spinner',10000)
            .waitForElementPresent('@firstVisitRow', 10000)
    },

    /*
    *   This function will verify all information in the visit history first row accordingly to information provided
    *   Input: 
    *       - Patient's name 
    *       - Patient's gender and age
    *       - Visit Status
    *       - Provider's name
    *       - Patient Status
    */
    checkFirstRow(
        patientName,
        genderAge,
        visitType,
        providerName,
        dateTime
    ) {
        // Make sure the patient more/less icon has the correct text
        this.expect.element(`@firstVisitRowIcon`).text.to.contain('More').before(10000);
        // The 'perform' function is used several times in this file and will make sure, among other things, that the text log is displayed at the same time as the results in order to make the logs easier to read
        this.perform(() => {
            console.log("- Comparing info from the visit row with expected values:")

            // Each of the meaningful information in the visit row is verified
            this.expect.element(`@firstVisitRow`).text.to.contain(patientName)
            this.expect.element(`@firstVisitRow`).text.to.contain(genderAge)
            this.expect.element(`@firstVisitRow`).text.to.contain(visitType)
            this.expect.element(`@firstVisitRow`).text.to.contain(providerName)
            this.expect.element(`@firstVisitRow`).text.to.contain(dateTime)
        })
        return this
    },

    /*
    *   Erase the search fields to make sure we have a controlled state
    *   Input: None
    */
    cleanFilters() {
        return this
            .waitForElementNotPresent('@spinner')
            .click('@visitStatusFilter')
            .waitForElementVisible('@visitStatusAllOption')
            .click('@visitStatusAllOption')
            .click('@visitKindFilter')
            .waitForElementVisible('@visitKindAllOption')
            .click('@visitKindAllOption')
            .editTextField('@providerFilter', "")
            .editTextField('@dateFilter', "09/01/2020 - 9/30/2020")
            .editTextField('@searchFilter', "")

            // Wait for the page to load
            .waitForElementPresent('@spinner', 10000)
            .waitForElementNotPresent('@spinner', 20000)
    },

    /*
    *   Search for a specific visit using all available filters and verify that the texts on it are the ones expected
    *   Input: 
    *       - Visit Status Option in combobox
    *       - Visit Kind Option in combobox
    *       - Provider name to be searched
    *       - Date of the visit
    *       - Keyword to be used in the search field
    *       - Name of the patient that should appear
    *       - Gender/Age of the patient that should appear 
    *       - visit type of the visit that should appear
    *       - Provider name in the visit that should appear
    *       - the date and time the visit tha should appear took place
    */
    findVisitAllFilters(visitStatusOption, visitKindOption, providerKeyword, date, searchKeyword,
        patientName, genderAge, visitType, providerName, dateTime) {

        this.cleanFilters()

        // Set all the filter fields
        this.changeFilters('visitStatus', visitStatusOption)
        this.changeFilters('visitKind', visitKindOption)
        this.changeProviderFilter(providerKeyword)
        this.changeDateFilter(date)
        this.changeSearch(searchKeyword)

        // Verify the first row information
        this.checkFirstRow(patientName, genderAge, visitType, providerName, dateTime)

        return this
    },

    /*
    *   Faster way to find a visit and still guarantee it will bring just the desired result
    *   Input: 
    *       - Date of the visit
    *       - Keyword to be used in the search field
    */
    findVisitByDateAndSearch(date, searchKeyword) {

        this.editTextField('@dateFilter', date)
            .editTextField('@searchFilter', searchKeyword)
        // Sometimes the loading spinner takes a few seconds to appear on screen to signify the loading proccess
        .pause(1500) // This pause is necessary because it usually takes a couple of seconds for the spinner to appear, and sometimes it doesn't appear altogether
        .waitForElementPresent('@firstVisitRow', 10000)

        // Necessary to convert the date from numbers to "Jan 01" format, which is the one expected
        dateSplit = date.split("/"); // Temporarily used to store an array

        this.expect.element(`@firstVisitRow`).text.to.contain(searchKeyword).before(20000);
        this.expect.element(`@firstVisitRow`).text.to.contain(months[(dateSplit[0])-1] + " " + dateSplit[1]).before(20000); // January is 0!
        return this
    },

    /*
    *   This function will verify all information in the visit history's visit details accordingly to information provided
    *   Input: 
    *       - Short reason for request answer
    *       - Description of illness answer
    *       - Survey text
    */
    checkVisitDetails(shortReason, descriptionIllness, surveyAnswer) {
        this
            .click('@firstVisitRow')
        // Make sure the More/Less icon changes as expected
        this.expect.element(`@firstVisitRowIcon`).text.to.contain('Less').before(10000);

        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Visit Details').before(10000);
        this.perform(() => {
            console.log("- Comparing info from the visit's Visit Details side panel with expected values:")

            this.expect.element(`@visitHistorySidePanel`).text.to.contain('Short reason for request')
            this.expect.element(`@visitHistorySidePanel`).text.to.contain(shortReason)
            this.expect.element(`@visitHistorySidePanel`).text.to.contain('Description of illness')
            this.expect.element(`@visitHistorySidePanel`).text.to.contain(descriptionIllness)
            this.expect.element(`@visitHistorySidePanel`).text.to.contain('Visit Survey')
            this.expect.element(`@visitHistorySidePanel`).text.to.contain(surveyAnswer)
        })
        this.click('@firstVisitRow') // Close panel
        // Make sure the More/Less icon changes as expected
        this.expect.element(`@firstVisitRowIcon`).text.to.contain('More').before(10000);
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
        // This assertion not only verify the title but also give it time to load in a single line of code
        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Patient Profile').before(10000);
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
        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfilePersonalInfo')
            .waitForElementPresent['@personalInfoFirstName']
        this.perform(() => {
            console.log("- Comparing info from the patients's Personal Info side panel with expected values:")

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
        insurancePhone = '4802891576'
    ) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileInsurance')
            .waitForElementPresent['@insuranceInsuranceCompany']
        this.perform(() => {
            console.log("- Comparing info from the patient's Insurance side panel with expected values:")

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
    *   This function will verify all type options available for health records data
    *   Input: None
    */
    checkHealthRecordsSidepanel() {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Patient Profile').before(10000);
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
                    .waitForElementVisible(`@healthRecordsAnySaveConfirmButton`)
                    .click('@healthRecordsAnySaveConfirmButton')
                    .waitForElementVisible(`@healthRecordsAnyEditButton`, 10000)
            }
        });
    },

    /*
    *   This function checks if a certain number of elements is displayed in the list
    *   Input: Expected number of items in the list
    */
    countListEntries(NumOfExpectedElementsInTheList) {
        return this
            .waitForElementVisible(`@healthRecordsAnyEditButton`)
            .api.elements('@healthRecordsAnyItems', result => {
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
            .waitForElementVisible(`@healthRecordsAnySaveConfirmButton`)
            .click('@healthRecordsAnySaveConfirmButton')
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
            .waitForElementVisible(`@healthRecordsAnySaveConfirmButton`)
            .click('@healthRecordsAnySaveConfirmButton')
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
        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileHealthRecords')
            .click('@healthRecords' + type)
            // Pause needed because sometimes the loading spinner don't appear right away
            .pause(1000)
            .waitForElementNotPresent('@healthRecordsAnySpinner',15000)
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
    checkQuestionnaire(healthRecordsExpectedQuestionnaireAnswer1, healthRecordsExpectedQuestionnaireAnswer2) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@patientProfileIcon']
        this.click('@patientProfileIcon')
        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileHealthRecords')
            .click('@healthRecordsQuestionnaire')
            .getText('@healthRecordsQuestionnaireSidepanel', (result) => {
                // Save the answers for the first two answers of the questionnaire questions
                TextFromPanel = result.value.split("\n"); //temporarily used to store an array
                healthRecordsQuestionnaireAnswer1 = TextFromPanel[2]
                healthRecordsQuestionnaireAnswer2 = TextFromPanel[4]

            })
        this.perform(() => {
            //Final assertions between answers before and after editing them
            console.log("- Assertions to compare questionnaire expected answers with answers on screen:")

            this.assert.equal(healthRecordsQuestionnaireAnswer1, healthRecordsExpectedQuestionnaireAnswer1);
            this.assert.equal(healthRecordsQuestionnaireAnswer2, healthRecordsExpectedQuestionnaireAnswer2);
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
        this.expect.element(`@visitHistorySidePanel`).text.to.contain('Patient Profile').before(10000);
        this.click('@patientProfileVisitHistory')

        // This will use xpath to find the visit entry with the specific date asked
        this.useXpath()
        this.click("//*[contains(text(), '" + visitHistoryDate + "')]")
        this.useCss()

            .expect.element(`@visitHistoryPanel`).text.to.contain('Visit Details').before(20000);

        this.getText('@visitHistoryPanel', (result) => {
            // Save all text in the visit history panel as an array
            visitHistoryPanelArray = result.value.split("\n"); // Temporarily used to store an array
        })
        this.perform(() => {
            // Compare visit details questions and answers with expected values
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
            .expect.element(`@visitHistorySidePanel`).text.to.contain('Attachments').before(10000);
        this.countAttachments(attachmentsExpectedQuantity)

        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   Check all answers in the chart section, including addendum
    *   Input: Each of the expected answers and the addendum date/time and text
    */
    checkChartAnswers(chiefComplaint, chartHistory, chartAssessment, chartPlan, chartRobust1, chartRobust2, addendumDate, addendumText) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@attachmentIcon']
        this.click('@chartIcon')
        this.expect.element(`@visitHistoryPanel`).text.to.contain('Chart').before(10000);

        this.getText('@visitHistoryPanel', (result) => {
            // Save all text in the visit history panel as an array
            visitHistoryPanelArray = result.value.split("\n"); // Temporarily used to store an array
        })
        this.perform(() => {
            console.log("- Assertions to verify Chart's Answers, including robust template:")

            this.expect.element(`@chartChiefComplaint`).to.have.value.that.equals(chiefComplaint);
            this.expect.element(`@chartHistoryPresentIllness`).text.to.contain(chartHistory)
            this.expect.element(`@chartAssessment`).text.to.contain(chartAssessment)
            this.expect.element(`@chartPlan`).text.to.contain(chartPlan)
            this.expect.element(`@chartRobust`).text.to.contain(chartRobust1)
            this.expect.element(`@chartRobustCompleted`).text.to.contain(chartRobust2)

            // Compare addendum text with expected value
            console.log("- Assertions to verify Chart's Addendum:")

            visitdetailsIndex = visitHistoryPanelArray.indexOf('Addendum')
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 1], addendumDate)
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 2], addendumText)
        })
    },

    /*
    *   Check the titles of the sections inside the eprescribe tab
    *   Input: None
    */
    checkEPrescribeitems() {
        this
            .click('@firstVisitRow')
            .waitForElementPresent('@eprescribeIcon')
            .click('@eprescribeIcon')
        // Verify all text in the panel
        this.expect.element(`@visitHistoryPanel`).text.to.contain('ePrescribe').before(10000);
        this.expect.element(`@visitHistoryPanel`).text.to.contain('Preferred Pharmacy');
        this.expect.element(`@visitHistoryPanel`).text.to.contain('Prescriptions');
        // By default no prescriptions should be saved on the visit used
        this.expect.element(`@visitHistoryPanel`).text.to.contain('There are no saved prescriptions.');

        this.click('@firstVisitRow') // Close panel

        return this
    },

    /*
    *   Change the pharmacy to a new pharmacy in the selected zip code
    *   Input: The zip code to be used
    */
    changePharmacy(ZipToBeSearched) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent('@eprescribeIcon')
            .click('@eprescribeIcon')
        this.expect.element(`@visitHistoryPanel`).text.to.contain('ePrescribe').before(10000);

        // Wait for the page to load
        this.waitForElementNotPresent('@healthRecordsAnySpinner',15000)
            // Click on edit button from the saved pharmacy
            .click('@savedPharmacyEditIcon')

            // Wait for the textfield to be available and search for the zip passed as an input for this method
            .waitForElementVisible('@editPharmacyAddressField')
            .editTextField('@editPharmacyAddressField', ZipToBeSearched)

            // Click on the zip result in the list
            // The 50 seconds timer seems to be necessary since browserstack take more than 20 seconds to open the combobox
            .waitForElementVisible(`[data-test-id="ZIPCODE` + ZipToBeSearched + `Option"]`,50000)
            .click(`[data-test-id="ZIPCODE` + ZipToBeSearched + `Option"]`)

            // Change from map to list view
            .click('@editPharmacyListIcon')

            // The list show the current pharmacy for a couple of seconds before updating
            .pause(2000)

            // Save the text on the first item in the list to be used later
            .getText('@editPharmacyListedPharmacies1', (result) => {
                PharmacyEntryArray = result.value.split("\n"); // Temporarily used to store an array
            })

        // Select the first item in the list
        this.click('@editPharmacyListedPharmacies1')
            .perform(() => {
                console.log("- Assertions to verify the pharmacy name and address to be saved is the same as the one selected:")

                this.expect.element(`@visitHistoryPanel`).text.to.contain(PharmacyEntryArray[1]);
                this.expect.element(`@visitHistoryPanel`).text.to.contain(PharmacyEntryArray[2]);
            })
        // Save new pharmacy
        this.click('@editPharmacyConfirmationYesButton')
            .waitForElementVisible('@addPrescription')

        this.perform(() => {
            console.log("- Assertions to verify the pharmacy name and address saved is the same as the one selected:")

            this.expect.element(`@savedPharmacyEntry`).text.to.contain(PharmacyEntryArray[1]);
            this.expect.element(`@savedPharmacyEntry`).text.to.contain(PharmacyEntryArray[2]);
        })

        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   Go through all fields in the new medication page and fill them up
    *   Input: Name of the medication, dispense number and number of refills
    */
    addMedication(medicationKeyword, dispense, refills) {
        this.waitForElementVisible('@medicationIcon', 10000)

            // Medication Name
            .setValue('@medicationSearchField', medicationKeyword)
            .waitForElementVisible('@medicationSearchResultOption1')
            .click('@medicationSearchResultOption1')

            // Medication Strength
            .waitForElementVisible('@medicationStrengthCombobox')
            .click('@medicationStrengthCombobox')
            .waitForElementVisible('@medicationStrengthOption1')
            .click('@medicationStrengthOption1')

        // Medication Unit (Will automatically change to a result as soon as strength is selected)
        this.expect.element(`@medicationUnitCombobox`).to.have.value.that.not.equal(" ").before(5000);

        // Medication Frequency
        this.click('@medicationFrequencyCombobox')
            .waitForElementVisible('@medicationFrequencyOption1')
            .click('@medicationFrequencyOption1')

            // Medication Dispense
            .setValue('@medicationDispenseField', dispense)
            // Medication Duration
            .setValue('@medicationDurationField', '2')
            // Medication Refills
            .editTextField('@medicationRefillsField', refills)
            // Medication Patient Directions
            .editTextField('@medicationDirectionsPatientField', 'Patient Directions Test')
            // Medication Pharmacy Directions
            .editTextField('@medicationDirectionsPharmacyField', 'Pharmacy Directions Test')

        return this
    },

    /*
    *   Go through all fields in the new supply page and fill them up
    *   Input: Name of the supply, dispense number and number of refills
    */
    addSupply(supplyKeyword, dispense, refills) {
        this.waitForElementVisible('@supplyIcon', 10000)
            .click('@supplyIcon')

            .waitForElementVisible('@prescriptionAddSaveButton')

            // Supply Name
            .setValue('@supplySearchField', supplyKeyword)

            // Supply Type
            .waitForElementVisible('@supplyTypeCombobox')
            .click('@supplyTypeCombobox')
            .waitForElementVisible('@supplyTypeOption1')
            .click('@supplyTypeOption1')

        this.expect.element(`@supplyTypeComboboxText`).to.have.value.that.not.equal(" ").before(10000);

        // Supply Dispense
        this.setValue('@supplyDispenceField', dispense)

            // Supply Unit
            .waitForElementVisible('@supplyUnitCombobox')
            .click('@supplyUnitCombobox')
            .waitForElementVisible('@supplyUnitOption1')
            .click('@supplyUnitOption1')

        this.expect.element(`@supplyUnitComboboxText`).to.have.value.that.not.equal(" ").before(10000);

        // Supply Duration
        this.setValue('@supplyDurationField', '5')

            // Supply Refill
            .editTextField('@supplyRefillsField', refills)

            // Supply Patient directions
            .setValue('@supplyDirectionsPatientField', 'Automation Patient directions')

            // Supply Pharmacy directions
            .setValue('@supplyDirectionsPharmacyField', 'Automation Pharmacy directions')

            // Confirm Substances checkbox
            .click('@supplyConfirmPrescriptionSubstancesCheckbox')

        return this
    },

    /*
    *   Include a new prescription (medication/supply) and confirm the new entry
    *   Input: The prescription type, name of the prescription, dispense number and number of refills
    */
    addPrescription(PrescriptionType, Keyword, dispense, refills) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent('@eprescribeIcon')
            .click('@eprescribeIcon')
        this.expect.element(`@visitHistoryPanel`).text.to.contain('ePrescribe').before(10000);

        // Wait for the page to load
        this.waitForElementNotPresent('@healthRecordsAnySpinner', 15000)
            .click('@addPrescription')

        // Use the correct fields for either medication or supply entry
        if (PrescriptionType == 'Medication') {
            this.addMedication(Keyword, dispense, refills)
        } else {
            this.addSupply(Keyword, dispense, refills)
        }

        // Save new prescription
        this.click('@prescriptionAddSaveButton')
            .waitForElementVisible('@addPrescription', 15000)

            // Check success message
            .checkToastMessage(PrescriptionType + ' saved successfully!')
            .click('@btnCloseToast')

        this.perform(() => {
            console.log("- Assertions to verify the new prescription added has all the correct information:")

            this.expect.element(`@savedPrescriptionEntry`).text.to.contain(Keyword);
            this.expect.element(`@savedPrescriptionEntry`).text.to.contain("Dispense " + dispense + ", Refill " + refills);
        })

        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   Remove any prescription saved in the list
    *   Input: None
    */
    removePrescriptions() {
        this
            .click('@firstVisitRow')
            .waitForElementPresent('@eprescribeIcon')
            .click('@eprescribeIcon')
        this.expect.element(`@visitHistoryPanel`).text.to.contain('ePrescribe').before(10000);

        // Wait for the page to load
        this.waitForElementNotPresent('@healthRecordsAnySpinner',15000)

        this.api.elements(('@savedPrescriptionEntryEditButton'), result => {
            const numElements = result.value.length;
            // Make sure there is any element in the prescription list to be deleted
            if (numElements > 0) {
                // Iterate through each element in the list, deleting them
                for (i = 1; i <= numElements; i++) {
                    this.click('@savedPrescriptionEntryEditButton')

                        // Click on delete button
                        .waitForElementPresent('@prescriptionEditDeleteButton')
                        .click('@prescriptionEditDeleteButton')

                        // Confirm delete process
                        .waitForElementPresent('@savedPrescriptionEntryEditConfirmationYesButton')
                        .click('@savedPrescriptionEntryEditConfirmationYesButton')

                        // Save delete process
                        .waitForElementVisible('@addPrescription', 10000)

                        // Check success message (without specifying the prescription type)
                        .checkToastMessage('deleted successfully!')
                        .click('@btnCloseToast')
                }
            }
        });
        this.click('@firstVisitRow') // Close panel
        return this
    },

    /*
    *   Open the payment screen and verify the value saved correspond to the expected value
    *   Input: The value that is expected to be saved
    */
    checkPayments(paymentValue) {
        this
            .click('@firstVisitRow')
            .waitForElementPresent['@paymentsIcon']
        this.click('@paymentsIcon')
        this.expect.element(`@visitHistoryPanel`).text.to.contain('Payments').before(10000);

        this.getText('@visitHistoryPanel', (result) => {
            // Save all text in the visit history panel as an array
            visitHistoryPanelArray = result.value.split("\n"); // Temporarily used to store an array
        })
        this.perform(() => {
            console.log("- Assertions to verify Payment value")

            visitdetailsIndex = visitHistoryPanelArray.indexOf('Payments')
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 1], 'Amount charged:')
            this.assert.equal(visitHistoryPanelArray[visitdetailsIndex + 2], paymentValue)
        })
        this.click('@firstVisitRow') // Close panel
        return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}