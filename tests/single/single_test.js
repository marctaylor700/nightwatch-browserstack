var env = "alpha";
// var userEnrollData = {
//   firstName: "Marc",
//   lastName: "Taylor"
// }

async function generateNewUserCredentials() {
  var rando = Math.floor((Math.random() * 100000000000000) + 1); // random number gen for email
  var email = `marc+${rando}@evisit.com`; // email variable
  
  return { email: email, password: 'patient123' };
}

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(5000);
}

async function registerNewPatient(browser, newUserCredentials) {
  console.log("starting registerNewPatient");
  
  //select sign up button. Use Xpath Selectors
  browser.useXpath()
  browser.expect.element('//*[@id="root"]/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[3]/div/div/span').to.be.present;
  browser.click('//*[@id="root"]/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[3]/div/div/span')  
  browser.pause(1000)
  browser.useXpath()
  //browser.click("/html/body/div/div[2]/md-content/div/div[2]/div/div/div/div/div/md-content/div[4]/form/div[1]/ng-form[1]/md-input-container/ng-transclude/input")
  //click email element. Use CSS selectors
  //browser.useCss()
  //click email
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input")
  //input email
  browser.setValue('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input', newUserCredentials.email)
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input').to.be.present;
  browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input')
  //input pass
  browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input", newUserCredentials.password)
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[3]/div/div[1]/input').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[3]/div/div[1]/input")
  //confirm pass
  browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[3]/div/div[1]/input", newUserCredentials.password)
  //click on the terms checkbox
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[4]/div/div/div[1]/div').to.be.present;
  browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[4]/div/div/div[1]/div')
  //click on the register button
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[1]/div/div/span').to.be.present;
  browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[1]/div/div/span') 
  browser.pause(20000)
}

async function geoLocationPage(browser) {
  console.log("starting geolocation page")
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div/div[1]/div").to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div/div[1]/div")
  browser.expect.element("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div/span").to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div/span")
  browser.pause(6000)
}







async function enrollNewPatient(browser, generateName) {
      console.log("starting enrollNewPatient");

      //click first name field
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[1]/div/div[1]/input').to.be.present;
      browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[1]/div/div[1]/input')
      //input first name
      browser.setValue('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[1]/div/div[1]/input', "Marc")
      //Click last name field
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div[1]/input').to.be.present;
      browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div[1]/input')
      //input last name
      browser.setValue('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[3]/div/div[1]/input', "Taylor")
      //click address field
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[1]/div/div/div[1]/input').to.be.present;
      browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[1]/div/div/div[1]/input')
      //input address
      browser.setValue('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[1]/div/div/div[1]/input', "715 s 54th street")
      //click city
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[3]/div/div[1]/input').to.be.present;
      browser.click('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[3]/div/div[1]/input')
      //set city
      browser.setValue('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[3]/div/div[1]/input', "Mesa")
      //state
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input').to.be.present;
      browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[4]/div/div/div/div[1]/input")
      //click Arizona
      browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]').to.be.present;
      browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[3]")
      //click zip code
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[5]/div/div[1]/input').to.be.present;
      browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[5]/div/div[1]/input")
      //set zip code
      browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[4]/div/div/div[5]/div/div[1]/input" , "85206")
      //click mobile phone
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[5]/div/div[1]/input').to.be.present;
      browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[5]/div/div[1]/input")
      //set cell phone number
      browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[5]/div/div[1]/input", "4802891576")
      //click date of birth
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[6]/div/div[1]/input').to.be.present;
      browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[6]/div/div[1]/input")
      //set date of birth 
      browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[6]/div/div[1]/input", "02141988")
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input').to.be.present;
      browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/form/div[7]/div/div/div/div[1]/input")
      browser.expect.element('/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]').to.be.present;
      browser.click("/html/body/div/div/div/div[2]/div/div/div/div/div/div/div[1]")
      //browser.useCss()
      browser.pause(3000)
      browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div').to.be.present;
      browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div")
      //browser.useXpath()
      browser.pause(5000)

}

async function profilePicture(browser) {
  console.log("starting profile picture page")
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/div[3]/div/div/span').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/div[3]/div/div/span")
  browser.pause(5000)
}

async function dependentPage(browser) {
  console.log("starting dependent page")
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div")
  browser.pause(5000)

}

async function insurancePage(browser) {
  console.log("starting insurance page")
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div/div/div[1]/div")
  browser.pause(5000)
}

async function welcomePage(browser) {
  console.log("starting welcome page")
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[3]/div/div/div/span').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[3]/div/div/div/span")
  browser.pause(10000)
}

