# nightwatch-browserstack
[Nightwatch](http://nightwatchjs.org/) Integration with BrowserStack.

<img src ="http://nightwatchjs.org/img/logo-nightwatch.png" height = "110">

## Setup
* Clone the repo
* Install dependencies `npm install`
* Update `*.conf.js` files inside the `conf/` directory with your BrowserStack Username and Access Key(https://www.browserstack.com/accounts/settings)

## Running your tests
Get started

In order to run the tests, you need to have the local environment configured in your machine and all necessary node packages installed. To do so, follow these steps: 

1. - Go to the Github repository and clone it on your machine; 
1. - Open the root directory of the cloned repository on the terminal; 
1. - Execute npm install to install all required packages (it should create a new folder called `node_modules` with all the dependencies inside. 
1. - Create a local execution file (next section will talk about this file in more detail) With all of this, you should be able to run any specific test or all tests directly on your machine.

## Local execution 
To execute any test using Nightwatch you will require a configuration file that describes the capabilities and variables used by the framework to run the test. Our automation suite has a few configurations already created in the `./conf/` folder, but they are specific for BrowserStack (next section). The local file will need to be created in your root directory with the name `nightwatch.conf.js` to be used. 

To facilitate this process, here is an example of a local configuration file that can be used (with commentaries for a few important details): 
``` javascript
module.exports = { 
// An array of folders (excluding subfolders) where your tests are located; // if this is not specified, the test source must be passed as the second argument to the test runner. 
 src_folders: ["tests"], 
 webdriver: { 
 start_process: true, 
 port: 9515, 
 server_path: require('chromedriver').path, // Downloaded by 'npm install'  }, 
 test_settings: { 
 default: { 
 skip_testcases_on_fail: false, // Do not skip remaining tests in case one of them fail  launch_url: 'https://nightwatchjs.org', 
 desiredCapabilities: { 
 browserName: 'chrome', 
 // Disable geolocation - only required for browserstack 
 "chromeOptions": { 
 prefs: { 
 // 0 - Default, 1 - Allow, 2 - Block 
 'profile.managed_default_content_settings.geolocation': 1 
 } 
 } 
 }, 
 globals: { // Variables that can be used by any test 
 env: "release", 
 handle: "omega", 
 email: "taylor+o14@evisit.com", 
 password: "Patient123!", 
 providerEmail: "taylor+provider@evisit.com", 
 providerPassword: "Provider123!" 
 }, 
 } 
 }, 
 custom_commands_path: ["./commands"], // Custom commands folder 
 page_objects_path: ["pages"] // Page object folder
};
```
To execute this file, run the following line on your terminal in the root directory of the copied repository: `./node_modules/.bin/nightwatch`

Alternatively, you can install Nightwatch globally on your machine with the command `npm install nightwatch -g` and doing so you only need the following command to run your local conf file:

`nightwatch`

This command executes the complete suite of tests specified on `src_folders` of the conf file. You can also run only a specific folder or scenario with:

`nightwatch --test ./tests/<test_folder>/<test_sub_folder> <test_file_name.js>`

When executing any test locally, a session of the chosen browser will open and execute each test while also saving all logs in the terminal, similar to this:
``` javascript
Running: Check Visit History tab Information - Attachments 
ℹ Connected to hub-cloud.browserstack.com on port 80 (13399ms). 
 Using: chrome (87.0.4280.20) on MAC platform. 
Starting Login 
✔ Element <[data-test-id='email']> was visible after 990 milliseconds. 
✔ Element <[data-test-id='password']> was visible after 801 milliseconds. ✔ Element <[data-test-id='loginButton']> was visible after 896 milliseconds. ✔ Element <[data-test-id="waitingRoomTab"]> was visible after 2907 milliseconds. ✔ Element <.eVisitAppLoadingSpinner> was not visible after 906 milliseconds. ✔ Element <.eVisitAppBasePageMainContainer .eVisitAppLoadingSpinner> was present after 379 milliseconds. 
✔ Element <.eVisitAppBasePageMainContainer .eVisitAppLoadingSpinner> was not present after 1375 milliseconds. 
✔ Element <[data-test-id="rowClick0"]> was visible after 693 milliseconds. ✔ Element <[data-test-id="visitDateRangeFilterTestID"] [type="text"]> was visible after 765 milliseconds. 
✔ Element <[data-test-id="visitSearchFilterTestID"]> was visible after 1473 milliseconds. ✔ Element <[data-test-id="rowClick0"]> was present after 366 milliseconds. ✔ Expected element <[data-test-id="rowClick0"]> text to contain: "First Name Edited" in 20000ms (1558ms) 
✔ Expected element <[data-test-id="rowClick0"]> text to contain: "Sep 15" in 20000ms (1324ms) 
✔ Expected element <.eVisitAppDrawer> text to contain: "Attachments" in 10000ms (1036ms)
- Verify that the number of attachments on screen are the same as the expected: ✔ Passed [equal]: 2 == 2 
OK. 15 assertions passed. (56.952s)
``` 
## Browserstack execution 
As commented before, the local conf file is not the only option to run our tests. Already included in the `./conf/` folder of the repository you will find some configuration files exclusively created for BrowserStack. Some of the files available were included by the BrowserStack team in the original repository that originated our fork, and they can serve as examples if needed. For our testing, we mainly use patient.conf.js and provider.conf.js since we opted to separate the test suites by those two categories. Below you can find the patient version of the configuration file (The provider version is very similar):
``` javascript
nightwatch_config = { 
src_folders : [ "tests/patient" ], // This will result in only running tests inside './tests/patient' instead of all tests 
 selenium : { 
 "start_process" : false, 
 "host" : "hub-cloud.browserstack.com", // Indicate where the test should be executed  "port" : 80 
 }, 
 test_settings: { 
 default: { 
 skip_testcases_on_fail: false, // Do not skip remaining tests in case one of them fail  desiredCapabilities: { // Set browserstack capabilities and what browser should be used  'browserstack.user': 'username', //username can be found in browserstack
 'browserstack.key': 'key', //key can be found in browserstack
 //"browserstack.timezone" : "Sao_Paulo", 
"browserstack.timezone" : "Phoenix", // Make sure the tests that use date will have controlled results 
"browserstack.geoLocation" : "BR", // Force geolocation page to appear for patient tests 
 'os': 'OS X', 
 'os_version': 'Mojave', 
 'build' : 'Patient Tests', 
 'project' : 'eVisit Nightwatch', 
 'browser': 'Chrome', 
 'browser_version': '78.0 beta', 
 'resolution': '1920x1080', 
 'goog:chromeOptions': { 
 'args': ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"],  prefs: { 
 // Disable geolocation - only required for browserstack
 // 0 - Default, 1 - Allow, 2 - Block 
 'profile.managed_default_content_settings.geolocation' : 1 
 } 
 } 
 }, 
 globals: { // Variables that can be used by any test 
 env: "release", 
 handle: "omega", 
 email:"taylor+o14@evisit.com", 
 password:"Patient123!", 
 providerEmail: "taylor+provider@evisit.com", 
 providerPassword: "Provider123!" 
 }, 
 } 
}, 
custom_commands_path: ["./commands"], // Custom commands folder 
page_objects_path: ["pages"] // Page object folder 
}; 
// Code to copy seleniumhost/port into test settings 
for(var i in nightwatch_config.test_settings){ 
var config = nightwatch_config.test_settings[i]; 
 config['selenium_host'] = nightwatch_config.selenium.host; 
 config['selenium_port'] = nightwatch_config.selenium.port; 
} 
module.exports = nightwatch_config;
```
To execute this file, you can use the following command to run all patient tests: `nightwatch -c ./conf/patient.conf.js`

Or, alternatively, you can run only a specific file test or folder: 
`nightwatch -c ./conf/patient.conf.js 
-t tests/patient/<test_folder>/<test_sub_folder>/<test_file.js>`

Since a test file usually includes several tests, to be even more specific you can run just one test of the test file using 

`--testcase: 
nightwatch -c ./conf/patient.conf.js 
-t tests/patient/<test_folder>/<test_sub_folder>/<test_file.js> --testcase "<name of test case>"` 

Running on BrowserStack will result in the same logs being displayed in the terminal file, but the browser will no longer open in your screen to display the execution. In order to see the test running you need to access the BrowserStack dashboard. It will not only contain videos of the execution but also timestamps for any command or assertion executed. 

## Connecting to BrowserStack via a proxy server
You can specify proxy settings in Nightwatch by adding the `proxy` key in your `*.conf.js` 

```javascript
  test_settings: {
    default: {
      desiredCapabilities: {
        // Your capabilities
      },
      proxy: {
        "host": "",     // "127.0.0.1"
        "port": "",     // "8081"
        "protocol": ""  // "http"
      }
    }
  }
```
  
## Additional Resources
* [Documentation for writing automate test scripts in Node](https://www.browserstack.com/automate/node)
* [Customizing your tests on BrowserStack](https://www.browserstack.com/automate/capabilities)
* [Browsers & mobile devices for selenium testing on BrowserStack](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate)
* [Using REST API to access information about your tests via the command-line interface](https://www.browserstack.com/automate/rest-api)
* [Example to update the Browserstack session status based on the test results](https://github.com/blueimp/nightwatch-browserstack)
