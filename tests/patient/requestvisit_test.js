var env = "alpha"


async function goToPracticeLoginPage(browser, handle) {
    console.log("starting goToPracticeLoginPage");
    browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
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
    // browser.pause(5000)
    // browser.expect.element(`[data-test-id='pharmacyRow0']`).to.be.present;
    // browser.click(`[data-test-id='pharmacyRow0']`)
    // browser.expect.element(`[data-test-id='savePharmacy']`).to.be.present;
    // browser.click(`[data-test-id='savePharmacy']`)
    //cc page
    browser.pause(5000)
    //expect and enter cc number
    // browser.expect.element(`[data-test-id='ccNumber']`).to.be.present;
    // browser.click(`[data-test-id='ccNumber']`)
    // browser.setValue(`[data-test-id='ccNumber']`,"4242424242424242")
    // //expect and enter expiration
    // browser.expect.element(`[data-test-id='expiryDate']`).to.be.present;
    // browser.click(`[data-test-id='expiryDate']`)
    // browser.setValue(`[data-test-id='expiryDate']`, "022020")
    // //expect and set cvc for cc
    // browser.expect.element(`[data-test-id='cvcField']`).to.be.present;
    // browser.click(`[data-test-id='cvcField']`)
    // browser.setValue(`[data-test-id='cvcField']`, "424")
    // //expect and click submit button on cc page
    // browser.expect.element(`[data-test-id='saveCreditCard']`).to.be.present;
    // browser.click(`[data-test-id='saveCreditCard']`)
    // browser.pause(2000)
    //expect and click agreement checkbox
    browser.expect.element(`[data-test-id='agreementCheckbox']`).to.be.present;
    browser.click(`[data-test-id='agreementCheckbox']`)
    //expect and click next button on confirmation page
    browser.expect.element(`[data-test-id='submitNext']`).to.be.present;
    browser.click(`[data-test-id='submitNext']`)
    browser.pause(5000)
    //send esc key (workaround)
    browser.keys([browser.Keys.ESCAPE])
    //expect and click cancel button 
    browser.expect.element(`[data-test-id='cancelRequeueVisit']`).to.be.present;
    browser.click(`[data-test-id='cancelRequeueVisit']`)
    //expect and click yes to cancel visit
    browser.expect.element(`[data-test-id='confirmModalConfirm']`).to.be.present;
    browser.click(`[data-test-id='confirmModalConfirm']`)
    browser.pause(2000)


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