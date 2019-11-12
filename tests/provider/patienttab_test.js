var env = "alpha";

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(2000);
}

async function providerLogin(browser) {
  console.log("starting provider login")
  //use css selectors
  browser.useCss()
  //email field
  browser.expect.element('#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > form > div:nth-child(1) > div > div.raView.eVisitAppTextField.eVisitAppTextFieldInputContainer.eVisitAppComponent_0000000000309 > input[type=text]').to.be.present;
  browser.click("#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > form > div:nth-child(1) > div > div.raView.eVisitAppTextField.eVisitAppTextFieldInputContainer.eVisitAppComponent_0000000000309 > input[type=text]")
  //set email
  browser.setValue("#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > form > div:nth-child(1) > div > div.raView.eVisitAppTextField.eVisitAppTextFieldInputContainer.eVisitAppComponent_0000000000309 > input[type=text]", "physician+nick@evisit.com")
  //password field
  browser.expect.element('#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > form > div:nth-child(2) > div > div.raView.eVisitAppTextField.eVisitAppTextFieldInputContainer.eVisitAppComponent_0000000000311 > input[type=password]').to.be.present;
  browser.click("#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > form > div:nth-child(2) > div > div.raView.eVisitAppTextField.eVisitAppTextFieldInputContainer.eVisitAppComponent_0000000000311 > input[type=password]")
  //set password
  browser.setValue("#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > form > div:nth-child(2) > div > div.raView.eVisitAppTextField.eVisitAppTextFieldInputContainer.eVisitAppComponent_0000000000311 > input[type=password]", "provider123")
  //login button
  browser.expect.element('#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > div.raView.eVisitAppNavigationButtons.eVisitAppNavigationButtonsButtonContainer.eVisitAppNavigationButtonsVerticalButtonContainer.eVisitAppComponent_0000000000313 > div:nth-child(2) > div > div > span').to.be.present;
  //click login
  browser.click("#root > div > div > div.raView.eVisitApp > div.raView.eVisitAppMainView > div.raView.eVisitAppNavigator.eVisitAppComponent_0000000000289 > div.raView.eVisitAppTransitionGroup.eVisitAppTransitionGroupEVisitAppNavigatorPageContainer.eVisitAppNavigatorPageContainer.eVisitAppComponent_0000000000304 > div > div > div > div.raView.eVisitAppSlate.eVisitAppComponent_0000000000305 > div > div > div.raView.eVisitAppBasePageMainContainer > div > div > div > div.raView.eVisitAppLoginPageForm > div.raView.eVisitAppNavigationButtons.eVisitAppNavigationButtonsButtonContainer.eVisitAppNavigationButtonsVerticalButtonContainer.eVisitAppComponent_0000000000313 > div:nth-child(2) > div > div > span")
  //wait for page to load
  browser.pause(5000)
}

async function patientsTab(browser) {
  console.log("starting patient tab test")
  browser.useXpath()
  //expect patient tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[1]/div[2]/div/span").to.be.present;
  //click patient tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[1]/div[2]/div/span")
  //expect patient name graham beltran
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[2]/span[1]/span").text.to.equal("Graham Beltran");
  //expect more button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[4]/div/div/div/div/div/span").to.be.present;
  //click more button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[4]/div/div/div/div/div/span")
  //pause
  browser.pause(5000)
  //expect personal info tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[1]/div/div/span/span").to.be.present;
  //click personal info tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[1]/div/div/span/span")
  //pause
  browser.pause(2000)
  //expect back button 
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect insurance tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[2]/div/div/span/span").to.be.present;
  //click insurance tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[2]/div/div/span/span")
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect health records tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[1]/span/span").to.be.present;
  //click health records tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[1]/span/span")
  //expect general allergies tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[2]/div/div/span/span").to.be.present;
  //click general allergies tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[2]/div/div/span/span")
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect med allergies tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[3]/div/div/span/span").to.be.present;
  //click med allergies tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[3]/div/div/span/span")
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect medications tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[4]/div/div/span/span").to.be.present;
  //click medications tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[4]/div/div/span/span")
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect conditions tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[5]/div/div/span/span").to.be.present;
  //click conditions tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[5]/div/div/span/span")
  //exepect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect procedures tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[6]/div/div/span/span").to.be.present;
  //click procedures tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[6]/div/div/span/span")
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect family history tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[7]/div/div/span/span").to.be.present;
  //click family history
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[7]/div/div/span/span")
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect questionnaire tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[8]/div/div/span/span").to.be.present;
  //click questionnaire tab 
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[8]/div/div/span/span")
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect visit history tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[4]/div/div[1]/span/span").to.be.present;
  //click visit history tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[4]/div/div[1]/span/span")
  //pause
  browser.pause(2000)
  //click visit history tab to close tab 
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[4]/div/div[1]/span/span")
  //expect less tab 
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[4]/div/div/div/div/div/span").to.be.present;
  //click less tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[4]/div/div/div/div/div/span")
  //browser expect logout dropdown
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[1]/div/div/div/div[2]/div[2]/div/div/span").to.be.present;
  //click dropdown for logout
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[1]/div/div/div/div[2]/div[2]/div/div/span")
  //expect logout option
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div/div/div[3]/span").to.be.present;
  //click logout 
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div/div/div[3]/span")
  //pause
  browser.pause(2000)
  //expect yes on logout
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div/div/div[3]/div[3]/div/span").to.be.present;
  //click yes on logout
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div/div/div[3]/div[3]/div/span")
  //pause
  browser.pause(4000)
}

 


// Basically the below stuff runs everything. 
module.exports = {
  before : async function (browser) {
    browser.resizeWindow(1920, 1080);
    '@tags:' ['test']
  },
  'Provider Login - Verify Patient Tab' : async function(browser) {
    //var newUserCredentials = await generateNewUserCredentials();

    //console.log(JSON.stringify(newUserCredentials));


    goToPracticeLoginPage(browser, "ewellness")
      .then(providerLogin(browser))
      .then(patientsTab(browser))
      .then(browser.end());
  }, 
};
