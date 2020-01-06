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
    //i don't have an account
    browser.expect.element(`[data-test-id='dontHaveAccount']`).to.be.present;
    //click i don't have an account
    browser.expect.element(`[data-test-id='dontHaveAccount']`).to.be.present;
    browser.pause(1000)
    //expect, click, and input email
    browser.expect.element(`[data-test-id='email']`).to.be.present;
    browser.click(`[data-test-id='email']`)
    browser.setValue(`[data-test-id='email']`, newUserCredentials.email)
    //expect, click, and input password
    browser.expect.element(`[data-test-id='password']`).to.be.present;
    browser.click(`[data-test-id='password']`)
    browser.setValue(`[data-test-id='password']`, newUserCredentials.password)
    browser.pause(3000)
    //expect, click, and input password 
    browser.expect.element(`[data-test-id='confirmPassword']`).to.be.present;
    browser.click(`[data-test-id='confirmPassword']`)
    browser.setValue(`[data-test-id='confirmPassword']`, newUserCredentials.password)
    //click on the terms checkbox
    browser.expect.element(`[data-test-id='tos0']`).to.be.present;
    browser.click(`[data-test-id='tos0']`)
    //click on the register button
    browser.expect.element(`[data-test-id='tos0']`).to.be.present;
    browser.click(`[data-test-id='tos0']`) 
    browser.pause(20000)
  }


  //geolocation page
  async function geoLocationPage(browser) {
    console.log("starting geolocation page")
    browser.expect.element(`[data-test-id='confirmCheckBox']`).to.be.present;
    browser.click(`[data-test-id='confirmCheckBox']`)
    browser.expect.element(`[data-test-id='continue']`).to.be.present;
    browser.click(`[data-test-id='continue']`)
    browser.pause(6000)
  }

  //start the enrollment task
  async function enrollNewPatient(browser, generateName) {
    console.log("starting enrollNewPatient");
    browser.useCss()
    //click first name field
    browser.expect.element(`[data-test-id='firstName']`).to.be.present;
    browser.click(`[data-test-id='firstName']`)
    //input first name
    browser.setValue(`[data-test-id='firstName']`, "Marc")
    //Click last name field
    browser.expect.element(`[data-test-id='lastName']`).to.be.present;
    browser.click(`[data-test-id='lastName']`)
    //input last name
    browser.setValue(`[data-test-id='lastName']`, "Taylor")
    //click address field
    browser.expect.element(`[data-test-id='addressLine1']`).to.be.present;
    browser.click(`[data-test-id='addressLine1']`)
    //input address
    browser.setValue(`[data-test-id='addressLine1']`, "715 s 54th street")
    //click city
    browser.expect.element(`[data-test-id='city']`).to.be.present;
    browser.click(`[data-test-id='city']`)
    //set city
    browser.setValue(`[data-test-id='city']`, "Mesa")
    //state (wait for Ryan's update)
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input")
    //click Arizona
    browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]/span').to.be.present;
    browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]/span")
    //click zip code
    browser.expect.element(`[data-test-id='zipCode']`).to.be.present;
    browser.click(`[data-test-id='zipCode']`)
    //set zip code
    browser.setValue(`[data-test-id='zipCode']`, "85206")
    //click mobile phone
    browser.expect.element(`[data-test-id='phoneCell']`).to.be.present;
    browser.click(`[data-test-id='phoneCell']`)
    //set cell phone number
    browser.setValue(`[data-test-id='phoneCell']`, "4802891576")
    //click date of birth
    browser.expect.element(`[data-test-id='dob']`).to.be.present;
    browser.click(`[data-test-id='dob']`)
    //set date of birth 
    browser.setValue(`[data-test-id='dob']`, "02141988")
    //sex field (wait for Ryan's update)
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input")
    browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]').to.be.present;
    browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]")
    browser.pause(3000)
    //family account check box (leaving commented until we need to enable it)
    // browser.expect.element(`[data-test-id='familyAccountCheckBox']`).to.be.present;
    // browser.click(`[data-test-id='dob']`)
    //continue button
    browser.expect.element(`[data-test-id='continue']`).to.be.present;
    browser.click(`[data-test-id='continue']`)
    browser.pause(5000)

}

//start the profile picture task
async function profilePicture(browser) {
    console.log("starting profile picture page")
    browser.expect.element(`[data-test-id='skip']`).to.be.present;
    browser.click(`[data-test-id='skip']`)
    browser.pause(5000)
  }
  
  //start the dependent page task
  async function dependentPage(browser) {
    console.log("starting dependent page")
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(5000)
  
  }

  //start the insurance page task
  async function insurancePage(browser) {
    console.log("starting insurance page")
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(5000)
  }

  //start the welcome page task 
  async function welcomePage(browser) {
    console.log("starting welcome page")
    browser.expect.element(`[data-test-id='continue']`).to.be.present;
    browser.click(`[data-test-id='continue']`)
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
  