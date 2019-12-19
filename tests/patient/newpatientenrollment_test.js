// ALL css selectors will be given a class name to be more easily target for when they change dynamically


//variable for the environment
var env = "alpha";

//generate new user credentials and store them
async function generateNewUserCredentials() {
    var rando = Math.floor((Math.random() * 100000000000000) + 1); // random number gen for email
    var email = `marc+${rando}@evisit.com`; // email variable
    
    return { email: email, password: 'patient123' };
  }
  
  //go to practice login page 
  async function goToPracticeLoginPage(browser, handle) {
    console.log("starting goToPracticeLoginPage");
    browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
    browser.pause(5000);
  }
  
  //register a new patient 
  async function registerNewPatient(browser, newUserCredentials) {
    console.log("starting registerNewPatient");
    browser.useCss()
    browser.expect.element('.eVisitAppNavigationButtons > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').to.be.present;
    browser.click('.eVisitAppNavigationButtons > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)')  
    browser.pause(1000)
    //click email
    browser.expect.element(`input[name='email']`).to.be.present;
    browser.click(`input[name='email']`)
    //input email
    browser.setValue(`input[name='email']`, newUserCredentials.email)
    browser.useXpath()
    //input pass
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input")
    browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input", newUserCredentials.password)
    //confirm pass
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[3]/div/div[1]/input").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[3]/div/div[1]/input")
    browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[3]/div/div[1]/input", newUserCredentials.password)
    //click on the terms checkbox
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[4]/div/div/div[1]/div').to.be.present;
    browser.click('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[4]/div/div/div[1]/div')
    //click on the register button
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[5]/div/div[1]/div/div').to.be.present;
    browser.click('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[5]/div/div[1]/div/div') 
    browser.pause(20000)
  }


  //geolocation page
  async function geoLocationPage(browser) {
    console.log("starting geolocation page")
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div/div[1]/div").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div/div[1]/div")
    browser.expect.element("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div").to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div")
    browser.pause(6000)
  }

  //start the enrollment task
  async function enrollNewPatient(browser, generateName) {
    console.log("starting enrollNewPatient");
    browser.useCss()
    //click first name field
    browser.expect.element(`input[name='given-name']`).to.be.present;
    browser.click(`input[name='given-name']`)
    //input first name
    browser.setValue(`input[name='given-name']`, "Marc")
    //Click last name field
    browser.expect.element(`input[name='family-name']`).to.be.present;
    browser.click(`input[name='family-name']`)
    //input last name
    browser.setValue(`input[name='family-name']`, "Taylor")
    browser.useXpath()
    //click address field
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[1]/div/div/div[1]/input').to.be.present;
    browser.click('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[1]/div/div/div[1]/input')
    //input address
    browser.setValue('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[1]/div/div/div[1]/input', "715 s 54th street")
    //click city
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[3]/div/div[1]/input').to.be.present;
    browser.click('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[3]/div/div[1]/input')
    //set city
    browser.setValue('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[3]/div/div[1]/input', "Mesa")
    //state
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input")
    //click Arizona
    browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]/span').to.be.present;
    browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]/span")
    //click zip code
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[5]/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[5]/div/div[1]/input")
    //set zip code
    browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[5]/div/div[1]/input" , "85206")
    //click mobile phone
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[5]/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[5]/div/div[1]/input")
    //set cell phone number
    browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[5]/div/div[1]/input", "4802891576")
    //click date of birth
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[6]/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[6]/div/div[1]/input")
    //set date of birth 
    browser.setValue("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[6]/div/div[1]/input", "02141988")
    //sex field
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input")
    //click male sex
    browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]').to.be.present;
    browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]")
    //browser.useCss()
    browser.pause(3000)
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div")
    //browser.useXpath()
    browser.pause(5000)

}

//start the profile picture task
async function profilePicture(browser) {
    console.log("starting profile picture page")
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/div[3]/div/div/span').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/div[3]/div/div/span")
    browser.pause(5000)
  }
  
  //start the dependent page task
  async function dependentPage(browser) {
    console.log("starting dependent page")
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div")
    browser.pause(5000)
  
  }

  //start the insurance page task
  async function insurancePage(browser) {
    console.log("starting insurance page")
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div")
    browser.pause(5000)
  }

  //start the welcome page task 
  async function welcomePage(browser) {
    console.log("starting welcome page")
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[3]/div/div/div/span').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[3]/div/div/div/span")
    browser.pause(10000)
  }

module.exports = {
    before : async function (browser) {
      browser.resizeWindow(1920, 1080);
      '@tags:' ['test']
    },
    'Enroll a new patient' : async function(browser) {
      var newUserCredentials = await generateNewUserCredentials();
      //print out the user credentials 
      console.log(JSON.stringify(newUserCredentials));
  
      //these run everything
      goToPracticeLoginPage(browser, "ewellness")
        .then(registerNewPatient(browser, newUserCredentials))
        .then(geoLocationPage(browser))
        .then(enrollNewPatient(browser))
        .then(profilePicture(browser))
        .then(dependentPage(browser))
        .then(insurancePage(browser))
        .then(welcomePage(browser))
        .then(browser.end());
    }, 
  };
  