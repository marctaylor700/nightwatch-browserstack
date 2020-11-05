//variables for the environment
var env = "release";
var d = new Date();

//generate new user credentials and store them
async function generateNewUserCredentials() {
  var rando = Math.floor((Math.random() * 100000000000000) + 1); // random number gen for email
  //console.log(d.getMonth() + "asdadasdasdasd")
  //console.log(d.getDate() + "asdadsasdasd")
  var email = `automation+${d.getMonth()}+${d.getDate()}+${rando}@evisit.com`; // email variable
  //var email = `automation+${rando}@evisit.com`; // email variable

  return { email: email, password: 'Evisit123!' };
}


//Open practice login page 
async function goToPracticeLoginPage(browser, handle) {
  browser.url(`https://${env}.evisit.com/r/${handle}/auth/LoginPage`);
}


//Register a new patient 
async function registerNewPatient(browser, newUserCredentials) {
  browser.useCss()
  browser.waitForElementVisible(`[data-test-id='dontHaveAccount']`)
  //i don't have an account
  browser.expect.element(`[data-test-id='dontHaveAccount']`).to.be.present;
  browser.click(`[data-test-id='dontHaveAccount']`)
  browser.waitForElementVisible(`[data-test-id='email']`)
  //expect, click, and input email
  browser.expect.element(`[data-test-id='email']`).to.be.present;
  browser.click(`[data-test-id='email']`)
  browser.setValue(`[data-test-id='email']`, newUserCredentials.email)
  //expect, click, and input password
  browser.expect.element(`[data-test-id='password']`).to.be.present;
  browser.click(`[data-test-id='password']`)
  browser.setValue(`[data-test-id='password']`, newUserCredentials.password)
  //expect, click, and input password 
  browser.expect.element(`[data-test-id='confirmPassword']`).to.be.present;
  browser.click(`[data-test-id='confirmPassword']`)
  browser.setValue(`[data-test-id='confirmPassword']`, newUserCredentials.password)
  //click on the terms checkbox
  browser.expect.element(`[data-test-id='tos0']`).to.be.present;
  browser.click(`[data-test-id='tos0']`)
  //click on the register button
  browser.expect.element(`[data-test-id='register']`).to.be.present;
  browser.click(`[data-test-id='register']`)
}


//Geolocation page
async function geoLocationPage(browser) {
  browser.waitForElementVisible(`[data-test-id='userProfileButton']`, 10000)
  browser.element('css selector', '[data-test-id=confirmCheckBox]', function (result) {
    //validation to confirm geolocation is required during test execution
    if (result.status != -1) {
      browser.expect.element(`[data-test-id=confirmCheckBox]`).to.be.present;
      //select a state
      browser.click('[data-test-id="stateSelect"]')
      browser.pause(500)
      browser.click('[data-test-id="FloridaOption"]')
      //click confirm checkbox
      browser.click(`[data-test-id='confirmCheckBox']`)
      browser.pause(500)
      //check and click continue button
      browser.expect.element(`[data-test-id='continue']`).to.be.present;
      browser.click(`[data-test-id='continue']`)
      browser.pause(1000)
      //pause
    } else {
      console.log("Skipping Geolocation Page")
      browser.pause(1000)
    }
  });
}


