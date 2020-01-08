var env = "alpha"


async function goToPracticeLoginPage(browser, handle) {
    console.log("starting goToPracticeLoginPage");
    browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
    browser.pause(2000);
  }

  async function patientLogin(browser) {
    console.log("starting provider login")
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
    browser.pause(6000)
  }

    //request visit
  async function requestVisit(browser) {
    console.log("starting request visit")
    //expect See Now on Nick Provider
    browser.useCss()
    browser.expect.element(`[data-test-id='seeNow2']`).to.be.present;
    browser.click(`[data-test-id='seeNow2']`)
    browser.pause(6000)
    //short reason for request
    browser.expect.element(`[data-test-id='question0']`).to.be.present;
    browser.click(`[data-test-id='question0']`)
    browser.setValue(`[data-test-id='question0']`, "test")
    //description of illness
    browser.expect.element(`[data-test-id='question1']`).to.be.present;
    browser.click(`[data-test-id='question1']`)
    browser.setValue(`[data-test-id='question1']`, "test")
    //next button
    browser.expect.element(`[data-test-id='submitNext']`).to.be.present;
    browser.click(`[data-test-id='submitNext']`)
    //pharmacy
    browser.pause(5000)
    browser.expect.element(`[data-test-id='pharmacyRow0']`).to.be.present;
    browser.click(`[data-test-id='pharmacyRow0']`)
    browser.expect.element(`[data-test-id='savePharmacy']`).to.be.present;
    browser.click(`[data-test-id='savePharmacy']`)
    //cc page
    browser.pause(5000)
    browser.useXpath()
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[2]/div/div[2]/div/div[1]/input").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[2]/div/div[2]/div/div[1]/input")
    browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[2]/div/div[2]/div/div[1]/input","4242424242424242")
    browser.useCss()
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[2]/div/div[3]/div/div[1]/input").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[2]/div/div[3]/div/div[1]/input")
    browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[2]/div/div[3]/div/div[1]/input", "022020")
    browser.expect.element("div.eVisitAppComponent_0000000007209:nth-child(2) > input:nth-child(1)").to.be.present;
    browser.click("div.eVisitAppComponent_0000000007209:nth-child(2) > input:nth-child(1)")
    browser.setValue("div.eVisitAppComponent_0000000007209:nth-child(2) > input:nth-child(1)", "424")


  }

  // Basically the below stuff runs everything. 
module.exports = {
    before : async function (browser) {
      browser.resizeWindow(1920, 1080);
      '@tags:' ['test']
    },
    'Visit request by current patient' : async function(browser) {
      goToPracticeLoginPage(browser, "ewellness")
        .then(patientLogin(browser))
        .then(geoLocationPage(browser))
        .then(requestVisit(browser))
        .then(browser.end());
    }, 
  };