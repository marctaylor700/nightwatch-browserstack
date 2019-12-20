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
    browser.expect.element(`[data-test-id='emailTestID']`).to.be.present;
    //set email
    browser.setValue(`[data-test-id='emailTestID']`, "physician+nick@evisit.com")
    //check for password field
    browser.expect.element(`[data-test-id='passwordTestID']`).to.be.present;
    //set password
    browser.setValue(`[data-test-id='passwordTestID']`, "provider123")
    // //login button
    browser.expect.element(`[data-test-id='loginButtonTestID']`).to.be.present;
    // //click login
    browser.click(`[data-test-id='loginButtonTestID']`)
    // //wait for page to load
    browser.pause(7000)
  }

  async function visitHistoryTab(browser) {
    console.log("starting visit history tab test")
  browser.useCss()
  //visit history tab
  browser.expect.element(`[data-test-id='visitHistoryTabTestID']`).to.be.present;
  //click tab
  browser.click(`[data-test-id='visitHistoryTabTestID']`)
  //wait for visit history tab to load
  browser.pause(5000)
  //click on visit state
  // browser.expect.element(`input[name='completedStatus']`).to.be.present;
  // browser.click(`input[name='completedStatus']`)
  // browser.pause(2000)
  // browser.expect.element(".eVisitAppComponent_0000000000362").to.be.present;
  // //browser.expect.element(`span[class='RAText']`).text.to.equal('All');
  // browser.click(`div[class='raView eVisitAppPopupMenuItem eVisitAppCo`)
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