async function logoutUser(browser) {
  console.log("starting logout patient");
  browser.pause(5000)
  //click on select button
  browser.useCss()
  browser.expect.element('#menu-button > span.ng-binding').to.be.present;
  browser.click("#menu-button > span.ng-binding")
  browser.pause(1000)
  //select logout
  browser.useXpath()
  browser.expect.element('//*[@id="menu_container_5"]/md-menu-content/md-menu-item[4]/button/span').to.be.present;
  browser.click('//*[@id="menu_container_5"]/md-menu-content/md-menu-item[4]/button/span')
  browser.useXpath()
  //pause at login page
  browser.pause(10000)
  //click ok to logout
  browser.expect.element('html/body/div[4]/md-dialog/md-dialog-content/div/div/button[2]/span').to.be.present;
  browser.click("/html/body/div[4]/md-dialog/md-dialog-content/div/div/button[2]/span")
  browser.pause(10000)



}

async function loginUser(browser, userCredentials) {
  console.log("starting login patient")
  browser.useCss()
  browser.click("#input_0")
  browser.expect.element('#input_0').to.be.present;
  browser.setValue("#input_0" , userCredentials.email)
  browser.click("#input_1")
  browser.expect.element('#input_1').to.be.present;
  browser.setValue("#input_1", userCredentials.password)
  //login button
  browser.expect.element('#login-form > md-content > div.flex > form > button').to.be.present;
  browser.click("#login-form > md-content > div.flex > form > button")
  browser.pause(9000)
  
}

async function requestVisit(browser) {
  console.log("starting request visit")
  browser.useXpath()
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/div[1]/div/div/md-card/div[4]/div/div[3]/button[1]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/div[1]/div/div/md-card/div[4]/div/div[3]/button[1]/span")
  browser.pause(1000)
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/form/div[3]/div[1]/ng-form/md-input-container/ng-transclude/input').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/form/div[3]/div[1]/ng-form/md-input-container/ng-transclude/input")
  browser.setValue("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/form/div[3]/div[1]/ng-form/md-input-container/ng-transclude/input", "Test")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/form/div[3]/div[2]/div/ng-form/md-input-container/ng-transclude/div[1]/textarea').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/form/div[3]/div[2]/div/ng-form/md-input-container/ng-transclude/div[1]/textarea")
  browser.setValue("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/form/div[3]/div[2]/div/ng-form/md-input-container/ng-transclude/div[1]/textarea", "test")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/div[2]/div/button[2]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[2]/div/div/div[2]/div/button[2]/span")
  browser.pause(5000)

}

async function intakeQuestions(browser) {
  console.log("starting intake questions")

  //allergies
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[5]/form/div[2]/div[2]/div[2]/md-checkbox[1]/div[1]').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[5]/form/div[2]/div[2]/div[2]/md-checkbox[1]/div[1]")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[5]/form/div[4]/button/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[5]/form/div[4]/button/span")
  browser.pause(5000)
  //Current Medications
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[6]/form/div[2]/div[1]/md-checkbox/div[1]').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[6]/form/div[2]/div[1]/md-checkbox/div[1]")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[6]/form/div[4]/button[2]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[6]/form/div[4]/button[2]/span")
  browser.pause(5000)
  //Medical Conditions
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[7]/form/div[2]/div[1]/md-checkbox/div[1]').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[7]/form/div[2]/div[1]/md-checkbox/div[1]")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[7]/form/div[4]/button[2]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[7]/form/div[4]/button[2]/span")
  browser.pause(5000)
  //Past Medical Procedures
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[8]/form/div[3]/md-checkbox/div[1]').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[8]/form/div[3]/md-checkbox/div[1]")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[8]/form/div[6]/button[2]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[8]/form/div[6]/button[2]/span")
  browser.pause(5000)
  //Family Medical History
  browser.pause(5000)
  //browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[9]/form/div[2]/div[1]/md-checkbox/div[1').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[9]/form/div[2]/div[1]/md-checkbox/div[1]")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[9]/form/div[4]/button[2]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[9]/form/div[4]/button[2]/span")
  browser.pause(5000)
  // A few questions
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[10]/form/div[2]/div[1]/div/ng-form/md-input-container/ng-transclude/md-radio-group/md-radio-button[2]/div[1]/div[1]').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[10]/form/div[2]/div[1]/div/ng-form/md-input-container/ng-transclude/md-radio-group/md-radio-button[2]/div[1]/div[1]")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[10]/form/div[2]/div[2]/div/ng-form/md-input-container/ng-transclude/md-radio-group/md-radio-button[2]/div[1]/div[1]').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[10]/form/div[2]/div[2]/div/ng-form/md-input-container/ng-transclude/md-radio-group/md-radio-button[2]/div[1]/div[1]")
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[10]/form/div[4]/button[2]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[10]/form/div[4]/button[2]/span")
  browser.pause(5000)

}

async function pharmacyPage(browser) {
  console.log("starting pharmacy page")
  // Pharmacy Page
  
  //selects fist random pharmacy in 85206 zip code
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[11]/form/div[4]/div[2]/div[1]/div/button/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[11]/form/div[4]/div[2]/div[1]/div/button/span")

}

