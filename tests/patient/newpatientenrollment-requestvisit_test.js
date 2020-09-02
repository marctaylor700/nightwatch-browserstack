//variable for the environment
var env = "release";

//generate new user credentials and store them
async function generateNewUserCredentials() {
    var rando = Math.floor((Math.random() * 100000000000000) + 1); // random number gen for email
    var email = `marc+${rando}@evisit.com`; // email variable
    
    return { email: email, password: 'IBM4youmm@' };
  }  
  //go to practice login page 
  async function goToPracticeLoginPage(browser, handle) {
    console.log("starting goToPracticeLoginPage");
    browser.url(`https://${env}.evisit.com/r/${handle}/auth/LoginPage`);
    //updated link for login page
    //https://release.evisit.com/r/handle/auth/LoginPage
    browser.pause(5000);
  }
  //register a new patient 
  async function registerNewPatient(browser, newUserCredentials) {
    console.log("starting registerNewPatient");
    browser.useCss()
    //i don't have an account
    browser.expect.element(`[data-test-id='dontHaveAccount']`).to.be.present;
    browser.click(`[data-test-id='dontHaveAccount']`)
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
    browser.expect.element(`[data-test-id='register']`).to.be.present;
    browser.click(`[data-test-id='register']`) 
    browser.pause(5000)
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
    browser.setValue(`[data-test-id='addressLine1']`, "1750 E Carson Rd")
    //click city
    browser.expect.element(`[data-test-id='city']`).to.be.present;
    browser.click(`[data-test-id='city']`)
    //set city
    browser.setValue(`[data-test-id='city']`, "Phoenix")
    //state (wait for Ryan's update)
    browser.useXpath()
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input")
    //click Arizona
    browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]/span').to.be.present;
    browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]/span")
    browser.useCss()
    //click zip code
    browser.expect.element(`[data-test-id='zipCode']`).to.be.present;
    browser.click(`[data-test-id='zipCode']`)
    //set zip code
    browser.setValue(`[data-test-id='zipCode']`, "85042")
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
    browser.useXpath()
    browser.expect.element('/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input').to.be.present;
    browser.click("/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input")
    browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]').to.be.present;
    browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]")
    browser.pause(3000)
    //family account check box (leaving commented until we need to enable it)
    // browser.expect.element(`[data-test-id='familyAccountCheckBox']`).to.be.present;
    // browser.click(`[data-test-id='dob']`)
    //continue button
    browser.useCss()
    browser.expect.element(`[data-test-id='continue']`).to.be.present;
    browser.click(`[data-test-id='continue']`)
    browser.pause(5000)

  }

// //start practice orgs selection screen. (leave disabled unless practice orgs is enabled)
// async function practiceSelection(browser) {
//   console.log("starting practice selection screen")
//   browser.expect.element(`[data-test-id='skipForNow']`).to.be.present;
//   browser.click(`[data-test-id='skipForNow']`)
//   browser.pause(5000)
// }

