var env = "alpha";

async function generateNewUserCredentials() {
  var rando = Math.floor((Math.random() * 100000000000000) + 1); // random number gen for email
  var email = `marc+${rando}@evisit.com`; // email variable
  
  return { email: email};
}

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

async function schedulingTab(browser, newUserCredentials) {
  //console log test 
  browser.useCss()
  console.log("starting scheduling test")
  //expect scheduling tab
  browser.expect.element(`[data-test-id='schedulingTab']`).to.be.present;
  //click scheduling tab
  browser.click(`[data-test-id='schedulingTab']`)
  //pause
  browser.pause(5000)
  //expect and click visit type dropdown
  browser.expect.element(`[data-test-id='editAppointmentVisitType']`).to.be.present;
  browser.click(`[data-test-id='editAppointmentVisitType']`)
  //pause
  browser.pause(2000)
  //expect and click schedule visit
  browser.expect.element(`[data-test-id='ScheduleVisitOption']`).to.be.present;
  browser.click(`[data-test-id='ScheduleVisitOption']`)
  //expect and click patient dropdown
  browser.expect.element(`[data-test-id='editAppointmentPatient']`).to.be.present;
  browser.click(`[data-test-id='editAppointmentPatient']`)
  //expect and click create new patient
  browser.expect.element(`[data-test-id='createPatient']`).to.be.present;
  browser.click(`[data-test-id='createPatient']`)
  //expect click and set first name
  browser.expect.element(`[data-test-id='formFirstName']`).to.be.present;
  browser.click(`[data-test-id='formFirstName']`)
  browser.setValue(`[data-test-id='formFirstName']`, "Marc")
  //expect click and set last name
  browser.expect.element(`[data-test-id='formLastName']`).to.be.present;
  browser.click(`[data-test-id='formLastName']`)
  browser.setValue(`[data-test-id='formLastName']`, "Taylor")
  //expect click and set dob field
  browser.expect.element(`[data-test-id='formDOB']`).to.be.present;
  browser.click(`[data-test-id='formDOB']`)
  browser.setValue(`[data-test-id='formDOB']`, "02141988")
  //expect click and set email
  browser.expect.element(`[data-test-id='formEmail']`).to.be.present;
  browser.click(`[data-test-id='formEmail']`)
  browser.setValue(`[data-test-id='formEmail']`, newUserCredentials.email)
  //expect create patient and click 
  browser.expect.element(`[data-test-id='createPatient']`).to.be.present;
  browser.click(`[data-test-id='createPatient']`)
  //pause
  browser.pause(2000)
  //expect provider field and click
  browser.expect.element(`[data-test-id='editAppointmentProvider']`).to.be.present;
  browser.click(`[data-test-id='editAppointmentProvider']`)
  //input nick
  browser.setValue(`[data-test-id='editAppointmentProvider']`, "Nick")
  //pause
  browser.pause(2000)
  //expect nick's provider
  browser.expect.element(`[data-test-id='rowClick0']`).to.be.present;
  //click nick
  browser.click(`[data-test-id='rowClick0']`)
  //expect date field
  browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[4]/div/div/div/div/div[1]/input").to.be.present;
  //click date field
  browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[4]/div/div/div/div/div[1]/input")
  browser.useCss()
  //expect one date. need to figure out how to make this dynamic so the date can be called to any date we would want. 
  browser.expect.element(".eVisitAppPopupMenuContentContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(5) > div:nth-child(6) > span:nth-child(1) > span:nth-child(1)").to.be.present;
  //click date
  browser.click(".eVisitAppPopupMenuContentContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(5) > div:nth-child(6) > span:nth-child(1) > span:nth-child(1)")
  //expect time field
  browser.useXpath()
  browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[5]/div/div/div/div/div[1]/input").to.be.present;
  //click time field
  browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[5]/div/div/div/div/div[1]/input")
  //expect 8am time
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div[5]/div").to.be.present;
  //click 8am time
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div[5]/div")
  //expect schedule visit button
  browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[6]/div/div").to.be.present;
  //click schedule visit 
  browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[6]/div/div")
  //pause
  browser.pause(9000)
  browser.useCss()
  //expect decline button to cancel the visit 
  browser.expect.element('div.eVisitAppIconButton:nth-child(1) > div:nth-child(1)').to.be.present;
  //click cancel button
  browser.click("div.eVisitAppIconButton:nth-child(1) > div:nth-child(1)")
  //expect yes no option
  browser.pause(2000)
  browser.useXpath()
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div/div/div[3]/div[3]/div").to.be.present;
  //click yes
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div/div/div[3]/div[3]/div")
  //pause
  browser.pause(9000)

  

}

// Basically the below stuff runs everything. 
module.exports = {
  before : async function (browser) {
    browser.resizeWindow(1920, 1080);
    '@tags:' ['test']
  },
  'Provider Login - Scheduling tab' : async function(browser) {
    var newUserCredentials = await generateNewUserCredentials();

    console.log(JSON.stringify(newUserCredentials));


    goToPracticeLoginPage(browser, "ewellness")
      .then(providerLogin(browser))
      .then(schedulingTab(browser, newUserCredentials))
      .then(browser.end());
  }, 
};