async function creditCardPage(browser) {
  console.log("starting CC Page")
  // CC Page
  //click CC field
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[2]/ng-form[2]/md-input-container/ng-transclude/input').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[2]/ng-form[2]/md-input-container/ng-transclude/input")
  //enter CC number/test card
  browser.setValue("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[2]/ng-form[2]/md-input-container/ng-transclude/input", "4242424242424242")
  //click month exp
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[3]/div[1]/ng-form[1]/md-input-container/md-select').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[3]/div[1]/ng-form[1]/md-input-container/md-select")
  //select month
  browser.expect.element('/html/body/div[14]/md-select-menu/md-content/ng-transclude/md-option[4]').to.be.present;
  browser.click("/html/body/div[14]/md-select-menu/md-content/ng-transclude/md-option[4]")
  //click year exp
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[3]/div[1]/ng-form[2]/md-input-container/md-select').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[3]/div[1]/ng-form[2]/md-input-container/md-select")
  //select year exp
  browser.expect.element('/html/body/div[15]/md-select-menu/md-content/ng-transclude/md-option[5]').to.be.present;
  browser.click("/html/body/div[15]/md-select-menu/md-content/ng-transclude/md-option[5]")
  //click cvc field
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[3]/div[2]/ng-form/md-input-container/ng-transclude/input').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[3]/div[2]/ng-form/md-input-container/ng-transclude/input")
  //set cvc value
  browser.setValue("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[2]/div[3]/div[2]/ng-form/md-input-container/ng-transclude/input", "424")
  //click continue
  browser.expect.element('/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[4]/button[2]/span').to.be.present;
  browser.click("/html/body/div[1]/div[2]/md-content/div/div[2]/div/div/md-card[3]/form/div[4]/button[2]/span")
  browser.pause(6000)
}

async function confirmationPage(browser) {
  console.log("starting confrimation page")
  browser.pause(9000)
  browser.useCss()
  //click checkbox confirmation
  browser.expect.element('#top > div.view.translucent > div > div > md-card.confirm-visit.animated._md.bounceInUp > div > div > div.confirm-review > div.confirm-accuracy-container > md-checkbox > div.md-container.md-ink-ripple').to.be.present;
  browser.click("#top > div.view.translucent > div > div > md-card.confirm-visit.animated._md.bounceInUp > div > div > div.confirm-review > div.confirm-accuracy-container > md-checkbox > div.md-container.md-ink-ripple")
  browser.pause(9000)
  browser.useXpath()
  //click start visit button
  browser.expect.element('/html/body/div/div[2]/md-content/div/div[2]/div/div/md-card[3]/div/div/div[1]/div/button[2]/span[1]').to.be.present;
  browser.click("/html/body/div/div[2]/md-content/div/div[2]/div/div/md-card[3]/div/div/div[1]/div/button[2]/span[1]")
  browser.pause(9000)
  console.time()
  console.timeLog()

}

async function patientLogout(browser) {
  console.log("starting patient logout")

  //execute logout on angular
  //will update to RVA once we have implemented
  browser.execute("angular.element(document.body).injector().get('security').logout()", [], function(error) {
    if (error)
      console.error(error);
    else
      console.log('Done logging out!');
  });
  //pause browser to wait for logout
  browser.pause(20000)

}

async function providerLogin(browser) {
  console.log("starting provider login")
  browser.pause(10000)
  browser.url('https://alpha.evisit.com/r/auth/LoginPage?practice=ewellness')
  browser.pause(5000)
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input")
  browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div/div[1]/input", "physician+jacob@evisit.com")
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input")
  browser.setValue("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div/div[1]/input", "provider123")
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[2]/div/div').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/div[2]/div/div")
  browser.pause(20000)
  browser.expect.element('/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[4]/div[2]/div/div/div/span').to.be.present;
  browser.click("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[4]/div[2]/div/div/div/span")
  browser.pause(6000)
  // browser.expect.element('/html/body/div[1]/div/div/div/div[1]/div[3]/div[4]/div[2]/div/button/span').to.be.present;
  // browser.click("/html/body/div[1]/div/div/div/div[1]/div[3]/div[4]/div[2]/div/button/span")

}


// Basically the below stuff runs everything. 
module.exports = {
  before : async function (browser) {
    browser.resizeWindow(1920, 1080);
    '@tags:' ['test']
  },
  'Enroll a new patient logout then log back in' : async function(browser) {
    var newUserCredentials = await generateNewUserCredentials();

    console.log(JSON.stringify(newUserCredentials));


    goToPracticeLoginPage(browser, "ewellness")
      .then(registerNewPatient(browser, newUserCredentials))
      .then(geoLocationPage(browser))
      .then(enrollNewPatient(browser))
      .then(profilePicture(browser))
      .then(dependentPage(browser))
      .then(insurancePage(browser))
      .then(welcomePage(browser))
      .then(logoutUser(browser))
      .then(loginUser(browser, newUserCredentials))
      .then(requestVisit(browser))
      .then(intakeQuestions(browser))
      .then(pharmacyPage(browser))
      .then(creditCardPage(browser))
      .then(confirmationPage(browser))
      .then(patientLogout(browser))
      .then(providerLogin(browser))
      .then(browser.end());
  }, 
};
