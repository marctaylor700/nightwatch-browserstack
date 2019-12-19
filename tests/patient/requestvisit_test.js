var env = "alpha"


async function goToPracticeLoginPage(browser, handle) {
    console.log("starting goToPracticeLoginPage");
    browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
    browser.pause(2000);
  }

  async function patientLogin(browser) {
    console.log("starting provider login")
    browser.useCss()
    //check for email field
    browser.expect.element(`[data-field='email']`).to.be.present;
    //set email
    browser.setValue(`[data-field='email'] input`, "physician+nick@evisit.com")
    //check for password field
    browser.expect.element(`[data-field='password']`).to.be.present;
    //set password
    browser.setValue(`[data-field='password'] input`, "provider123")
    // //login button
    // browser.expect.element(`div[class='raTouchable raView eVisitAppButton eVisitAppButtonContainer eVisitAppButtonWithCaption eVisitAppComponent_0000000000321']`).to.be.present;
    // //click login
    // browser.click(`div[class='raTouchable raView eVisitAppButton eVisitAppButtonContainer eVisitAppButtonWithCaption eVisitAppComponent_0000000000321']`)
    // //wait for page to load
    // browser.pause(7000)
  }
    //geolocation page
  async function geoLocationPage(browser) {
    console.log("starting geolocation page")
    browser.useXpath()
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div/div[1]/div").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div/div[1]/div")
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div")
    browser.pause(6000)
  }

//request visit
  async function requestVisit(browser) {
    console.log("starting request visit")
    //expect See Now on Nick Provider
    browser.useCss()
    browser.expect.element("div.raTouchable:nth-child(5) > div:nth-child(4)").to.be.present;
    browser.click("div.raTouchable:nth-child(5) > div:nth-child(4)")
    browser.pause(6000)
    //short reason for request
    browser.expect.element("div.eVisitAppFormFieldWrapper:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)").to.be.present;
    browser.click("div.eVisitAppFormFieldWrapper:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)")
    browser.setValue("div.eVisitAppFormFieldWrapper:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)", "test")
    //description of illness
    browser.expect.element("div.eVisitAppFormFieldWrapper:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)").to.be.present;
    browser.click("div.eVisitAppFormFieldWrapper:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)")
    browser.setValue("div.eVisitAppFormFieldWrapper:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)", "test")
    browser.expect.element("div.raView:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)").to.be.present;
    //click next
    browser.click("div.raView:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)")
    //pharmacy
    browser.pause(5000)
    browser.expect.element(".eVisitAppNavigationButtons > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)").to.be.present;
    browser.click(".eVisitAppNavigationButtons > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)")
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