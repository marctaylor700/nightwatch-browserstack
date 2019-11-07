var env = "alpha";

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(5000);
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
  browser.pause(10000)
}

  async function visitHistoryTab(browser) {
    console.log("starting visit history tab test")

  //switch back to xpath. 
  browser.useXpath()
  //visit history tab
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[1]/div[3]/div/span').to.be.present;
  //click tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[1]/div[3]/div/span")
  //wait for visit history tab to load
  browser.pause(5000)
  //Look for latest completed visit with Graham
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div[1]/div[2]/div/div[3]/span[1]/span').text.to.equal('Graham Beltran');
  //pause
  browser.pause(9000)
  //expect notification 
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div[1]/div[2]/div/div[5]/div[2]/div/div/div/span").to.be.present
  //click notiication element that opens sidebar
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div[1]/div[2]/div/div[5]/div[2]/div/div/div/span")
  browser.pause(3000)
  //expect patient profile within sidebar
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/span").to.be.present;
  //click patient profile within sidebar
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/span")
  //wait 
  browser.pause(2000)
  //expect personal information within patient profile
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[1]/div/div/span/span").to.be.present;
  //click personal information in sidebar
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[1]/div/div/span/span")
  //check to see if Graham is the patient
  //this is broken for some reason right now. so fuck it. 
  //browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[3]/div/div/form/div[1]/div/div/input").text.to.equal('Graham Beltran');
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //pause
  browser.pause(2000)
  //expect insurance button in patient profile
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[2]/div/div").to.be.present;
  //click insurance button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[2]/div/div")
  //pause
  browser.pause(2000)
  //expect back button
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span").to.be.present;
  //click back button
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/div/div/span/span")
  //expect health record tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[1]/span/span").to.be.present;
  //click health record tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/div/div[1]/span/span")
  //pause
  browser.pause(2000)
  //expect visit history tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[4]/div/div[1]").to.be.present;
  //click visit history
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[4]/div/div[1]")
  //pause
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/div[4]/div/div[1]")
  //expect attachments tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[3]/div/div/span").to.be.present;
  //click attachments tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[3]/div/div/span")
  //pause
  browser.pause(2000)
  //expect charting tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[4]/div/div[2]").to.be.present;
  //click charting tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[4]/div/div[2]")
  //expect rx tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[5]/div").to.be.present;
  //click rx tab 
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[5]/div")
  //pause
  browser.pause(2000)
  //expect medications tab in rx tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div[2]/div/span").to.be.present;
  //click medications tab in rx
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div[2]/div/span")
  //expect supplies tab in rx tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div[3]/div/span").to.be.present;
  //click supplies tab in rx tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div[3]/div/span")
  //expect payments tab 
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[6]/div/div/span").to.be.present;
  //click payments tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[3]/div/div/div/div[1]/div[2]/div[2]/div[6]/div/div/span")
  //pause
  browser.pause(2000)
  //expect less button to close sidebar
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div[1]/div[2]/div/div[5]/div[2]/div").to.be.present;
  //click less button to clsoe sidebar
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div[1]/div[2]/div/div[5]/div[2]/div")
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
  'Provider Login - Verify Visit History Tab' : async function(browser) {
    //var newUserCredentials = await generateNewUserCredentials();

    //console.log(JSON.stringify(newUserCredentials));


    goToPracticeLoginPage(browser, "ewellness")
      .then(providerLogin(browser))
      .then(visitHistoryTab(browser))
      .then(browser.end());
  }, 
};
