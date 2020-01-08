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

  async function visitHistoryTab(browser) {
    console.log("starting visit history tab test")
  browser.useCss()
  //visit history tab
  browser.expect.element(`[data-test-id='visitHistoryTab']`).to.be.present;
  //click tab
  browser.click(`[data-test-id='visitHistoryTab']`)
  //wait for visit history tab to load
  browser.pause(5000)
  //click on visit state
  browser.expect.element(`[data-test-id='visitCompletedStatusFilterTestID']`).to.be.present;
  //click on all visit state
  browser.click(`[data-test-id='allCompletedStatusOptionTestID']`)
  //pause
  browser.pause(2000)
  //expect and click date range field
  browser.expect.element(`[data-test-id='visitDateRangeFilterTestID']`).to.be.present;
  browser.click(`[data-test-id='visitDateRangeFilterTestID']`)
  //click last 30 days
  browser.click(`[data-test-id='lastThirtyDays']`)
  // browser.pause(5000)
  }





  // Basically the below stuff runs everything. 
module.exports = {
    before : async function (browser) {
      browser.resizeWindow(1920, 1080);
      '@tags:' ['test']
    },
    'Provider Login - Verify Visit History Tab' : async function(browser) {
      goToPracticeLoginPage(browser, "ewellness")
        .then(providerLogin(browser))
        .then(visitHistoryTab(browser))
        // .then(browser.end());
    }, 
  };