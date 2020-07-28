var env = "staging";

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/${handle}/auth/LoginPage`);
  browser.pause(2000);
}
async function providerLogin(browser) {
  console.log("starting provider login")
  browser.useCss()
  //check for email field
  browser.expect.element(`[data-test-id='email']`).to.be.present;
  //set email
  browser.setValue(`[data-test-id='email']`, "taylor+provider@evisit.com")
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
async function profileCheck(browser) {
    console.log("starting provider profile check")
    //expect and click user profile button
    browser.expect.element(`[data-test-id='userProfileButton']`).to.be.present;
    browser.click(`[data-test-id='userProfileButton']`)
    //expect and click my account menu item
    browser.expect.element(`[data-test-id='myAccountMenuItem']`).to.be.present;
    browser.click(`[data-test-id='myAccountMenuItem']`)
    //expect and click my bio section
    browser.expect.element(`[data-test-id='myBioSection']`).to.be.present;
    browser.click(`[data-test-id='myBioSection']`)
    //expect and click practice section
    //browser.expect.element(`[data-test-id='practiceSection']`).to.be.present;
    //browser.click(`[data-test-id='practiceSection']`)
    //expect and click availability secion
    browser.expect.element(`[data-test-id='availabilitySection']`).to.be.present;
    browser.click(`[data-test-id='availabilitySection']`)
    //expect and click notifications section
    browser.expect.element(`[data-test-id='notificationsSection']`).to.be.present;
    browser.click(`[data-test-id='notificationsSection']`)
    //expect and click reports section
    //browser.expect.element(`[data-test-id='reportsSection']`).to.be.present;
    //browser.click(`[data-test-id='reportsSection']`)
    //expect and click settings section
    browser.expect.element(`[data-test-id='settingsSection']`).to.be.present;
    browser.click(`[data-test-id='settingsSection']`)
}
// Basically the below stuff runs everything. 
module.exports = {
  before : async function (browser) {
    browser.resizeWindow(1920, 1080);
    '@tags:' ['test']
  },
  'Provider Login - Profile Check' : async function(browser) {
    goToPracticeLoginPage(browser, "omega")
      .then(providerLogin(browser))
      .then(profileCheck(browser))
      .then(browser.end());
  }, 
};
