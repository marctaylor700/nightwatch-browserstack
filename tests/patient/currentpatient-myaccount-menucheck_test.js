var env = "release"

async function goToPracticeLoginPage(browser, handle) {
    console.log("starting goToPracticeLoginPage");
    browser.url(`https://${env}.evisit.com/r/${handle}/auth/LoginPage`);
    //updated link for login page
    //https://release.evisit.com/r/handle/auth/LoginPage
    browser.pause(2000);
  }
  async function patientLogin(browser) {
    console.log("starting patient login")
    browser.useCss()
    //check and set email
    browser.expect.element(`[data-test-id='email']`).to.be.present;
    browser.setValue(`[data-test-id='email']`, "marc+patient@evisit.com")
    //check and set password
    browser.expect.element(`[data-test-id='password']`).to.be.present;
    browser.setValue(`[data-test-id='password']`, "patient123")
    //expect and click login button
    browser.expect.element(`[data-test-id='loginButton']`).to.be.present;
    browser.click(`[data-test-id='loginButton']`)
    // //wait for page to load
    browser.pause(7000)
  }
  //geolocation page
  async function geoLocationPage(browser) {
    console.log("starting geolocation page")
    //check and click confirm checkbox
    browser.expect.element(`[data-test-id='confirmCheckBox']`).to.be.present;
    browser.click(`[data-test-id='confirmCheckBox']`)
    //check and click continue button
    browser.expect.element(`[data-test-id='continue']`).to.be.present;
    browser.click(`[data-test-id='continue']`)
    //pause
    browser.pause(10000)
  }
  //my account drop down
  async function userDropDown(browser) {
      console.log("starting user profile check")
      //expect and click user profile button
      browser.expect.element(`[data-test-id='userProfileButton']`).to.be.present;
      browser.click(`[data-test-id='userProfileButton']`)
      //expect and click my account menu item
      browser.expect.element(`[data-test-id='myAccountMenuItem']`).to.be.present;
      browser.click(`[data-test-id='myAccountMenuItem']`)
      //expect personal info section
      browser.expect.element(`[data-test-id='personalInfoSection']`).to.be.present;
      //expect and click insurance info section
      browser.expect.element(`[data-test-id='insuranceSection']`).to.be.present;
      browser.click(`[data-test-id='insuranceSection']`)
      //expect and click allergies info section
      browser.expect.element(`[data-test-id='allergiesSection']`).to.be.present;
      browser.click(`[data-test-id='allergiesSection']`)
      //expect and click medications info section
      browser.expect.element(`[data-test-id='medicationsSection']`).to.be.present;
      browser.click(`[data-test-id='medicationsSection']`)
      //expect and click conditions info section
      browser.expect.element(`[data-test-id='conditionsSection']`).to.be.present;
      browser.click(`[data-test-id='conditionsSection']`)
      //expect and click procedures info section
      browser.expect.element(`[data-test-id='proceduresSection']`).to.be.present;
      browser.click(`[data-test-id='proceduresSection']`)
      //expect and click family history section
      browser.expect.element(`[data-test-id='familyHistorySection']`).to.be.present;
      browser.click(`[data-test-id='familyHistorySection']`)
      //expect and click pharmacy section
      browser.expect.element(`[data-test-id='pharmacySection']`).to.be.present;
      browser.click(`[data-test-id='pharmacySection']`)
      //expect payment method info section
      browser.expect.element(`[data-test-id='paymentsSection']`).to.be.present;
      browser.click(`[data-test-id='paymentsSection']`)
      //expect and click settings info section
      browser.expect.element(`[data-test-id='settingsSection']`).to.be.present;
      browser.click(`[data-test-id='settingsSection']`)
  }
  // Basically the below stuff runs everything. 
module.exports = {
    before : async function (browser) {
      browser.resizeWindow(1920, 1080);
      '@tags:' ['test']
    },
    'Current Patient - My Account Check' : async function(browser) {
      goToPracticeLoginPage(browser, "ewellness")
        .then(patientLogin(browser))
        .then(geoLocationPage(browser))
        .then(userDropDown(browser))
        .then(browser.end());
    }, 
  };