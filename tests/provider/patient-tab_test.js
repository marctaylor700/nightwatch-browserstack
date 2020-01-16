var env = "alpha";
var email; 

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(2000);
}
async function providerLogin(browser) {
    console.log("starting provider login")
    browser.useCss()
    //check for email field
    browser.expect.element(`[data-test-id='email']`).to.be.present;
    //set email
    browser.setValue(`[data-test-id='email']`, "physician+nick@evisit.com")
    //check for password field
    browser.expect.element(`[data-test-id='password']`).to.be.present;
    //set password
    browser.setValue(`[data-test-id='password']`, "provider123")
    // //login button
    browser.expect.element(`[data-test-id='loginButton']`).to.be.present;
    // //click login
    browser.click(`[data-test-id='loginButton']`)
    // //wait for page to load
    browser.pause(7000)
  }
  async function patientTab(browser) {
    console.log("starting patient tab test")
    //expect and click patients tab
    browser.expect.element(`[data-test-id='patientsTab']`).to.be.present;
    browser.click(`[data-test-id='patientsTab']`)
    browser.pause(2000)
    //expect and click first patient row
    browser.expect.element(`[data-test-id='rowClick0']`).to.be.present;
    browser.click(`[data-test-id='rowClick0']`)
    //expect and click personal info
    browser.expect.element(`[data-test-id='personalInfo']`).to.be.present;
    browser.click(`[data-test-id='personalInfo']`)
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click insurance tab
    browser.expect.element(`[data-test-id='insurance']`).to.be.present;
    browser.click(`[data-test-id='insurance']`)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click health records tab
    browser.expect.element(`[data-test-id='healthRecords']`).to.be.present;
    browser.click(`[data-test-id='healthRecords']`)
    browser.pause(2000)
    //expect and click general allergies
    browser.expect.element(`[data-test-id='allergiesGeneral']`).to.be.present;
    browser.click(`[data-test-id='allergiesGeneral']`) 
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click medication allergies
    browser.expect.element(`[data-test-id='allergiesMedications']`).to.be.present;
    browser.click(`[data-test-id='allergiesMedications']`)
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click medications
    browser.expect.element(`[data-test-id='medications']`).to.be.present;
    browser.click(`[data-test-id='medications']`)
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click conditions
    browser.expect.element(`[data-test-id='conditions']`).to.be.present;
    browser.click(`[data-test-id='conditions']`)
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click procedures
    browser.expect.element(`[data-test-id='procedures']`).to.be.present;
    browser.click(`[data-test-id='procedures']`)
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click family history
    browser.expect.element(`[data-test-id='familyHistory']`).to.be.present;
    browser.click(`[data-test-id='familyHistory']`)
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click questionnaire
    browser.expect.element(`[data-test-id='questionnaire']`).to.be.present;
    browser.click(`[data-test-id='questionnaire']`)
    browser.pause(2000)
    //expect and click back button
    browser.expect.element(`[data-test-id='panelBack']`).to.be.present;
    browser.click(`[data-test-id='panelBack']`)
    //expect and click first patient row
    browser.expect.element(`[data-test-id='rowClick0']`).to.be.present;
    browser.click(`[data-test-id='rowClick0']`)
    //click my account 
    browser.click(`[data-test-id='userProfileButton']`)
    //click logout
    browser.click(`[data-test-id='logoutMenuItem']`)
    //confirm logout
    browser.click(`[data-test-id='confirmModalConfirm']`)
    //pause
    browser.pause(5000)
  }
  // Basically the below stuff runs everything. 
module.exports = {
    before : async function (browser) {
      browser.resizeWindow(1920, 1080);
      '@tags:' ['test'] 
    },
    'Provider Login - Patient Tab Test' : async function(browser) {
      goToPracticeLoginPage(browser, "ewellness")
        .then(providerLogin(browser))
        .then(patientTab(browser))
        .then(browser.end());
    }, 
  };