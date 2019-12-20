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

async function schedulingTab(browser, newUserCredentials) {
  //console log test 
  browser.useCss()
  console.log("starting scheduling test")
  //expect scheduling tab
  browser.expect.element("div.raTouchable:nth-child(4)").to.be.present;
  //click scheduling tab
  browser.click("div.raTouchable:nth-child(4)")
  //pause
  browser.pause(5000)
  //expect visit type dropdown
  browser.expect.element(".eVisitAppTextFieldIconContainer").to.be.present;
  //click visit type dropdown
  browser.click(".eVisitAppTextFieldIconContainer")
  //pause
  browser.pause(2000)
  //expect scheduled visit 
  browser.expect.element("div.eVisitAppPopupMenuItem:nth-child(2)").to.be.present;
  //click scheduled visit
  browser.click("div.eVisitAppPopupMenuItem:nth-child(2)")
  browser.useXpath()
  //expect patient dropdown
  browser.expect.element(`/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[2]/div/div/div/div[1]/input`).to.be.present;
  //click patient dropdown
  browser.click(`/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[2]/div/div/div/div[1]/input`)
  browser.useCss()
  //expect create new patient
  browser.expect.element(".eVisitAppPopupInternalContainer > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)").to.be.present;
  //click new patient
  browser.click(".eVisitAppPopupInternalContainer > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)")
  browser.useXpath()
  //expect first name
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[1]/div/div[1]/input").to.be.present;
  //click first name
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[1]/div/div[1]/input")
  //insert first name
  browser.setValue("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[1]/div/div[1]/input", "Marc")
  //expect last name
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[2]/div/div[1]/input").to.be.present;
  //click last name
  browser.setValue("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[2]/div/div[1]/input", "Taylor")
  //expect date of birth field
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[3]/div/div[1]/input").to.be.present;
  //click dob field
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[3]/div/div[1]/input")
  //set dob
  browser.setValue("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[3]/div/div[1]/input", "02141988")
  //expect email field
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[4]/div/div[1]/input").to.be.present;
  //click email field
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[4]/div/div[1]/input")
  //set email
  browser.setValue("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/form/div[4]/div/div[1]/input", newUserCredentials.email)
  //expect create patient 
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/div").to.be.present;
  //click create patient
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/div")
  //pause
  browser.pause(5000)
  //expect provider field
  browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[3]/div/div/div/div[1]").to.be.present;
  //click provider field
  browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[3]/div/div/div/div[1]")
  //input nick
  //browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[3]/div/div/div/div[1]", "Nick")
  //pause
  browser.pause(3000)
  //expect nick's provider
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div/div/div[3]/div/div[2]/span[2]").to.be.present;
  //click nick
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div/div/div[3]/div/div[2]/span[2]")
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