//Start the enrollment task
async function enrollNewPatient(browser, generateName) {
  browser.useCss()
  browser.waitForElementVisible(`[data-test-id='firstName']`)
  browser.pause(500)
  //click first name field
  browser.expect.element(`[data-test-id='firstName']`).to.be.present;
  browser.click(`[data-test-id='firstName']`)
  //input first name
  browser.setValue(`[data-test-id='firstName']`, "AutomationMarc")
  //Click last name field
  browser.expect.element(`[data-test-id='lastName']`).to.be.present;
  browser.click(`[data-test-id='lastName']`)
  //input last name
  browser.setValue(`[data-test-id='lastName']`, "Taylor")
  //click address field
  browser.expect.element(`[data-test-id='addressLine1']`).to.be.present;
  browser.click(`[data-test-id='addressLine1']`)
  //input address
  browser.setValue(`[data-test-id='addressLine1']`, "aaaaautomation1750 E Carson Rd")
  //click city
  browser.expect.element(`[data-test-id='city']`).to.be.present;
  browser.click(`[data-test-id='city']`)
  //set city
  browser.setValue(`[data-test-id='city']`, "Phoenix")
  //state (wait for Ryan's update)
  browser.expect.element(`[data-test-id='state']`).to.be.present;
  browser.click(`[data-test-id='state']`)
  browser.waitForElementVisible(`[data-test-id='AlaskaOption']`)
  //click Alaska
  browser.expect.element(`[data-test-id='AlaskaOption']`).to.be.present;
  browser.click(`[data-test-id='AlaskaOption']`)
  //click zip code
  browser.expect.element(`[data-test-id='zipCode']`).to.be.present;
  browser.click(`[data-test-id='zipCode']`)
  //set zip code
  browser.setValue(`[data-test-id='zipCode']`, "85042")
  //click mobile phone
  browser.expect.element(`[data-test-id='phoneCell']`).to.be.present;
  browser.click(`[data-test-id='phoneCell']`)
  //set cell phone number
  browser.setValue(`[data-test-id='phoneCell']`, "4802891576")
  //click date of birth
  browser.expect.element(`[data-test-id='dob']`).to.be.present;
  browser.click(`[data-test-id='dob']`)
  //set date of birth 
  browser.setValue(`[data-test-id='dob']`, "02141988")
  //sex field (wait for Ryan's update)
  browser.expect.element(`[data-test-id='gender']`).to.be.present;
  browser.click(`[data-test-id='gender']`)
  browser.waitForElementVisible(`[data-test-id='maleOption']`)
  browser.expect.element(`[data-test-id='maleOption']`).to.be.present;
  browser.click(`[data-test-id='maleOption']`)
  browser.waitForElementVisible(`[data-test-id='continue']`)
  //family account check box (leaving commented until we need to enable it)
  // browser.expect.element(`[data-test-id='familyAccountCheckBox']`).to.be.present;
  // browser.click(`[data-test-id='dob']`)
  //continue button
  browser.expect.element(`[data-test-id='continue']`).to.be.present;
  browser.click(`[data-test-id='continue']`)
}


// //Start practice orgs selection screen. (leave disabled unless practice orgs is enabled)
// async function practiceSelection(browser) {
//   console.log("starting practice selection screen")
//   browser.expect.element(`[data-test-id='skipForNow']`).to.be.present;
//   browser.click(`[data-test-id='skipForNow']`)
//   browser.pause(5000)
// }


//Start the profile picture task
async function profilePicture(browser) {
  browser.waitForElementVisible(`[data-test-id='skip']`)
  browser.expect.element(`[data-test-id='skip']`).to.be.present;
  browser.click(`[data-test-id='skip']`)
}


//Start the dependent page task
async function dependentPage(browser) {
  browser.waitForElementVisible(`[data-test-id='no']`)
  browser.expect.element(`[data-test-id='no']`).to.be.present;
  browser.click(`[data-test-id='no']`)
}


//Start the insurance page task 
async function insurancePage(browser) {
  browser.waitForElementVisible(`[data-test-id='no']`)
  browser.expect.element(`[data-test-id='no']`).to.be.present;
  browser.click(`[data-test-id='no']`)
}


//Start the welcome page task 
async function welcomePage(browser) {
  browser.waitForElementVisible(`[data-test-id='continue']`)
  browser.expect.element(`[data-test-id='continue']`).to.be.present;
  browser.click(`[data-test-id='continue']`)
}


//Select the main patient
//In order to use dependent, the index is the only thing that requires change
async function selectPatient(browser) {
  browser.waitForElementVisible(`[data-test-id='rowClick'] .eVisitAppButton div`)
  browser.expect.element(`[data-test-id='rowClick'] .eVisitAppButton div`).to.be.present;
  browser.click(`[data-test-id='rowClick'] .eVisitAppButton div`)
}


//Select the first visit type
async function selectVisitType(browser) {
  browser.waitForElementVisible(`[data-test-id='selectVisitTypeRow0']`)
  browser.expect.element(`[data-test-id='selectVisitTypeRow0']`).to.be.present;
  browser.click(`[data-test-id='selectVisitTypeRow0']`)
}


//Select the provider
//it will select the first provider in the list
async function selectProvider(browser) {
  browser.waitForElementVisible(`[data-test-id='seeNow0']`)
  browser.expect.element(`[data-test-id="seeNow0"]`).to.be.present;
  browser.click(`[data-test-id="seeNow0"]`)
}


