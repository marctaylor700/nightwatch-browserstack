var env = "app";

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(2000);
}

async function salesLogin(browser) {
  console.log("starting sales login")
  //use css selectors
  browser.useCss()
  //email field
  browser.expect.element('#input_0').to.be.present;
  browser.click("#input_0")
  //set email
  browser.setValue("#input_0", "sales+test@evisit.com")
  //password field
  browser.expect.element('#input_1').to.be.present;
  browser.click("#input_1")
  //set password
  browser.setValue("#input_1", "admin:mtaylor@evisit.com:mt4yl0r1320#!")
  //login button
  browser.expect.element('#login-form > md-content > div.flex > form > button > span').to.be.present;
  //click login
  browser.click("#login-form > md-content > div.flex > form > button > span")
  //wait for page to load
  browser.pause(10000)
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


    goToPracticeLoginPage(browser, "florida-hospital")
        .then(salesLogin(browser))
        .then(browser.end());
  }, 
};
