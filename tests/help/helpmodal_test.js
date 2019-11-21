var env = "alpha";

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(2000);
}

async function providerLogin(browser) {
    console.log("starting provider login")
    //email field
    browser.expect.element(`input[name='email']`).to.be.present;
    browser.click(`input[name='email']`)
    //set email
    browser.setValue(`input[name='email`, "physician+nick@evisit.com")
    //password field
    browser.expect.element(`input[name='current-password']`).to.be.present;
    browser.click(`input[name='current-password']`)
    //set password
    browser.setValue(`input[name='current-password']`, "provider123")
    //login button
    browser.expect.element(`div[class='raView eVisitAppButton eVisitAppButtonInternalContainer eVisitAppComponent_0000000000319']`).to.be.present;
    //click login
    browser.click(`div[class='raView eVisitAppButton eVisitAppButtonInternalContainer eVisitAppComponent_0000000000319']`)
    //wait for page to load
    browser.pause(7000)
  }

async function helpModalCheck(browser) {
    console.log("starting help modal check")

    //expect the provider name drop down element
    browser.expect.element(`div.eVisitAppIcon:nth-child(2)`).to.be.present;
    //click the provider name dropdown
    browser.click(`div.eVisitAppIcon:nth-child(2)`)
    //expect the help option in the dropdown
    browser.expect.element("div.eVisitAppPopupMenuItem:nth-child(2) > span:nth-child(2)").to.be.present;
    //click help option in dropdown
    browser.click("div.eVisitAppPopupMenuItem:nth-child(2) > span:nth-child(2)")
    //pause
    browser.pause(3000)
    //expect help title
    browser.expect.element(".modal-title").to.be.present;
    //expect submit ticket option
    browser.expect.element("div.row:nth-child(1) > a:nth-child(1) > span:nth-child(2)").to.be.present;
    //expect phone number element
    browser.expect.element("div.flex:nth-child(2) > a:nth-child(1) > span:nth-child(2)").to.be.present;
    //expect KB option
    browser.expect.element(".center > a:nth-child(1) > button:nth-child(1) > span:nth-child(1)").to.be.present;
    //expect X to click out of modal
    browser.expect.element("div.eVisitAppGenericModalCloseButton:nth-child(1)").to.be.present;
    //click X to exit modal
    browser.click("div.eVisitAppGenericModalCloseButton:nth-child(1)")
    //expect provider name dropdown
    browser.expect.element("div.eVisitAppIcon:nth-child(2)").to.be.present;
    //click provider name dropdown
    browser.click("div.eVisitAppIcon:nth-child(2)")
    //expect logout in dropdown
    browser.expect.element("div.eVisitAppPopupMenuItem:nth-child(3) > span:nth-child(2)").to.be.present;
    //click logout
    browser.click("div.eVisitAppPopupMenuItem:nth-child(3) > span:nth-child(2)")
    browser.pause(4000)
    browser.useXpath()
    //expect yes on logout
    browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div/div/div[3]/div[3]/div/span").to.be.present;
    //click yes
    browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div/div/div[3]/div[3]/div/span")
    //pause
    browser.pause(6000)

}





// Basically the below stuff runs everything. 
module.exports = {
    before : async function (browser) {
      browser.resizeWindow(1920, 1080);
      '@tags:' ['test']
    },
    'Help Modal Test' : async function(browser) {
      goToPracticeLoginPage(browser, "ewellness")
        .then(providerLogin(browser))
        .then(helpModalCheck(browser))    
        .then(browser.end());
    }, 
  };