//Fill in visit details and confirm visit
async function setVisitDetails(browser) {
  browser.waitForElementVisible(`[data-test-id='question1']`)
  browser.pause(500)
  browser.expect.element(`[data-test-id='question1']`).to.be.present;
  browser.click(`[data-test-id='question1']`)
  browser.setValue(`[data-test-id='question1']`, "REASON")

  browser.expect.element(`[data-test-id='question2']`).to.be.present;
  browser.click(`[data-test-id='question2']`)
  browser.setValue(`[data-test-id='question2']`, "ILLNESS")

  browser.expect.element(`[data-test-id='visitDetailsNext']`).to.be.present;
  browser.click(`[data-test-id='visitDetailsNext']`)
}


//HEALTH RECORDS questions
//Allergies
//MedicationAllergies
//MedicalConditions
//FamilyHistory
//Medications
//Procedures
//MiscQuestionsPage
async function HealthRecords(browser, includeHealthRecords) {

  if (includeHealthRecords == true) {
    
    //sceneContainer/Page/requestVisit/AllergiesQuestionPage

    //Verify question interface
    browser.waitForElementVisible(`[data-test-id='yes']`)
    browser.expect.element(`[data-test-id*='/GeneralAllergiesQuestionPage']`).to.be.present;
    browser.expect.element(`[data-test-id='yes']`).to.be.present;
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.expect.element('.eVisitAppPageHeader').text.to.contain('Do you have any known allergies?')
    browser.click(`[data-test-id='yes']`)

    //Verify allergy empty page
    browser.waitForElementVisible(`[data-test-id="editMedicalRecord"]`,10000)
    browser.click(`[data-test-id="editMedicalRecord"]`)
    browser.waitForElementVisible(`[data-test-id="listInput"]`)
    browser.expect.element('[data-field=please_list_any_known_allergies]').text.to.contain('Please list any known allergies')
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppList').text.to.contain('No known allergies')

    //Add 1st default option
    browser.click(`[data-test-id='toggleSuggestions']`) //show
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Hide list')
    browser.click(`[data-test-id='seasonalAdd']`)
    browser.click(`[data-test-id='toggleSuggestions']`) //hide back

    //Add custom entry with text "Allergy - Automation"
    browser.setValue('[data-test-id="listInput"]', "Allergy - Automation")
    browser.click('.eVisitAppTextFieldIcon')

    //Add custom entry with text "Allergy - Automation With Enter"
    browser.setValue('[data-test-id="listInput"]', "Allergy - Automation With Enter")
    browser.keys(browser.Keys.ENTER)
    browser.keys(browser.Keys.NULL) //release key pressed

    //Final asserts
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppListItem:nth-child(2)').text.to.contain('Allergy - Automation With Enter')
    browser.expect.element('.eVisitAppListItem:nth-child(4)').text.to.contain('Allergy - Automation')
    browser.expect.element('.eVisitAppListItem:nth-child(6)').text.to.contain('Seasonal')

    //Confirm
    browser.click('[data-test-id="saveChanges"]')


    // sceneContainer/Page/requestVisit/MedicationAllergiesQuestionPage

    //Verify question interface
    browser.waitForElementVisible(`[data-test-id='yes']`)
    browser.expect.element(`[data-test-id*='/MedicationAllergiesQuestionPage']`).to.be.present;
    browser.expect.element(`[data-test-id='yes']`).to.be.present;
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.expect.element('.eVisitAppPageHeader').text.to.contain('Do you have any medication allergies?')
    browser.click(`[data-test-id='yes']`)

    //Verify medication allergy empty page
    browser.waitForElementVisible(`[data-test-id="editMedicalRecord"]`,10000)
    browser.click(`[data-test-id="editMedicalRecord"]`)
    browser.waitForElementVisible(`[data-test-id="listInput"]`)
    browser.expect.element('[data-field=please_list_any_known_medication_allergies]').text.to.contain('Please list any known medication allergies')
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppList').text.to.contain('No known medication allergies')

    //Add 1st default option
    browser.click(`[data-test-id='toggleSuggestions']`) //show
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Hide list')
    browser.click(`[data-test-id='amoxicillinAdd']`)
    browser.click(`[data-test-id='toggleSuggestions']`) //hide back

    //Add custom entry with text "Medication Allergy - Automation"
    browser.setValue('[data-test-id="listInput"]', "Medication Allergy - Automation")
    browser.click('.eVisitAppTextFieldIcon')

    //Add custom entry with text "Medication Allergy - Automation With Enter"
    browser.setValue('[data-test-id="listInput"]', "Medication Allergy - Automation With Enter")
    browser.keys(browser.Keys.ENTER)
    browser.keys(browser.Keys.NULL) //release key pressed

    //Final asserts
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppListItem:nth-child(2)').text.to.contain('Medication Allergy - Automation With Enter')
    browser.expect.element('.eVisitAppListItem:nth-child(4)').text.to.contain('Medication Allergy - Automation')
    browser.expect.element('.eVisitAppListItem:nth-child(6)').text.to.contain('Amoxicillin')

    //Confirm
    browser.click('[data-test-id="saveChanges"]')


    // sceneContainer/Page/requestVisit/MedicalConditionsQuestionPage

    //Verify question interface
    browser.waitForElementVisible(`[data-test-id='yes']`)
    browser.expect.element(`[data-test-id*='/MedicalConditionsQuestionPage']`).to.be.present;
    browser.expect.element(`[data-test-id='yes']`).to.be.present;
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.expect.element('.eVisitAppPageHeader').text.to.contain('Have you been diagnosed with any medical conditions we should be aware of (i.e. diabetes, arthritis, etc...)?')
    browser.click(`[data-test-id='yes']`)

    //Verify medical condition empty page
    browser.waitForElementVisible(`[data-test-id="editMedicalRecord"]`,10000)
    browser.click(`[data-test-id="editMedicalRecord"]`)
    browser.waitForElementVisible(`[data-test-id="listInput"]`)
    browser.expect.element('[data-field=please_list_any_known_medical_conditions]').text.to.contain('Please list any known medical conditions')
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppList').text.to.contain('No known medical conditions')

    //Add 1st default option
    browser.click(`[data-test-id='toggleSuggestions']`) //show
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Hide list')
    browser.click(`[data-test-id='acidundefinedefluxAdd']`)
    browser.click(`[data-test-id='toggleSuggestions']`) //hide back

    //Add custom entry with text "Medical Condition - Automation"
    browser.setValue('[data-test-id="listInput"]', "Medical Condition - Automation")
    browser.click('.eVisitAppTextFieldIcon')

    //Add custom entry with text "Medical Condition - Automation With Enter"
    browser.setValue('[data-test-id="listInput"]', "Medical Condition - Automation With Enter")
    browser.keys(browser.Keys.ENTER)
    browser.keys(browser.Keys.NULL) //release key pressed

    //Final asserts
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppListItem:nth-child(2)').text.to.contain('Medical Condition - Automation With Enter')
    browser.expect.element('.eVisitAppListItem:nth-child(4)').text.to.contain('Medical Condition - Automation')
    browser.expect.element('.eVisitAppListItem:nth-child(6)').text.to.contain('Acid Reflux')

    //Confirm
    browser.click('[data-test-id="saveChanges"]')


    // data-test-id="sceneContainer/Page/requestVisit/FamilyHistoryQuestionPage"

    //Verify question interface
    browser.waitForElementVisible(`[data-test-id='yes']`)
    browser.expect.element(`[data-test-id*='/FamilyHistoryQuestionPage']`).to.be.present;
    browser.expect.element(`[data-test-id='yes']`).to.be.present;
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.expect.element('.eVisitAppPageHeader').text.to.contain('Does someone in your family have a medical condition we should be aware of?')
    browser.click(`[data-test-id='yes']`)

    //Verify family history empty page
    browser.waitForElementVisible(`[data-test-id="editMedicalRecord"]`,10000)
    browser.click(`[data-test-id="editMedicalRecord"]`)
    browser.waitForElementVisible(`[data-test-id="listInput"]`)
    browser.expect.element('[data-field=please_list_any_known_family_history]').text.to.contain('Please list any known family history')
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppList').text.to.contain('No known family history')

    //Add 1st default option
    browser.click(`[data-test-id='toggleSuggestions']`) //show
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Hide list')
    browser.click(`[data-test-id='MedicalProceduresAdd']`)
    browser.click(`[data-test-id='toggleSuggestions']`) //hide back

    //Add custom entry with text "Family History - Automation"
    browser.setValue('[data-test-id="listInput"]', "Family History - Automation")
    browser.click('.eVisitAppTextFieldIcon')

    //Add custom entry with text "Family History - Automation With Enter"
    browser.setValue('[data-test-id="listInput"]', "Family History - Automation With Enter")
    browser.keys(browser.Keys.ENTER)
    browser.keys(browser.Keys.NULL) //release key pressed

    //Final asserts
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppListItem:nth-child(2)').text.to.contain('Family History - Automation With Enter')
    browser.expect.element('.eVisitAppListItem:nth-child(4)').text.to.contain('Family History - Automation')
    browser.expect.element('.eVisitAppListItem:nth-child(6)').text.to.contain('Medical Procedures')

    //Confirm
    browser.click('[data-test-id="saveChanges"]')


    // sceneContainer/Page/requestVisit/MedicationsQuestionPage

    //Verify question interface
    browser.waitForElementVisible(`[data-test-id='yes']`)
    browser.expect.element(`[data-test-id*='/MedicationsQuestionPage']`).to.be.present;
    browser.expect.element(`[data-test-id='yes']`).to.be.present;
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.expect.element('.eVisitAppPageHeader').text.to.contain('Do you take any medications?')
    browser.click(`[data-test-id='yes']`)

    //Verify medications empty page
    browser.waitForElementVisible(`[data-test-id="editMedicalRecord"]`,10000)
    browser.click(`[data-test-id="editMedicalRecord"]`)
    browser.waitForElementVisible(`[data-test-id="listInput"]`)
    browser.expect.element('[data-field=please_list_any_known_medications]').text.to.contain('Please list any known medications')
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppList').text.to.contain('No known medications')

    //Add 1st default option
    browser.click(`[data-test-id='toggleSuggestions']`) //show
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Hide list')
    browser.click(`[data-test-id='amoxicillinAdd']`)
    browser.click(`[data-test-id='toggleSuggestions']`) //hide back

    //Add custom entry with text "Medication - Automation"
    browser.setValue('[data-test-id="listInput"]', "Medication - Automation")
    browser.click('.eVisitAppTextFieldIcon')

    //Add custom entry with text "Medication - Automation With Enter"
    browser.setValue('[data-test-id="listInput"]', "Medication - Automation With Enter")
    browser.keys(browser.Keys.ENTER)
    browser.keys(browser.Keys.NULL) //release key pressed

    //Final asserts
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppListItem:nth-child(2)').text.to.contain('Medication - Automation With Enter')
    browser.expect.element('.eVisitAppListItem:nth-child(4)').text.to.contain('Medication - Automation')
    browser.expect.element('.eVisitAppListItem:nth-child(6)').text.to.contain('Amoxicillin')

    //Confirm
    browser.click('[data-test-id="saveChanges"]')


    // sceneContainer/Page/requestVisit/ProceduresQuestionPage

    //Verify question interface
    browser.waitForElementVisible(`[data-test-id='yes']`)
    browser.expect.element(`[data-test-id*='/ProceduresQuestionPage']`).to.be.present;
    browser.expect.element(`[data-test-id='yes']`).to.be.present;
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.expect.element('.eVisitAppPageHeader').text.to.contain('Have you had any recent medical procedures?')
    browser.click(`[data-test-id='yes']`)

    //Verify procedures empty page
    browser.waitForElementVisible(`[data-test-id="editMedicalRecord"]`,10000)
    browser.click(`[data-test-id="editMedicalRecord"]`)
    browser.waitForElementVisible(`[data-test-id="listInput"]`)
    browser.expect.element('[data-field=please_list_any_known_procedures]').text.to.contain('Please list any known procedures')
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppList').text.to.contain('No known procedures')

    //Add 1st default option
    browser.click(`[data-test-id='toggleSuggestions']`) //show
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Hide list')
    browser.click(`[data-test-id='angioplastyAdd']`)
    browser.click(`[data-test-id='toggleSuggestions']`) //hide back

    //Add custom entry with text "Procedures - Automation"
    browser.setValue('[data-test-id="listInput"]', "Procedures - Automation")
    browser.click('.eVisitAppTextFieldIcon')

    //Add custom entry with text "Procedures - Automation With Enter"
    browser.setValue('[data-test-id="listInput"]', "Procedures - Automation With Enter")
    browser.keys(browser.Keys.ENTER)
    browser.keys(browser.Keys.NULL) //release key pressed

    //Final asserts
    browser.expect.element(`[data-test-id='toggleSuggestions']`).text.to.contain('Show list')
    browser.expect.element('.eVisitAppListItem:nth-child(2)').text.to.contain('Procedures - Automation With Enter')
    browser.expect.element('.eVisitAppListItem:nth-child(4)').text.to.contain('Procedures - Automation')
    browser.expect.element('.eVisitAppListItem:nth-child(6)').text.to.contain('Angioplasty')

    //Confirm
    browser.click('[data-test-id="saveChanges"]')


    // sceneContainer/Page/requestVisit/MiscQuestionsPage
    browser.waitForElementVisible(`[data-test-id='question1No']`)

    //Try to confirm without any info
    browser.click(`[data-test-id='next']`)
    browser.waitForElementVisible(`[data-test-id='toast']`)
    browser.expect.element(`[data-test-id='toast']`).text.to.contain('There is more than one field that is required.')
    browser.click(`[data-test-id='buttonCloseToast']`)
    
    //Answer questions correctly
    browser.expect.element('.eVisitAppFormFieldWrapper:nth-child(1) .eVisitAppDynamicFieldListExternalCaptionContainer').text.to.contain('Do you smoke tobacco?')
    browser.expect.element(`[data-test-id='question1No']`).to.be.present;
    browser.expect.element(`[data-test-id='question1Yes']`).to.be.present;
    browser.click(`[data-test-id='question1Yes']`)
    browser.expect.element('.eVisitAppFormFieldWrapper:nth-child(2) .eVisitAppDynamicFieldListExternalCaptionContainer').text.to.contain('Do you drink alcohol?')
    browser.expect.element(`[data-test-id='question2No']`).to.be.present;
    browser.expect.element(`[data-test-id='question2Yes']`).to.be.present;
    browser.click(`[data-test-id='question2Yes']`)
    browser.expect.element(`[data-test-id='next']`).to.be.present;
    browser.expect.element(`[data-test-id='back']`).to.be.present;
    browser.click(`[data-test-id='next']`)

  }
  else {
    //allergies
    browser.waitForElementVisible(`[data-test-id*='/GeneralAllergiesQuestionPage']`)
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.pause(800)
    browser.click(`[data-test-id='no']`)
    //medication allergies page
    browser.waitForElementVisible(`[data-test-id*='/MedicationAllergiesQuestionPage']`)
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.pause(800)
    browser.click(`[data-test-id='no']`)
    //medical conditions page
    browser.waitForElementVisible(`[data-test-id*='/MedicalConditionsQuestionPage']`)
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.pause(800)
    browser.click(`[data-test-id='no']`)
    //family medical history
    browser.waitForElementVisible(`[data-test-id*='/FamilyHistoryQuestionPage']`)
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.pause(800)
    browser.click(`[data-test-id='no']`)
    //medications page
    browser.waitForElementVisible(`[data-test-id*='/MedicationsQuestionPage']`)
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.pause(800)
    browser.click(`[data-test-id='no']`)
    //medical procedures page
    browser.waitForElementVisible(`[data-test-id*='/ProceduresQuestionPage']`)
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.pause(800)
    browser.click(`[data-test-id='no']`)
    //smoking alcohol page TODO (WAITING ON RYANS UPDATES)
    browser.waitForElementVisible(`[data-test-id*='/MiscQuestionsPage']`)
    browser.pause(800)
    browser.expect.element(`[data-test-id='question1No']`).to.be.present;
    browser.click(`[data-test-id='question1No']`)
    browser.expect.element(`[data-test-id='question2No']`).to.be.present;
    browser.click(`[data-test-id='question2No']`)
    //click next on smoking alcohol page
    browser.expect.element(`[data-test-id='next']`).to.be.present;
    browser.click(`[data-test-id='next']`)
  }
}


