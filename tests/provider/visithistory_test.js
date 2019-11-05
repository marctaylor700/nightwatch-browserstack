var env = "alpha";
// var userEnrollData = {
//   firstName: "Marc",
//   lastName: "Taylor"
// }

async function goToPracticeLoginPage(browser, handle) {
  console.log("starting goToPracticeLoginPage");
  browser.url(`https://${env}.evisit.com/r/auth/LoginPage?practice=${handle}`);
  browser.pause(5000);
}




// Basically the below stuff runs everything. 
module.exports = {
  before : async function (browser) {
    browser.resizeWindow(1920, 1080);
    //'@tags:' ['test']
  },
  'Provider Login - Verify Visit History Tab' : async function(browser) {
    //var newUserCredentials = await generateNewUserCredentials();

    //console.log(JSON.stringify(newUserCredentials));


    goToPracticeLoginPage(browser, "ewellness")
      
      .then(browser.end());
  }, 
};