//start the profile picture task
async function profilePicture(browser) {
    console.log("starting profile picture page")
    browser.expect.element(`[data-test-id='skip']`).to.be.present;
    browser.click(`[data-test-id='skip']`)
    browser.pause(5000)
  } 
  //start the dependent page task
  //dep page was removed
  // async function dependentPage(browser) {
  //   console.log("starting dependent page")
  //   browser.expect.element(`[data-test-id='no']`).to.be.present;
  //   browser.click(`[data-test-id='no']`)
  //   browser.pause(5000)
  
  // }
  //start the insurance page task 
  async function insurancePage(browser) {
    console.log("starting insurance page")
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(8000)
  }
  //start the welcome page task 
  async function welcomePage(browser) {
    console.log("starting welcome page")
    browser.expect.element(`[data-test-id='continue']`).to.be.present;
    browser.click(`[data-test-id='continue']`)
    browser.pause(10000)
  }

    //start the welcome page task 
    async function selectPatient(browser) {
      console.log("starting select a patient page")
      browser.useXpath()
      browser.expect.element(`/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]`).to.be.present;
      browser.click(`/html/body/div/div/div/div[1]/div[2]/div[1]/div[2]`)
      browser.pause(10000)
    }
    
   //request visit
   async function requestVisit(browser) {
    console.log("starting request visit")
    //Select a visit type
    // browser.expect.element(`[data-test-id='selectVisitTypeRow0']`).to.be.present;
    // browser.click(`[data-test-id='selectVisitTypeRow0']`)
    // browser.pause(5000)
    //expect See Now on Nick Provider
    browser.useCss()
    browser.expect.element(`[data-test-id="seeNow9"]`).to.be.present;
    browser.click(`[data-test-id="seeNow9"]`)
    browser.pause(6000)
    //short reason for request
    browser.expect.element(`[data-field='reason']`).to.be.present;
    browser.click(`[data-field='reason']`)
    browser.click(`[data-field='reason']`)
    browser.setValue(`[data-field='reason']`, "I am sick. Can you read this.")
    //description of illness
    browser.expect.element(`[data-test-id='question2']`).to.be.present;
    browser.click(`[data-test-id='question2']`)
    browser.setValue(`[data-test-id='question2']`, "This is a test")
    //next button
    browser.expect.element(`[data-test-id='visitDetailsNext']`).to.be.present;
    browser.click(`[data-test-id='visitDetailsNext']`) 
    browser.pause(5000)
    //known allergies page
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(2000)
    //medication allergies page
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(2000)
    //medical conditions page
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(2000)
    //family medical history
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(2000)
    //medications page
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(2000)
    //medical procedures page
    browser.expect.element(`[data-test-id='no']`).to.be.present;
    browser.click(`[data-test-id='no']`)
    browser.pause(2000)
    //smoking alcohol page TODO (WAITING ON RYANS UPDATES)
    browser.expect.element(`[data-test-id='question1No']`).to.be.present;
    browser.click(`[data-test-id='question1No']`)
    browser.expect.element(`[data-test-id='question2No']`).to.be.present;
    browser.click(`[data-test-id='question2No']`)
    //click next on smoking alcohol page
    browser.expect.element(`[data-test-id='next']`).to.be.present;
    browser.click(`[data-test-id='next']`)
    browser.pause(2000)
    //pharmacy page
    browser.expect.element(`[data-test-id='pharmacyRow0']`).to.be.present;
    browser.click(`[data-test-id='pharmacyRow0']`)
    browser.pause(2000)
    browser.expect.element(`[data-test-id='savePharmacy']`).to.be.present;
    browser.click(`[data-test-id='savePharmacy']`)
    //credit card page
    // browser.expect.element(`[data-test-id='ccNumber']`).to.be.present;
    // browser.click(`[data-test-id='ccNumber']`)
    // browser.setValue(`[data-test-id='ccNumber']`, "4242424242424242")
    // browser.expect.element(`[data-test-id='expiryDate']`).to.be.present;
    // browser.click(`[data-test-id='expiryDate']`)
    // browser.setValue(`[data-test-id='expiryDate']`, "022020")
    // browser.expect.element(`[data-test-id='expiryDate']`).to.be.present;
    // browser.click(`[data-test-id='expiryDate']`)
    // browser.setValue(`[data-test-id='expiryDate']`, "424")
    // browser.expect.element(`[data-test-id='cvcField']`).to.be.present;
    // browser.click(`[data-test-id='cvcField']`)
    // browser.setValue(`[data-test-id='cvcField']`, "424")
    // browser.expect.element(`[data-test-id='saveCreditCard']`).to.be.present;
    // browser.click(`[data-test-id='saveCreditCard']`)
    // browser.pause(2000)
    //expect and click agreement checkbox
    browser.expect.element(`[data-test-id='agreementCheckbox']`).to.be.present;
    browser.click(`[data-test-id='agreementCheckbox']`)
    //expect and click next button on confirmation page
    browser.expect.element(`[data-test-id='visitSubmit']`).to.be.present;
    browser.click(`[data-test-id='visitSubmit']`)
    browser.pause(5000)
    //send esc key (workaround)
    browser.keys([browser.Keys.ESCAPE])
    // browser.pause(2000)
    //close notification modal
    browser.expect.element(`[data-test-id='visitNotificationPreferencesModalConfirm']`).to.be.present;
    browser.click(`[data-test-id='visitNotificationPreferencesModalConfirm']`)
    //expect and click cancel button
    browser.expect.element(`[data-test-id='cancelRequeueVisit']`).to.be.present;
    browser.click(`[data-test-id='cancelRequeueVisit']`)
    //expect and click yes to cancel visit
    browser.expect.element(`[data-test-id='confirmModalConfirm']`).to.be.present;
    browser.click(`[data-test-id='confirmModalConfirm']`)
    browser.pause(2000)
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
      goToPracticeLoginPage(browser, "omega")
        .then(registerNewPatient(browser, newUserCredentials))
        //.then(geoLocationPage(browser))
        .then(enrollNewPatient(browser))
        //.then(practiceSelection(browser))
        .then(profilePicture(browser))
        //.then(dependentPage(browser))
        .then(insurancePage(browser))
        .then(welcomePage(browser))
        .then(selectPatient(browser))
        .then(requestVisit(browser))
        .then(browser.end());
    }, 
  };
  