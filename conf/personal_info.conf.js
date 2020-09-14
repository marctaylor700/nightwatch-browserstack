nightwatch_config = {
    src_folders : [ "tests" ],
  
    selenium : {
      "start_process" : false,
      "host" : "hub-cloud.browserstack.com",
      "port" : 443 //SSL
    },
  
    test_settings: {
      default: {
        desiredCapabilities: {
          'browserstack.user': 'nick34',
          'browserstack.key': 'SBukT13jtljJiBWoBpHw',
          'browserstack.debug': true,
          'browserstack.networkLogs': true,
          'os': 'OS X',
          'os_version': 'Mojave',
          'build' : 'Personal Info',
          'project' : 'eVisit Nightwatch Core Regression',
          'browser': 'Chrome',
          'browser_version': '85.0.4183.102',
          'resolution': '1920x1080',
          // disable geolocation  - only required for browserstack
          "chromeOptions" : {
            prefs: {
                // 0 - Default, 1 - Allow, 2 - Block
                'profile.managed_default_content_settings.geolocation' : 1
              }
          }
        },
        globals: {
            env: "staging",
            handle: "omega",
            email:"taylor+o14@evisit.com",
            password:"patient123"
          },
      }
    },
    custom_commands_path: ["./commands"],
    page_objects_path: ["pages"]
  };

  
  // Code to copy seleniumhost/port into test settings
  for(var i in nightwatch_config.test_settings){
    var config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
  }
  
  module.exports = nightwatch_config;
  