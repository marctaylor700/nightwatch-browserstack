var email = "physician+nick@evisit.com"; // email variable
var env = "alpha"
var password ="provider123"

module.exports = {
  before : function (browser) {
    browser.resizeWindow(2048, 1536);
    @tags: ['test']
  },
  'eVisit Provider Login - Verify sidebar elements' : function (browser) {
    
    browser
    .windowMaximize()
      //open evisit practice. this is currently on alpha but will change once we deploy to prod. 
      .url(`https://${env}.evisit.com/ng/#/login/ewellness`)
      .pause(5000)
      .useXpath()
      //click email field
      .click("/html/body/div/div[2]/md-content/div/div[2]/div/div/div/div/div/md-content/div[4]/form/div[1]/ng-form[1]/md-input-container/ng-transclude/input")
      //set email
      .setValue("/html/body/div/div[2]/md-content/div/div[2]/div/div/div/div/div/md-content/div[4]/form/div[1]/ng-form[1]/md-input-container/ng-transclude/input" , `${email}`)
      //click password field
      .click("/html/body/div/div[2]/md-content/div/div[2]/div/div/div/div/div/md-content/div[4]/form/div[1]/ng-form[2]/md-input-container/ng-transclude/input")
      //set password
      .setValue("/html/body/div/div[2]/md-content/div/div[2]/div/div/div/div/div/md-content/div[4]/form/div[1]/ng-form[2]/md-input-container/ng-transclude/input", `${password}`)
      //click login button
      .click("/html/body/div/div[2]/md-content/div/div[2]/div/div/div/div/div/md-content/div[4]/form/button")
      .pause(9000)
      //check for eVisit
      .assert.elementPresent("/html/body/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div/span")
      
      .end();
  }
};
