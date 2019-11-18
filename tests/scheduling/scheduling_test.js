var env = "alpha";

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(2000);
}

async function providerLogin(browser) {
  console.log("starting provider login")
  //use css selectors
  browser.useXpath()
  //email field
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input').to.be.present;
  browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input')
  //set email
  browser.setValue('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input', "physician+nick@evisit.com")
  //password field
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input")
  //set password
  browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input", "provider123")
  //login button
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[2]/div/div/span').to.be.present;
  //click login
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[2]/div/div/span")
  //wait for page to load
  browser.pause(5000)
}


async function schedulingTab(browser) {
  //console log test 
  console.log("starting scheduling test")
  //expect scheduling tab
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[1]/div[4]/div/div/span").to.be.present;
  //click scheduling tab
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[1]/div[4]/div/div/span")
  //pause
  browser.pause(5000)
  //expect visit type dropdown
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[1]/div/div/div/div/div[1]/input").to.be.present;
  //click visit type dropdown
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[1]/div/div/div/div/div[1]/input")
  //pause
  browser.pause(2000)
  //expect scheduled visit 
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[2]").to.be.present;
  //click scheduled visit
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[2]")
  //expect patient dropdown
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[2]/div/div/div/div[1]/input").to.be.present;
  //click patient dropdown
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[2]/div/div/div/div[1]/input")
  //expect patient Abby
  browser.expect.element("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/div[1]").to.be.present;
  //click patient Abby
  browser.click("/html/body/div/div/div/div[2]/div/div/div/div[1]/div[1]/div/div[1]")
  //expect provider dropdown
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[3]/div/div/div/div[1]/input").to.be.present;
  //click provider dropdown
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[1]/form/div[3]/div/div/div/div[1]/input")
}

// Basically the below stuff runs everything. 
module.exports = {
  before : async function (browser) {
    browser.resizeWindow(1920, 1080);
    '@tags:' ['test']
  },
  'Provider Login - Scheduling tab' : async function(browser) {
    //var newUserCredentials = await generateNewUserCredentials();

    //console.log(JSON.stringify(newUserCredentials));


    goToPracticeLoginPage(browser, "ewellness")
      .then(providerLogin(browser))
      .then(schedulingTab(browser))
      .then(browser.end());
  }, 
};
