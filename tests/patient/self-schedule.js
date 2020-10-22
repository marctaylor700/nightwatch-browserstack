var env = "release"
var d = new Date();

//Open URL based on variables
async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/${handle}/auth/LoginPage`);
  browser.pause(2000);
}

//patient Login Page
async function patientLogin(browser) {
  console.log("starting patient login")
  browser.useCss()
  //check and set email
  browser.expect.element(`[data-test-id='email']`).to.be.present;
  browser.setValue(`[data-test-id='email']`, 'taylor+o14@evisit.com')
  //check and set password
  browser.expect.element(`[data-test-id='password']`).to.be.present;
  browser.setValue(`[data-test-id='password']`, 'Patient123!')
  //expect and click login button
  browser.expect.element(`[data-test-id='loginButton']`).to.be.present;
  browser.click(`[data-test-id='loginButton']`)
  // //wait for page to load
  browser.pause(5000)
}

//geolocation page
async function geoLocationPage(browser) {

  browser.element('css selector', '[data-test-id=confirmCheckBox]', function (result) {
    if (result.status != -1) {
      console.log("starting geolocation page")
      //check and click confirm checkbox
      browser.expect.element(`[data-test-id=confirmCheckBox]`).to.be.present;
      browser.click('[data-test-id="stateSelect"]')
      browser.pause(1000)
      browser.click('[data-test-id="FloridaOption"]')
      browser.click(`[data-test-id='confirmCheckBox']`)
      //check and click continue button
      browser.expect.element(`[data-test-id='continue']`).to.be.present;
      browser.click(`[data-test-id='continue']`)
      //pause
      browser.pause(6000)
    } else {
      console.log("Skipping Geolocation Page")
      browser.pause(6000)
    }
  });
}

//Schedule a visit proccess
async function requestScheduledVisit(browser) {
  console.log("starting request scheduled visit")

  // TODO - In case there is upcoming visits to start
  // TODO - Depends on https://app.clickup.com/t/252vmk
  //*
  //  browser.element('css selector', ".eVisitAppComponent_0000000004093", function (result) {
  //   console.log(result.status)
  //   if (result.status != -1) {
  //     browser.click('.eVisitAppComponent_0000000000771')
  //     browser.pause(4000)
  //   }
  // });

  //In case there is upcoming visits already scheduled and no ongoing request
  browser.element('css selector', '[data-test-id=requestVisit]', function (result) {
    if (result.status != -1) {
      browser.click({ selector: '[data-test-id=requestVisit]' })
      browser.pause(4000)
    }
  });

  //In case there is upcoming visits already scheduled AND an ongoing request
  browser.element('css selector', '[data-test-id=resumeVisit]', function (result) {
    if (result.status != -1) {
      browser.click({ selector: '[data-test-id=resumeVisit]' })
      browser.pause(4000)
    }
  });

  //In case there is NO upcoming visits already scheduled and no ongoing request
  browser.element('css selector', '[data-test-id="sceneContainer/Page/requestVisit/ChoosePatientPage"]', function (result) {
    if (result.status != -1) {
      //select the main patient
      //In order to use dependent, the index is the only thing that requires change
      browser.expect.element({ selector: '[data-test-id=rowClick]', index: 0 }).to.be.present;
      browser.click({ selector: '[data-test-id=rowClick]', index: 0 })
      browser.pause(4000)

      //select the schedule option button of the first provider in the list
      browser.expect.element({ selector: '[data-test-id=scheduleVisit0]' }).to.be.present;
      browser.click('[data-test-id=scheduleVisit0]')
      browser.pause(4000)
    }
  });

  //In case there is NO upcoming visits already scheduled and there is a ongoing request in the visit details page
  browser.element('css selector', '[data-test-id=question1]', function (result) {
    if (result.status != -1) {
      //visit details
      browser.expect.element(`[data-test-id='question1']`).to.be.present;
      browser.click(`[data-test-id='question1']`)
      browser.setValue(`[data-test-id='question1']`, "REASON")
      browser.expect.element(`[data-test-id='question2']`).to.be.present;
      browser.click(`[data-test-id='question2']`)
      browser.setValue(`[data-test-id='question2']`, "ILLNESS")
      //next button
      browser.expect.element(`[data-test-id='visitDetailsNext']`).to.be.present;
      browser.click(`[data-test-id='visitDetailsNext']`)
      browser.pause(5000)
    }
  });

  //calendar day - Will pick today's date
  browser.expect.element('[data-test-id=calendarDay' + d.getDate() + ']').to.be.present;
  browser.click('[data-test-id=calendarDay' + d.getDate() + ']')
  browser.pause(4000)

  //select 1st time available
  browser.expect.element('[data-test-id*=timeSlot]').to.be.present;
  browser.click('[data-test-id*=timeSlot]')
  browser.pause(4000)

  browser.expect.element('[data-test-id=next]').to.be.present;
  browser.click('[data-test-id=next]')
  browser.pause(4000)

  //confirmation page
  browser.expect.element(`[data-test-id='agreementCheckbox']`).to.be.present;
  browser.click(`[data-test-id='agreementCheckbox']`)
  //expect and click next button on confirmation page
  browser.expect.element(`[data-test-id='visitSubmit']`).to.be.present;
  browser.click(`[data-test-id='visitSubmit']`)
  browser.pause(5000)
  browser.assert.urlEquals('https://release.evisit.com/r/omega/patientHome/UpcomingVisitPage');
  //browser.expect.element().to.be.present;
  browser.assert.visible(`[data-test-id='sceneContainer/Page/patientHome/UpcomingVisitPage']`, 'The Upcoming Visits Page is correctly displayed');

}

// Basically the below stuff runs everything. 
module.exports = {
  before: async function (browser) {
    browser.resizeWindow(1920, 1080);
    '@tags:'['test']
  },
  'Patient requesting a scheduled visit': async function (browser) {
    goToPracticeLoginPage(browser, "omega")
      .then(patientLogin(browser))
      .then(geoLocationPage(browser))
      .then(requestScheduledVisit(browser))
      .then(browser.end());
  },
};