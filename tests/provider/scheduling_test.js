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


async function schedulingTab(browser) {
    //console log test 
    console.log("starting scheduling tab test")
    






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
    //   .then(providerLogin(browser))
    //   .then(patientsTab(browser))
      .then(browser.end());
  }, 
};