//Select a pharmacy from the list
async function setPharmacy(browser) {
  browser.waitForElementVisible(`[data-test-id='pharmacyRow0']`)
  browser.expect.element(`[data-test-id='pharmacyRow0']`).to.be.present;
  browser.click(`[data-test-id='pharmacyRow0']`)
  browser.waitForElementVisible(`[data-test-id='savePharmacy']`)
  browser.expect.element(`[data-test-id='savePharmacy']`).to.be.present;
  browser.click(`[data-test-id='savePharmacy']`)
}


//Include a new credit card for the account
async function setCreditCard(browser) {
  browser.waitForElementVisible(`[data-test-id='ccNumber']`)
  browser.expect.element(`[data-test-id='ccNumber']`).to.be.present;
  browser.click(`[data-test-id='ccNumber']`)
  browser.pause(200)
  browser.setValue(`[data-test-id='ccNumber']`, "4111111111111111")
  browser.expect.element(`[data-test-id='expiryDate']`).to.be.present;
  browser.click(`[data-test-id='expiryDate']`)
  browser.setValue(`[data-test-id='expiryDate']`, "022024")
  browser.expect.element(`[data-test-id='expiryDate']`).to.be.present;
  browser.click(`[data-test-id='expiryDate']`)
  browser.setValue(`[data-test-id='expiryDate']`, "424")
  browser.expect.element(`[data-test-id='cvcField']`).to.be.present;
  browser.click(`[data-test-id='cvcField']`)
  browser.setValue(`[data-test-id='cvcField']`, "424")
  browser.expect.element(`[data-test-id='saveCreditCard']`).to.be.present;
  browser.click(`[data-test-id='saveCreditCard']`)
}


//Confirm visit and close notification modal
async function ConfirmVisit(browser) {
  //expect and click agreement checkbox
  browser.waitForElementVisible(`[data-test-id='agreementCheckbox']`)
  browser.pause(800)
  browser.expect.element(`[data-test-id='agreementCheckbox']`).to.be.present;
  browser.click(`[data-test-id='agreementCheckbox']`)
  //expect and click next button on confirmation page
  browser.expect.element(`[data-test-id='visitSubmit']`).to.be.present;
  browser.click(`[data-test-id='visitSubmit']`)
  browser.pause(5000)
  //send esc key to close notification modal
  browser.keys([browser.Keys.ESCAPE])
  // browser.pause(2000)
  //close notification modal
  // browser.expect.element(`[data-test-id='visitNotificationPreferencesModalConfirm']`).to.be.present;
  // browser.click(`[data-test-id='visitNotificationPreferencesModalConfirm']`)
}


//Close the visit as soon as it starts
async function CloseVisit(browser) {
  //expect and click cancel button
  browser.expect.element(`[data-test-id='cancelRequeueVisit']`).to.be.present;
  browser.click(`[data-test-id='cancelRequeueVisit']`)
  //expect and click yes to cancel visit
  browser.expect.element(`[data-test-id='confirmModalConfirm']`).to.be.present;
  browser.click(`[data-test-id='confirmModalConfirm']`)
  browser.expect.element('.eVisitAppField .raTouchable .RAView').to.be.present;
  browser.click('.eVisitAppField .raTouchable .RAView')
  browser.expect.element(`[data-test-id='visitCancelReasonModalSubmit']`).to.be.present;
  browser.click(`[data-test-id='visitCancelReasonModalSubmit']`)
  browser.pause(2000)
}


//request visit
async function requestVisit(browser, includeHealthRecords) {

  //select the main patient
  selectPatient(browser)

  //Select a visit type
  //selectVisitType(browser) - NOT NECESSARY FOR RELEASE/OMEGA

  //select the provider
  selectProvider(browser)

  //Visit Details
  setVisitDetails(browser)

  //HEALTH RECORDS questions
  HealthRecords(browser, includeHealthRecords)

  //Select a pharmacy from the list
  setPharmacy(browser)

  //Include a new credit card for the account
  setCreditCard(browser)

  //Confirm visit and close notification modal
  ConfirmVisit(browser)

  //Close visit
  CloseVisit(browser)

  //assert the correct page was opened after closing the visit
  browser.assert.urlEquals('https://release.evisit.com/r/omega/requestVisit/ChoosePatientPage');

}



module.exports = {
  before: async function (browser) {
    browser.resizeWindow(1920, 1080);
  },

  '@tags': ['test'],
  'Enroll a new patient with health records entries': async function (browser) {
    var newUserCredentials = await generateNewUserCredentials();

    //false: All health records questions will be answered with NO
    //true: All health records questions will have responses inside
    var includeHealthRecords = true;

    //print out the user credentials 
    //console.log(JSON.stringify(newUserCredentials));

    //these run everything
    goToPracticeLoginPage(browser, "omega")
      .then(registerNewPatient(browser, newUserCredentials))
      .then(geoLocationPage(browser))
      .then(enrollNewPatient(browser))
      //.then(practiceSelection(browser))
      .then(profilePicture(browser))
      //.then(dependentPage(browser))
      .then(insurancePage(browser))
      .then(welcomePage(browser))
      .then(requestVisit(browser, includeHealthRecords))
      .then(browser.end());


  },
};


